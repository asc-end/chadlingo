import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "text-encoding";
import { Buffer } from "buffer";
global.Buffer = Buffer;


// import "./styles.css"
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { clusterApiUrl } from "@solana/web3.js";
import { registerRootComponent } from 'expo';
import ConnectWallet from "./flows/connectWallet/ConnectWallet";


import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_700Bold,
  Orbitron_500Medium,
  Orbitron_600SemiBold,
  Orbitron_900Black,
  Orbitron_800ExtraBold,
} from "@expo-google-fonts/orbitron";
import useStore from "./lib/state";
import { deleteValueFor, getEncryptedValueFor, getValueFor } from "./lib/secure-store/secureStore";

import { NavigationContainer } from "@react-navigation/native";
import HomeRoot from "./flows/home/HomeRoot";
import { ConnectionProvider } from "./providers/ConnectionProvider";
import { AuthorizationProvider } from "./providers/AuthorizationProvider";
import Home from "./flows/home/Home";
import { LinearGradient } from "expo-linear-gradient";

const states = {
  null: null,
  connectWallet: ConnectWallet,
  // beginChallenge: BeginChallenge,
  home: HomeRoot,
  // finishedChallenge_lose: Lose,
  // finishedChallenge_win: Win,
};

function App() {
  const { flow, setSolanaCreds, updateFlow, setChallenge, solanaCreds } = useStore();
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
    Orbitron_500Medium,
    Orbitron_600SemiBold,
    Orbitron_900Black,
    Orbitron_800ExtraBold,
  });

  async function getCreds() {
    if (solanaCreds) return solanaCreds;
    else {
      console.log("fetch secure store");
      let solCreds = (await getEncryptedValueFor("sol-creds")) as Creds;
      console.log(solCreds);
      setSolanaCreds(solCreds);
      return solCreds;
    }
  }

  useEffect(() => {
    if (!flow) {
      async function fetchState() {
        let solCreds = await getCreds();
        if (solCreds) {
          updateFlow("home");
        } else {
          updateFlow("connectWallet");
        }
      }
      fetchState();
    }
  }, [flow]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  //@ts-ignore
  let FlowToRender = states[flow];
  if (!FlowToRender) return;
  return (
    <NavigationContainer>
      <SafeAreaView className="">
        <GestureHandlerRootView>
          <ConnectionProvider config={{ commitment: "processed" }} endpoint={clusterApiUrl("devnet")}>
            <AuthorizationProvider>
            <LinearGradient colors={["#00001e", "rgba(0,0,20,1)"]} className="h-full w-full">
              <StatusBar />
              <View className="w-full h-full pt-10" onLayout={onLayoutRootView}>

                {/* <HomeRoot/> */}
                {FlowToRender && <FlowToRender />}

              </View>
            </LinearGradient>
            </AuthorizationProvider>
          </ConnectionProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

registerRootComponent(App);