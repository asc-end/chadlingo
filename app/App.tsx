import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { clusterApiUrl } from '@solana/web3.js';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'text-encoding'
import { Buffer } from 'buffer';
global.Buffer = Buffer
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
import { ConnectionProvider } from "./providers/ConnectionProvider";
import { AuthorizationProvider } from "./providers/AuthorizationProvider";
// const Tab = createBottomTabNavigator();

const states = {
  null: null,
  "connectWallet": ConnectWallet,
  "beginChallenge": BeginChallenge,
  "home": HomeRoot,
  "finishedChallenge_lose": Lose,
  "finishedChallenge_win": Win,
};

export default function App() {
  const { flow, setSolanaCreds, updateFlow, setChallenge, solanaCreds } = useStore();
  const scrollViewRef = useRef<null | ScrollView>(null);

  console.log("flow")
  useEffect(() => {
    if (!flow) {
      async function fetchState() {
        // await deleteValueFor("sol-auth");
        //see if wallet is connected
        console.log("fetch state")
        let authStr = await getValueFor("sol-auth");
        if (authStr || solanaCreds) {
          console.log("auth")
          //get first account from previous connections
          let encrypted_acc = await getValueFor("sol-creds");
          let _accounts = decryptJSON(encrypted_acc) as Array<Account>;

          console.log(_accounts[0])
          setSolanaCreds({ account: _accounts[0], authToken: authStr });
          let challenge: Challenge = await getUserChallenge(_accounts[0].address)
          if (!challenge) {
            updateFlow("beginChallenge")
            return
          }
          setChallenge(challenge)
          updateFlow("home")

        } else {
          console.log("not auth")
          updateFlow("connectWallet");
        }
        // if(!solanaCreds  || !solanaCreds.account || !solanaCreds.account.address){
        //   console.log("test")
        //   updateFlow("connectWallet")
        //   return
        // }
      };
      fetchState()

    }
  }, [flow]);

  //@ts-ignore
  let FlowToRender = states[flow];
  if (!FlowToRender) return
  return (
    <NavigationContainer>
      <SafeAreaView className="">
        <GestureHandlerRootView>
          <ConnectionProvider config={{ commitment: 'processed' }} endpoint={clusterApiUrl("devnet")}>
            <AuthorizationProvider>
              <View className="w-full h-full">
                <StatusBar hidden />
                {FlowToRender && <FlowToRender />}
              </View>
            </AuthorizationProvider>
          </ConnectionProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationContainer>
  );
}
