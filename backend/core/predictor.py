import json
from pathlib import Path
from io import BytesIO

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image


# -------------------------------------------------
# Paths
# -------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "checkpoints" / "best_model.pth"
INFO_PATH = BASE_DIR / "utils" / "dataset_info.json"


# -------------------------------------------------
# Load class info
# -------------------------------------------------
with open(INFO_PATH, "r") as f:
    dataset_info = json.load(f)

CLASS_NAMES = dataset_info["class_names"]
NUM_CLASSES = dataset_info["num_classes"]


# -------------------------------------------------
# Device
# -------------------------------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# -------------------------------------------------
# Model Architecture
# -------------------------------------------------
class SkinDiseaseModel(nn.Module):
    def __init__(self, num_classes):
        super(SkinDiseaseModel, self).__init__()

        self.backbone = models.efficientnet_b0(weights=None)

        num_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Identity()

        self.disease_head = nn.Sequential(
            nn.Linear(num_features, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, num_classes)
        )

        self.severity_head = nn.Sequential(
            nn.Linear(num_features, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 3)
        )

    def forward(self, x):
        features = self.backbone(x)
        disease_out = self.disease_head(features)
        severity_out = self.severity_head(features)
        return disease_out, severity_out


# -------------------------------------------------
# Load model once
# -------------------------------------------------
model = SkinDiseaseModel(NUM_CLASSES).to(device)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device, weights_only=True))
model.eval()


# -------------------------------------------------
# Image Transform
# -------------------------------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# -------------------------------------------------
# Prediction Function
# -------------------------------------------------
def predict_skin_disease(image_bytes, age, gender, symptoms):

    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        disease_out, severity_out = model(image)

        disease_probs = torch.softmax(disease_out, dim=1)
        confidence, predicted_idx = torch.max(disease_probs, dim=1)

        severity_idx = torch.argmax(severity_out, dim=1).item()

    disease_name = CLASS_NAMES[predicted_idx.item()]
    confidence_score = round(confidence.item() * 100, 2)

    severity_labels = ["Mild", "Moderate", "Severe"]
    severity = severity_labels[severity_idx]

    recommendations = [
        "Keep affected area clean",
        "Avoid self-medication",
        "Consult dermatologist/veterinarian if symptoms persist"
    ]

    if confidence_score < 60:
        recommendations.append("Low confidence prediction. Professional diagnosis recommended.")

    return {
        "disease": disease_name,
        "confidence": confidence_score,
        "recommendations": recommendations,
        "severity": severity
    }