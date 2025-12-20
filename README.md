# 🔩 Steel Surface Defect Detector (NEU Dataset)

A full end-to-end production-grade deep learning system for **steel surface defect recognition**, powered by **Transfer Learning (ResNet50)** and built with:

- 🧠 PyTorch — model training
- ⚡ FastAPI — backend inference
- 💻 React + Vite — frontend UI
- 🎨 TailwindCSS — neon cyber UI
- 📁 NEU Surface Defect Dataset — Kaggle dataset

---

## 🏆 Project Demo (Screenshots)

### 🔹 Prediction UI  
<img src="frontend_screenshot.png" width="600"/>

### 🔹 Drag & Drop Upload + Camera Mode  
<img src="frontend_upload.png" width="600"/>

### 🔹 Top-3 Confidence Predictions  
<img src="frontend_predictions.png" width="600"/>

---

## 📌 Features

| Feature | Status |
|--------|--------|
| Drag & Drop upload | ✅ |
| Camera capture mode | ✅ |
| Live image preview | ✅ |
| Fullscreen zoom modal | ✅ |
| Top-3 predictions | ✅ |
| Confidence bars | ✅ |
| Defect explanations | ✅ |
| Neon particle animation background | ✅ |
| Modern cyber glassmorphism UI | ✅ |
| Fast inference API | ✅ |
| Real-time upload processing | ✅ |

---

## 🧠 Dataset  
📌 Dataset used: **NEU Surface Defect Dataset**  
📌 Source: Kaggle  
📌 Classes:

- Crazing  
- Inclusion  
- Patches  
- Pitted Surface  
- Rolled-in Scale  
- Scratches  

> Total ~1800 labeled defect images.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Drag-Drop
- Camera upload
- Neon animated particles
- Glassmorphism design

### Backend
- FastAPI
- PyTorch
- Torchvision

### Training
- ResNet50 Transfer Learning
- GPU supported
- Classification model

---

## 📁 Folder Structure

.
├── notebook/
│ └── neu_defect_transfer_learning.ipynb
│
├── backend/
│ ├── app.py
│ └── model/
│ └── defect_classifier.pth
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── index.html
│
├── data/
│ └── NEU_Surface_Defect/
│ ├── train/
│ └── val/
│
└── README.md

---

## 🔥 How to Run — Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
Backend runs at:
http://localhost:8000

Test API:
http://localhost:8000/docs

🌐 How to Run — Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

🎯 Model Training Summary

Pretrained ResNet50

Feature extractor frozen

Fully connected layer trained on NEU classes

Epochs: 6

Loss: CrossEntropy

Optimizer: Adam

📊 Results

Example performance:

Metric	Score
Accuracy	92%+
Precision	High
Recall	High

Confusion matrix + classification report generated in notebook.

🧩 Why This Project Matters

Industrial steel defect detection is one of the most critical QC processes in manufacturing. This project demonstrates:

Real-world dataset handling

Transfer learning implementation

Fast API deployment pipeline

Frontend-backend integration

UI/UX for ML systems

Strong MLOps foundations

This is a highly valuable skillset for ML engineering + computer vision roles.

🧪 Future Enhancements

Grad-CAM heatmaps

ONNX model export

GPU inference API

Multiclass segmentation

Cloud deployment (Render, Vercel)

Mobile PWA support

💡 License

This project is for educational and portfolio purposes.

🙌 Credits

Dataset: NEU Surface Defect
Frontend & Backend: Designed and built by Suyash