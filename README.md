# 🍅 Tomato Disease Detection System

A full-stack AI-powered application for detecting diseases in tomato plants using computer vision and deep learning.

## 📋 Project Overview

This project consists of two main components:

1. **Backend ("Brain")**: FastAPI server with image processing and disease prediction
2. **Mobile App ("Face")**: React Native mobile application for capturing and analyzing tomato plant images

## 🏗️ Architecture

```
┌─────────────────────┐
│   Mobile App        │
│  (React Native)     │
│                     │
│  - Camera Capture   │
│  - Gallery Picker   │
│  - Results Display  │
└──────────┬──────────┘
           │
           │ HTTP/REST API
           │
┌──────────▼──────────┐
│   Backend API       │
│   (FastAPI)         │
│                     │
│  - Image Upload     │
│  - Preprocessing    │
│  - CNN Prediction   │
│  - Treatment Info   │
└─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 18+** (for mobile app)
- **Android Studio** or **Xcode** (for mobile development)

### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

Backend will be available at `http://localhost:8000`

### 2. Setup Mobile App

```bash
# Navigate to mobile app directory
cd mobile-app

# Install dependencies
npm install

# Update API URL in services/api.js
# For Android Emulator: http://10.0.2.2:8000
# For iOS Simulator: http://localhost:8000
# For Physical Device: http://YOUR_IP:8000

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

## 📱 Features

### Mobile App
- ✅ Camera capture for real-time plant analysis
- ✅ Gallery picker for existing photos
- ✅ Clean, modern UI with loading states
- ✅ Detailed results with confidence scores
- ✅ Treatment recommendations
- ✅ Error handling for network issues

### Backend API
- ✅ RESTful API with FastAPI
- ✅ Image preprocessing (resize, normalize)
- ✅ Placeholder CNN model (ready for real model integration)
- ✅ CORS enabled for mobile app
- ✅ Comprehensive error handling
- ✅ API documentation (Swagger/ReDoc)

## 🧠 Supported Diseases

The system can detect the following tomato diseases:

1. **Healthy** - No disease detected
2. **Early Blight** - Fungal infection
3. **Late Blight** - Severe fungal disease
4. **Leaf Mold** - Common in humid conditions
5. **Septoria Leaf Spot** - Fungal leaf disease
6. **Spider Mites** - Pest infestation
7. **Target Spot** - Fungal infection
8. **Tomato Yellow Leaf Curl Virus** - Viral disease
9. **Tomato Mosaic Virus** - Viral infection
10. **Bacterial Spot** - Bacterial disease

## 🔧 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "message": "Tomato Disease Detection API",
  "status": "running",
  "version": "1.0.0"
}
```

### `POST /predict`
Upload image for disease detection

**Request**: Multipart form data with image file

**Response**:
```json
{
  "success": true,
  "disease_name": "Early Blight",
  "confidence_score": 0.9234,
  "treatment_recommendation": "Remove affected leaves. Apply fungicide..."
}
```

### `GET /health`
Server health check

## 📁 Project Structure

```
tomato/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── model.py                # Placeholder CNN model
│   ├── utils.py                # Image preprocessing
│   ├── requirements.txt        # Python dependencies
│   └── README.md              # Backend documentation
│
└── mobile-app/
    ├── App.js                  # Main app component
    ├── screens/
    │   ├── HomeScreen.js       # Camera/gallery screen
    │   └── ResultsScreen.js    # Results display
    ├── services/
    │   └── api.js              # API service
    ├── assets/
    │   └── tomato-icon.png     # App icon
    ├── package.json            # Dependencies
    └── README.md              # Mobile app documentation
```

## 🧪 Testing

### Test Backend

```bash
# Start the backend server
cd backend
python main.py

# In another terminal, test with curl
curl -X POST "http://localhost:8000/predict" \
  -F "file=@test_tomato.jpg"

# Or visit Swagger UI
# http://localhost:8000/docs
```

### Test Mobile App

1. Ensure backend is running
2. Launch mobile app on emulator/device
3. Capture or select a tomato plant image
4. Verify prediction results display correctly

## 🔄 Integrating a Real Model

The current implementation uses a placeholder model. To integrate your trained model:

### For TensorFlow/Keras:

```python
# In model.py
from tensorflow import keras
import numpy as np

class TomatoDiseaseModel:
    def __init__(self, model_path='models/tomato_model.h5'):
        self.model = keras.models.load_model(model_path)
        self.class_names = [
            'Healthy', 'Early Blight', 'Late Blight', ...
        ]
    
    def predict(self, image_array):
        # Add batch dimension
        image_batch = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        predictions = self.model.predict(image_batch)
        
        # Get top prediction
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        
        return {
            "disease_name": self.class_names[class_idx],
            "confidence_score": confidence,
            "treatment_recommendation": self.get_treatment(class_idx)
        }
```

### For PyTorch:

```python
# In model.py
import torch
import torch.nn as nn

class TomatoDiseaseModel:
    def __init__(self, model_path='models/tomato_model.pth'):
        self.model = torch.load(model_path)
        self.model.eval()
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
    
    def predict(self, image_array):
        # Convert to tensor
        image_tensor = torch.from_numpy(image_array).permute(2, 0, 1).unsqueeze(0)
        image_tensor = image_tensor.to(self.device)
        
        # Make prediction
        with torch.no_grad():
            outputs = self.model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
        
        return {
            "disease_name": self.class_names[predicted.item()],
            "confidence_score": confidence.item(),
            "treatment_recommendation": self.get_treatment(predicted.item())
        }
```

## 🌐 Deployment

### Backend Deployment

Deploy to cloud platforms:
- **Heroku**: `heroku create && git push heroku main`
- **AWS EC2**: Use Nginx + Uvicorn
- **Google Cloud Run**: Containerize with Docker
- **Railway**: Connect GitHub repo

### Mobile App Deployment

#### Android
```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/
```

#### iOS (macOS only)
1. Open Xcode
2. Product → Archive
3. Submit to App Store

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in main.py
uvicorn.run("main:app", host="0.0.0.0", port=8001)
```

**Module not found:**
```bash
pip install -r requirements.txt
```

### Mobile App Issues

**Cannot connect to backend:**
- Verify backend is running
- Check `API_BASE_URL` in `services/api.js`
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address

**Camera not working:**
- Check app permissions in device settings
- Ensure permissions are declared in AndroidManifest.xml (Android) or Info.plist (iOS)

**Build errors:**
```bash
# Clear cache
npm start -- --reset-cache

# Clean build
cd android && ./gradlew clean && cd ..
```

## 📚 Documentation

- **Backend API Docs**: http://localhost:8000/docs (Swagger UI)
- **Backend ReDoc**: http://localhost:8000/redoc
- **Backend README**: [backend/README.md](backend/README.md)
- **Mobile App README**: [mobile-app/README.md](mobile-app/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## ⚠️ Disclaimer

This application provides AI-based predictions for educational purposes. For serious plant health issues, please consult an agricultural expert or plant pathologist.

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- React Native for cross-platform mobile development
- The open-source community for various libraries and tools

---

**Built with ❤️ for farmers and plant enthusiasts**
