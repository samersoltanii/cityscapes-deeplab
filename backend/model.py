import sys, os
sys.path.insert(0, os.path.dirname(__file__))

import torch
from PIL import Image
from torchvision import transforms
from torchvision.models.segmentation import deeplabv3_resnet50
from utils import class_to_rgb, get_class_percentages

NUM_CLASSES = 34
IMG_SIZE    = 256

_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std =[0.229, 0.224, 0.225]),
])


def load_model(weights_path: str, device: torch.device) -> torch.nn.Module:
    model = deeplabv3_resnet50(weights=None, num_classes=NUM_CLASSES, aux_loss=True)
    state = torch.load(weights_path, map_location=device, weights_only=True)
    if isinstance(state, dict) and "state_dict" in state:
        state = state["state_dict"]
    elif isinstance(state, dict) and "model_state_dict" in state:
        state = state["model_state_dict"]
    model.load_state_dict(state)
    model.to(device)
    model.eval()
    return model


def predict(model: torch.nn.Module, device: torch.device, pil_image: Image.Image) -> dict:
    tensor = _transform(pil_image.convert("RGB")).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(tensor)["out"]

    class_map = output.argmax(dim=1).squeeze(0).cpu().numpy()

    mask_pil    = Image.fromarray(class_to_rgb(class_map))
    percentages = get_class_percentages(class_map)
    num_classes = len(percentages)

    return {
        "mask_image":  mask_pil,
        "percentages": percentages,
        "num_classes": num_classes,
    }
