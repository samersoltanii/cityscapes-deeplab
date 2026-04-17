# Cityscapes DeepLab Project

## Overview
The Cityscapes DeepLab project implements a semantic segmentation model using the DeepLabV3 architecture with a ResNet-50 backbone. This project is designed to process images from the Cityscapes dataset, providing pixel-wise classification of urban scenes.

## Features
- **DeepLabV3 Model**: Utilizes a state-of-the-art semantic segmentation model for accurate scene understanding.
- **Image Preprocessing**: Includes functions for resizing, normalizing, and converting images to tensors.
- **Prediction and Visualization**: Capable of generating segmentation masks and visualizing class distributions.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd cityscapes-deeplab
   ```

2. **Install Dependencies**:
   Ensure you have Python 3.6 or higher and install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Download Pre-trained Weights**:
   Download the pre-trained weights for the DeepLabV3 model and place them in the appropriate directory.

## Usage
To use the model for predictions, follow these steps:

1. **Load the Model**:
   Use the `load_model` function from `backend/model.py` to load the pre-trained model weights.

2. **Make Predictions**:
   Pass an image to the `predict` function to obtain the segmentation mask and class percentages.

3. **Visualize Results**:
   Utilize the provided utility functions to convert class indices to RGB images for visualization.

## Example
```python
from backend.model import load_model, predict
from PIL import Image

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = load_model("path/to/weights.pth", device)

# Load image
image = Image.open("path/to/image.jpg")

# Make prediction
result = predict(model, device, image)

# Display results
result['mask_image'].show()
print(result['percentages'])
```

## Documentation
For more detailed information on agent customization and best practices, refer to `docs/agent-guidelines.md`. 

## License
This project is licensed under the MIT License. See the LICENSE file for more details.