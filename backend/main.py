from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from utils import preprocess_image, validate_image
from model import model


# Initialize FastAPI app
app = FastAPI(
    title="Tomato Disease Detection API",
    description="Backend API for detecting tomato plant diseases using deep learning",
    version="1.0.0"
)

# Configure CORS to allow mobile app connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Tomato Disease Detection API",
        "status": "running",
        "version": "1.0.0"
    }


@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict tomato disease from uploaded image.
    
    Args:
        file: Uploaded image file (JPG, PNG, etc.)
        
    Returns:
        JSON response with disease_name, confidence_score, and treatment_recommendation
    """
    try:
        # Validate file upload
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
        
        # Read image bytes
        image_bytes = await file.read()
        
        # Validate image format
        try:
            validate_image(image_bytes)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        # Preprocess image
        try:
            processed_image = preprocess_image(image_bytes)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        # Make prediction
        prediction = model.predict(processed_image)
        
        # Return results
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "disease_name": prediction["disease_name"],
                "confidence_score": prediction["confidence_score"],
                "treatment_recommendation": prediction["treatment_recommendation"]
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "model_loaded": True
    }


if __name__ == "__main__":
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True  # Enable auto-reload during development
    )
