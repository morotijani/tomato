import numpy as np
from PIL import Image
from io import BytesIO


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess the uploaded image for model prediction.
    
    Args:
        image_bytes: Raw image bytes from upload
        
    Returns:
        Preprocessed image as numpy array (224x224x3, normalized to 0-1)
    """
    try:
        # Open image from bytes
        image = Image.open(BytesIO(image_bytes))
        
        # Convert to RGB if necessary (handles RGBA, grayscale, etc.)
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize to 224x224 (standard CNN input size)
        image = image.resize((224, 224), Image.Resampling.LANCZOS)
        
        # Convert to numpy array
        image_array = np.array(image)
        
        # Normalize pixel values to 0-1 range
        image_array = image_array.astype(np.float32) / 255.0
        
        return image_array
    
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")


def validate_image(image_bytes: bytes) -> bool:
    """
    Validate that the uploaded file is a valid image.
    
    Args:
        image_bytes: Raw image bytes from upload
        
    Returns:
        True if valid image, raises ValueError otherwise
    """
    try:
        image = Image.open(BytesIO(image_bytes))
        image.verify()  # Verify it's a valid image
        return True
    except Exception as e:
        raise ValueError(f"Invalid image file: {str(e)}")
