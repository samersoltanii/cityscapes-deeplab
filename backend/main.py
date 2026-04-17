import sys, os
sys.path.insert(0, os.path.dirname(__file__))

import io
import json
import base64
import logging

import mlflow
import torch
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import load_model, predict as run_predict

# ── paths ────────────────────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(__file__)
WEIGHTS_PATH = os.path.join(BASE_DIR, "..", "model", "deeplabv3_best.pth")
RESULTS_PATH = os.path.join(BASE_DIR, "..", "deeplabv3_results.json")
MLRUNS_URI   = f"file:{os.path.join(BASE_DIR, '..', 'mlruns')}"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── startup ───────────────────────────────────────────────────────────────────
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logger.info(f"Using device: {DEVICE}")

mlflow.set_tracking_uri(MLRUNS_URI)

MODEL: torch.nn.Module = None
MODEL_RESULTS: dict    = {}

app = FastAPI(title="Cityscapes DeepLabV3", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    global MODEL, MODEL_RESULTS

    weights = os.path.abspath(WEIGHTS_PATH)
    results = os.path.abspath(RESULTS_PATH)

    if not os.path.exists(weights):
        logger.error(f"Weights not found at {weights}")
        raise RuntimeError(f"Model weights not found: {weights}")
    if not os.path.exists(results):
        logger.error(f"Results JSON not found at {results}")
        raise RuntimeError(f"Results JSON not found: {results}")

    logger.info(f"Loading model from {weights}")
    MODEL = load_model(weights, DEVICE)

    with open(results) as f:
        MODEL_RESULTS = json.load(f)

    logger.info(f"Model ready — {MODEL_RESULTS.get('model', 'unknown')}")


# ── helpers ───────────────────────────────────────────────────────────────────

def _pil_to_b64(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


# ── routes ────────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "status": "ok",
        "model":  MODEL_RESULTS.get("model", "DeepLabV3 (ResNet-50)"),
    }


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "device": str(DEVICE),
        "model_loaded": MODEL is not None,
    }


@app.get("/metrics")
async def metrics():
    return MODEL_RESULTS


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ("image/jpeg", "image/png", "image/jpg"):
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Use JPEG or PNG.",
        )

    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet.")

    try:
        contents = await file.read()
        pil_img  = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Cannot read image: {exc}")

    try:
        result = run_predict(MODEL, DEVICE, pil_img)
    except Exception as exc:
        logger.exception("Prediction error")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}")

    return {
        "original_image": _pil_to_b64(pil_img),
        "mask_image":     _pil_to_b64(result["mask_image"]),
        "percentages":    result["percentages"],
        "num_classes":    result["num_classes"],
        "filename":       file.filename,
    }
