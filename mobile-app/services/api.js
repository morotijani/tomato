import axios from 'axios';

// Configure your backend URL here
// For Expo:
// - Android Emulator: use 10.0.2.2
// - iOS Simulator: use localhost
// - Physical Device: use your computer's IP address (e.g., 192.168.1.100)
// - Expo Go: use your computer's IP address

// Change this to your computer's IP when testing on physical device or Expo Go
const API_BASE_URL = 'https://5ccc-41-204-44-3.ngrok-free.app'; // Update with your IP address

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

    // Send POST request to /predict endpoint
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data.detail || 'Server error occurred',
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        success: false,
        error: 'Cannot connect to server. Please check your connection and ensure the backend is running.',
      };
    } else {
      // Other errors
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
};

/**
 * Check if the backend server is healthy
 * @returns {Promise} - Promise resolving to health status
 */
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Server is not reachable',
    };
  }
};
