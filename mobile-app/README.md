# Tomato Disease Detector - Mobile App

React Native mobile application for detecting tomato plant diseases using AI.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## Setup

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Configure Backend URL

Edit `services/api.js` and update the `API_BASE_URL`:

```javascript
// For Android Emulator
const API_BASE_URL = 'http://10.0.2.2:8000';

// For iOS Simulator
const API_BASE_URL = 'http://localhost:8000';

// For Physical Device (use your computer's IP)
const API_BASE_URL = 'http://192.168.1.100:8000';
```

### 3. Android Setup

#### Install Android Dependencies

```bash
# For macOS/Linux
cd android
./gradlew clean
cd ..

# For Windows
cd android
gradlew clean
cd ..
```

#### Configure Permissions

The app requires camera and storage permissions. These are already configured in the project.

### 4. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on Android

```bash
# Make sure you have an Android emulator running or device connected
npm run android
```

### Run on iOS (macOS only)

```bash
# Make sure you have an iOS simulator running
npm run ios
```

## Project Structure

```
mobile-app/
├── App.js                  # Main app component with navigation
├── index.js                # App entry point
├── screens/
│   ├── HomeScreen.js       # Home screen with camera/gallery buttons
│   └── ResultsScreen.js    # Results display screen
├── services/
│   └── api.js              # API service for backend communication
├── assets/
│   └── tomato-icon.png     # App icon/logo
├── android/                # Android native code
├── ios/                    # iOS native code
├── package.json            # Dependencies
└── README.md              # This file
```

## Features

### Home Screen
- **Capture Image**: Take a photo using device camera
- **Pick from Gallery**: Select an existing photo
- Clean, modern UI with loading states
- Real-time image preview during analysis

### Results Screen
- Disease name display
- Confidence score with visual progress bar
- Color-coded confidence levels (High/Medium/Low)
- Treatment recommendations
- Image preview
- "Analyze Another Plant" button

### Error Handling
- Network connection errors
- Server unavailability
- Invalid image formats
- Timeout handling

## Permissions

### Android (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS (ios/TomatoDiseaseDetector/Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to capture tomato plant images</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to select images</string>
```

## Troubleshooting

### Cannot Connect to Backend

1. **Check backend is running**: Ensure FastAPI server is running on port 8000
2. **Verify URL**: Make sure `API_BASE_URL` in `services/api.js` is correct
3. **Android Emulator**: Use `10.0.2.2` instead of `localhost`
4. **Physical Device**: Use your computer's local IP address
5. **Firewall**: Ensure your firewall allows connections on port 8000

### Camera Not Working

1. **Permissions**: Check app permissions in device settings
2. **Android**: Ensure camera permissions are granted
3. **iOS**: Check Info.plist has camera usage description

### Build Errors

```bash
# Clear cache and rebuild
npm start -- --reset-cache

# Android
cd android && ./gradlew clean && cd ..
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

## Testing

### Test with Backend

1. Start the FastAPI backend server
2. Launch the mobile app
3. Capture or select a tomato plant image
4. Verify the prediction results display correctly

### Test Error Scenarios

1. **No Internet**: Turn off WiFi/data to test error handling
2. **Backend Down**: Stop backend server and test error messages
3. **Invalid Image**: Try uploading non-image files

## Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
# APK will be in: android/app/build/outputs/apk/release/
```

### iOS (macOS only)

1. Open `ios/TomatoDiseaseDetector.xcworkspace` in Xcode
2. Select "Product" > "Archive"
3. Follow App Store submission process

## API Configuration

The app communicates with the backend using these endpoints:

- `POST /predict` - Upload image for disease prediction
- `GET /health` - Check backend server health

## Dependencies

- **react-native**: Core framework
- **@react-navigation**: Navigation between screens
- **react-native-image-picker**: Camera and gallery access
- **axios**: HTTP client for API calls

## License

MIT
