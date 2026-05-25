# 📷 QR Code Scanner

<div align="center">
  <br />
  <p>
    <strong>A modern, feature-rich QR Code Scanner built with Expo and React Native</strong>
  </p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-usage">Usage</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-tech-stack">Tech Stack</a>
  </p>
  <br />
</div>

---

## ✨ Features

- **📱 Cross-Platform** — Built with Expo 54, runs on iOS, Android, and Web
- **📸 Real-Time Scanning** — Powered by `expo-camera` with instant QR code detection
- **🌌 Celestial UI** — Custom space-themed components with frosted-glass aesthetics
- **✨ Animated Scanner Overlay** — Smooth scanning line animation with pulsing corner borders
- **🔦 Flashlight Toggle** — Built-in torch/flash support for low-light environments
- **🌐 Smart Link Detection** — Scanned URLs open directly in the browser
- **📋 Quick Copy** — One-tap copy for non-URL content
- **📱 Responsive Design** — Adaptive UI that scales beautifully across screen sizes
- **🔄 Continuous Scan** — Scan again immediately after processing a code
- **⚡ Haptic Feedback** — Subtle vibrations on successful scans and interactions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS only) or Android Emulator (optional)
- A physical device with the [Expo Go](https://expo.dev/go) app (recommended for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/qr-code-reader.git
cd qr-code-reader

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Different Platforms

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## 🎯 Usage

1. **Launch the app** — You'll see the splash screen with a cosmic gradient UI
2. **Tap the circular scan button** — Grants camera permission and opens the scanner
3. **Point at a QR code** — The scanner detects codes automatically
4. **Choose an action** — Open in browser, copy to clipboard, or scan again
5. **Use the flashlight** — Toggle the flash button in low-light conditions
6. **Navigate back** — Use the back button to return to the splash screen

## 📁 Project Structure

```
qr-code-reader/
├── App.tsx                # Root component with screen navigation
├── app.json               # Expo configuration
├── index.ts               # Entry point
├── package.json
├── tsconfig.json
├── assets/                # App icons and splash images
└── src/
    ├── components/
    │   ├── CelestialView.tsx    # Space-themed gradient background with stars
    │   └── ScannerOverlay.tsx   # Animated scanner overlay with cutout
    └── screens/
        ├── SplashScreen.tsx     # Welcome screen with animated scan button
        └── ScannerScreen.tsx    # Camera scanner with controls
```

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Expo 54](https://expo.dev/) | Cross-platform development framework |
| [React Native](https://reactnative.dev/) | Mobile UI framework |
| [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) | Camera & barcode scanning |
| [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) | Haptic feedback |
| [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | Gradient backgrounds |
| [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) | Safe area insets |
| [@expo/vector-icons](https://docs.expo.dev/guides/icons/) | Icon library (Ionicons) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using Expo & React Native</sub>
</div>
