# CityScape — Urban Scene Segmentation

A full-stack AI web application that performs **semantic segmentation** on street scene images using **DeepLabV3 + ResNet-50**, trained on the Cityscapes dataset.

Upload any street photo → the model segments it into 34 classes (road, car, building, sky, person, etc.) and returns a color-coded mask with per-class coverage percentages.

---



## Tech Stack

| Layer | Technology |
|---|---|
| Model | PyTorch — DeepLabV3 + ResNet-50 |
| Backend | FastAPI + Uvicorn |
| Frontend | React 19 + Vite |
| Experiment Tracking | MLflow |
| Containerization | Docker + Docker Compose |

---

## Project Structure

```
cityscapes-deeplab/
├── backend/
│   ├── main.py           # FastAPI app — routes & startup
│   ├── model.py          # Model loading & inference logic
│   ├── utils.py          # Color map & class label helpers
│   ├── requirement.txt   # Python dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app — API calls & layout
│   │   └── components/
│   │       ├── Upload.jsx    # Drag-and-drop image upload
│   │       ├── Result.jsx    # Segmentation result display
│   │       └── Metrics.jsx   # Model metrics display
│   └── Dockerfile
├── model/
│   └── deeplabv3_best.pth    # Trained model weights
├── deeplabv3_results.json    # Training metrics (mIoU, loss, etc.)
├── mlruns/                   # MLflow experiment logs
└── docker-compose.yml
```

---

## Model Performance

Trained for **20 epochs** on Cityscapes (256×256 input, batch size 8):

| Metric | Value |
|---|---|
| Validation Loss | 0.142 |
| mIoU | 25.6% |
| Dice Score | 30.8% |

> **Note:** Cityscapes is a challenging fine-grained dataset with 34 classes. State-of-the-art models reach ~80% mIoU but require much higher resolution (512×1024+), longer training, and heavy augmentation. For a proof-of-concept, these results are solid.

---

## Run Locally (without Docker)

### Prerequisites

- Python 3.10+
- Node.js 18+
- The trained weights file at `model/deeplabv3_best.pth`

---

### 1. Clone the repo

```bash
git clone https://github.com/samersoltanii/cityscapes-deeplab.git
cd cityscapes-deeplab
```

---

### 2. Start the Backend

```bash
# From the project root
pip install -r backend/requirement.txt
uvicorn backend.main:app --reload
```

Backend runs at: **http://localhost:8000**

---

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

### 4. Start MLflow UI (optional)

```bash
# From the project root
mlflow ui
```

MLflow dashboard at: **http://localhost:5000**

---

### All three together (split terminals)

| Terminal | Command | URL |
|---|---|---|
| 1 | `uvicorn backend.main:app --reload` | http://localhost:8000 |
| 2 | `cd frontend && npm run dev` | http://localhost:5173 |
| 3 | `mlflow ui` | http://localhost:5000 |

---


## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Status check |
| `GET` | `/health` | Model load status + device (CPU/GPU) |
| `GET` | `/metrics` | Training metrics (mIoU, loss, etc.) |
| `POST` | `/predict` | Run segmentation on an uploaded image |

### Example prediction request

```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@street.jpg"
```

Response:
```json
{
  "original_image": "<base64>",
  "mask_image": "<base64>",
  "percentages": {
    "road": 35.4,
    "building": 22.1,
    "sky": 18.7,
    "car": 9.2
  },
  "num_classes": 12,
  "filename": "street.jpg"
}
```

---


## Author

**Samer Soltani** — 