// Axios removed in favor of native fetch

// Configure your backend URL here
// For Expo:
// - Android Emulator: use 10.0.2.2
// - iOS Simulator: use localhost
// - Physical Device: use your computer's IP address (e.g., 192.168.1.100)
// - Expo Go: use your computer's IP address

// Change this to your computer's IP when testing on physical device or Expo Go

// Change this to your computer's IP when testing on physical device or Expo Go
const API_BASE_URL = 'https://1a7d-41-204-44-3.ngrok-free.app'; // Update with your IP address

/**
 * Upload an image to the backend for disease prediction
 * @param {Object} imageFile - Image file object with uri, type, and name
 * @returns {Promise} - Promise resolving to prediction results
 */
export const predictDisease = async (imageFile) => {
  try {
    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('file', {
      uri: imageFile.uri,
      type: imageFile.type || 'image/jpeg',
      name: imageFile.name || 'tomato_image.jpg',
    });

    // Send POST request to /predict endpoint using fetch
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData,
      };
    } else {
      return {
        success: false,
        error: responseData.detail || 'Server error occurred',
        statusCode: response.status,
      };
    }
  } catch (error) {
    console.error('Prediction Error:', error);
    return {
      success: false,
      error: 'Cannot connect to server. Please check your connection.',
    };
  }
};

/**
 * Check if the backend server is healthy
 * @returns {Promise} - Promise resolving to health status
 */
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Server is not reachable',
    };
  }
};

