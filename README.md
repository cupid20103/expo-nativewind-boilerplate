# 🎨 AI Hairstyle Changer – Expo + NativeWind Boilerplate

This project is a mobile app built with **Expo** and **NativeWind** that integrates with **Replicate AI** to generate new hairstyles based on an uploaded image and a text prompt.  

Upload your photo, describe the hairstyle you want, and the app will generate a transformed image using AI.  

---

## 🚀 Features

- Built with **Expo (SDK v52)** for fast cross-platform mobile development.  
- Styled with **NativeWind** (Tailwind CSS for React Native).  
- **Replicate AI** integration to generate hairstyle transformations.  
- Upload an image + enter a prompt → receive AI-generated results.  
- Clean boilerplate setup, ready to customize and extend.  

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:  

- [Node.js](https://nodejs.org/) **v22+**  
- [Git](https://git-scm.com/)  
- [Yarn](https://yarnpkg.com/) (preferred package manager)  
- [Expo Go App](https://expo.dev/client) (iOS App Store / Google Play) for testing on a real device  
- [Replicate Account](https://replicate.com/) and API Token  

---

## 📦 Installation & Setup

Follow these steps to set up the project locally:  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/cupid20103/expo-nativewind-boilerplate.git
cd expo-nativewind-boilerplate
```

### 2️⃣ Install dependencies
```bash
yarn install
```

### 3️⃣ Configure environment variables
```bash
APP_ENV=development or production
REPLICATE_API_TOKEN=your_replicate_api_key
```

### 4️⃣ Start the Expo development server
```bash
yarn start
```

### 5️⃣ Run the app
- On a physical device:
   - Install the Expo Go app from the App Store / Google Play.
   - Scan the QR code displayed in your terminal/browser after running yarn start.
- On an emulator/simulator:
   - iOS: Requires Xcode installed (yarn ios)
   - Android: Requires Android Studio emulator (yarn android)
