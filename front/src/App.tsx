import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "text-encoding";
import { Buffer } from "buffer";
global.Buffer = Buffer;


// import "./styles.css"
import { SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from 'expo';

import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_700Bold,
  Orbitron_500Medium,
  Orbitron_600SemiBold,
  Orbitron_900Black,
  Orbitron_800ExtraBold,
} from "@expo-google-fonts/orbitron";
import { NavigationContainer } from "@react-navigation/native";
import HomeRoot from "./flows/HomeRoot";
import { LinearGradient } from "expo-linear-gradient";
import { SolanaProvider } from "./providers/SolanaProvider";

function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular, Orbitron_700Bold, Orbitron_500Medium, Orbitron_600SemiBold, Orbitron_900Black, Orbitron_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <SafeAreaView className="">
        <GestureHandlerRootView>
          <SolanaProvider>
            <LinearGradient colors={["#00001e", "rgba(0,0,20,1)"]} className="h-full w-full">
              <StatusBar />
              <View className="w-full h-full pt-10" onLayout={onLayoutRootView}>
                <HomeRoot/>
              </View>
            </LinearGradient>
          </SolanaProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

registerRootComponent(App);