import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <RootSiblingParent>
        <SafeAreaProvider>
          <Slot screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </RootSiblingParent>
      <StatusBar style="auto" />
    </>
  );
};

export default RootLayout;
