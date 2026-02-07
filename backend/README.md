# Tomato Disease Detection - Backend

FastAPI backend for detecting tomato plant diseases using deep learning.

## Setup

1. **Install Python 3.8+** (if not already installed)

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

### Development Mode (with auto-reload):
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

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
Upload an image for disease detection

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
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Testing with cURL

```bash
# Test prediction endpoint
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/tomato_image.jpg"
```

## Project Structure

```
backend/
├── main.py              # FastAPI application and endpoints
├── model.py             # Placeholder CNN model
├── utils.py             # Image preprocessing utilities
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Integrating a Real Model

The current implementation uses a placeholder model. To integrate your trained model:

1. **Save your trained model** (TensorFlow/PyTorch)

2. **Update `model.py`**:
   ```python
   # For TensorFlow
   from tensorflow import keras
   
   class TomatoDiseaseModel:
       def __init__(self, model_path):
           self.model = keras.models.load_model(model_path)
       
       def predict(self, image_array):
           prediction = self.model.predict(np.expand_dims(image_array, axis=0))
           # Process prediction and return results
   ```

3. **Update disease labels** to match your model's output classes

## Supported Diseases (Placeholder)

- Healthy
- Early Blight
- Late Blight
- Leaf Mold
- Septoria Leaf Spot
- Spider Mites
- Target Spot
- Tomato Yellow Leaf Curl Virus
- Tomato Mosaic Virus
- Bacterial Spot

## CORS Configuration

CORS is enabled for all origins (`*`) in development. For production, update `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-mobile-app-domain.com"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)
```

## Environment Variables (Optional)

Create a `.env` file for configuration:
```
PORT=8000
HOST=0.0.0.0
MODEL_PATH=./models/tomato_disease_model.h5
```

## License

MIT
