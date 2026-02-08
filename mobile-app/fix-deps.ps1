Write-Host "🔧 Fixing Dependencies for Tomato Disease Detector (FINAL)"

Write-Host "📦 Installing React Native 0.76.6..."
npm install react-native@0.76.6 --force

Write-Host "📦 Installing Expo Packages..."
npm install expo-image-picker expo-status-bar expo-crypto react-native-screens react-native-safe-area-context --force

Write-Host "📦 Installing Expo CLI..."
npm install --save-dev @expo/cli

Write-Host "🩹 Patching Expo CLI for Windows..."
node patch-expo.js

Write-Host "✅ Done! You can now run '.\start-lan.ps1' to start the app."
Read-Host "Press Enter to exit"
