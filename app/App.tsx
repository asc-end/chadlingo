import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";

import ConnectWallet from "./flows/connectWallet/ConnectWallet";
import { WelcomeScreen, SelectLanguage, StakeScreen } from "./flows/beginChallenge";
import { Lose, Win } from "./flows/finishedChallenge"
import Home from "./flows/home/Home";

import useStore from "./lib/state";
import { deleteValueFor, getValueFor } from "./lib/secure-store/secureStore";
import { decryptJSON } from "./lib/secure-store/crypto";
import getUserChallenge from "./lib/firebase/getUserChallenge";

import { NavigationContainer } from '@react-navigation/native';
import BeginChallenge from "./flows/beginChallenge/BeginChallenge";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import HomeRoot from "./flows/home/HomeRoot";
import Play from "./flows/home/play/Play";
import SignDay from "./flows/home/signDay/SignDay";
// const Tab = createBottomTabNavigator();

const states = {
  null: null,
  "connectWallet": ConnectWallet,
  "beginChallenge": BeginChallenge,
  "home": HomeRoot,
  "finishedChallenge_lose": Lose,
  "finishedChallenge_win": Win,
  "play": Play,
  "play_sign": SignDay,
};

export default function App() {
  const { flow, setSolanaCreds, updateFlow, setChallenge } = useStore();
  const scrollViewRef = useRef<null | ScrollView>(null);

  useEffect(() => {
    if (!flow) {
      async function fetchState() {
        // await deleteValueFor("sol-auth");
        //see if wallet is connected
        let authStr = await getValueFor("sol-auth");
        if (authStr) {
          //get first account from previous connections
          let encrypted_acc = await getValueFor("sol-creds");
          let _accounts = decryptJSON(encrypted_acc) as Array<Account>;

          setSolanaCreds({ account: _accounts[0], authToken: authStr });

        } else {
          // updateFlow("connectWallet");
        }

        let challenge: Challenge = await getUserChallenge("marie")
        if (!challenge) {
          updateFlow("beginChallenge")
          return
        }
        setChallenge(challenge)
        updateFlow("home")

      };
      fetchState()

    }
  }, []);
  //@ts-ignore
  let FlowToRender = states[flow];
  if (!FlowToRender) return
  return (
    <NavigationContainer>
      <SafeAreaView className="">
        <GestureHandlerRootView>
          <View className="w-full h-full">
          <StatusBar hidden />
          {FlowToRender && <FlowToRender />}

          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationContainer>
  );
}
