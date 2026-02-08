# 🍅 Tomato Disease Detector - Mobile App (Expo)

React Native mobile application built with Expo for detecting tomato plant diseases using AI.

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo Go App** on your physical device (Android/iOS)
- **A computer** on the same Wi-Fi network as your phone

## Setup

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Configure Backend URL

Edit `services/api.js` and update `API_BASE_URL` with your computer's local IP address:

```javascript
// Find your IP: 
// Windows: ipconfig
// macOS/Linux: ifconfig

const API_BASE_URL = 'http://192.168.1.100:8000'; // Replace with your computer's IP
```

**Note:** When using Expo Go or a physical device, you cannot use `localhost` or `127.0.0.1`. You must use your computer's actual network IP address.

## Running the App

### Start with Expo

```bash
npx expo start
```

This will display a QR code in your terminal and open a developer dashboard in your browser.

### Run on Device (Easiest)

1. Install **Expo Go** app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in the terminal
   - **Android**: Use the Expo Go app to scan
   - **iOS**: Use the default Camera app to scan

### Run on Emulator

- Press `a` in the terminal to run on Android Emulator
- Press `i` in the terminal to run on iOS Simulator (macOS only)

## Project Structure

```
mobile-app/
├── App.js                  # Main app navigation
├── index.js                # Entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── screens/
│   ├── HomeScreen.js       # Camera/Gallery logic
│   └── ResultsScreen.js    # Prediction results
├── services/
│   └── api.js              # API communication
└── assets/                 # Images (icon, splash)
```

## Features

- **Expo Camera**: Capture images directly
- **Image Picker**: Select from gallery
- **Live Updates**: Code changes reflect instantly
- **Cross-Platform**: Works on Android and iOS

## Troubleshooting

### "Network Error" or "Connection Refused"

1. **Check IP Address**: Ensure `API_BASE_URL` is correct
2. **Same Network**: Phone and computer must be on same Wi-Fi
3. **Firewall**: Allow Node.js and Python through your firewall
4. **Backend Running**: Ensure backend is running on port 8000

### "Camera/Gallery Permission Denied"

- The app will request permissions automatically
- If denied, go to your phone's Settings > Apps > Expo Go > Permissions and enable Camera/Storage

## Building for Production

To create a standalone APK/IPA:

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build -p android` (or ios)

## Dependencies

- **expo**: ~50.0.6
- **react-native**: 0.73.2
- **expo-image-picker**: Camera/Gallery access
- **axios**: HTTP client
