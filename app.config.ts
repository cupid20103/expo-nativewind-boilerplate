import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "HairMagic",
  slug: "HairMagic",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.cupid20103.HairMagic",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.cupid20103.HairMagic",
  },
  web: {
    bundler: "metro",
    output: "server",
    favicon: "./src/assets/images/favicon.png",
  },
  owner: "cupid20103",
  plugins: [
    "expo-font",
    ["expo-router", { origin: "https://hair-magic.expo.app" }],
    [
      "expo-image-picker",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos",
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        backgroundColor: "#ffffff",
        dark: {
          image: "./src/assets/images/splash-icon.png",
          backgroundColor: "#000000",
        },
        resizeMode: "contain",
        imageWidth: 200,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "c0d839a1-2009-44f5-aef1-5c16f78b19c6",
    },
  },
});
