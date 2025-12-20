from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # allow all domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


classes = [
    "crazing",
    "inclusion",
    "patches",
    "pitted_surface",
    "rolled-in_scale",
    "scratches"
]

model = models.resnet50()
model.fc = torch.nn.Linear(model.fc.in_features, 6)
model.load_state_dict(torch.load("model/defect_classifier.pth", map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5],[0.5])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    img = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(img)
        probs = torch.softmax(outputs, 1).flatten()

    # top-3
    top3 = torch.topk(probs, 3)

    results = []
    for idx, score in zip(top3.indices, top3.values):
        results.append({
            "class": classes[idx],
            "confidence": float(score)
        })

    return {"results": results}
