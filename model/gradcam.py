import torch
import torch.nn as nn
import numpy as np
import cv2
from pathlib import Path

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class GradCAM:
    def __init__(self, model):
        self.model      = model
        self.gradients  = None
        self.activations = None
        target_layer    = model.backbone.features[-1]

        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0].detach()

        target_layer.register_forward_hook(forward_hook)
        target_layer.register_full_backward_hook(backward_hook)

    def generate(self, image_tensor, class_idx=None):
        self.model.zero_grad()
        image_tensor.requires_grad_(True)
        disease_out, _ = self.model(image_tensor)

        if class_idx is None:
            class_idx = disease_out.argmax().item()

        score = disease_out[0, class_idx]
        score.backward()

        gradients   = self.gradients[0]
        activations = self.activations[0]
        weights     = gradients.mean(dim=(1, 2))

        cam = torch.zeros(activations.shape[1:], device=device)
        for i, w in enumerate(weights):
            cam += w * activations[i]

        cam = torch.relu(cam)
        cam = cam - cam.min()
        cam = cam / (cam.max() + 1e-8)

        return cam.cpu().numpy(), class_idx

def get_heatmap(image, model):
    from torchvision import transforms
    from PIL import Image
    import numpy as np

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    if isinstance(image, str):
        image = Image.open(image).convert("RGB")

    image_tensor = transform(image).unsqueeze(0).to(device)

    gradcam = GradCAM(model)
    cam, _  = gradcam.generate(image_tensor)

    cam_resized = cv2.resize(cam, (224, 224))
    heatmap     = cv2.applyColorMap(
        np.uint8(255 * cam_resized),
        cv2.COLORMAP_JET
    )
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

    original_array = np.array(image.resize((224, 224)))
    overlay = cv2.addWeighted(
        original_array, 0.6,
        heatmap, 0.4, 0
    )

    return overlay
