import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";

import ConnectWallet from "./flows/connectWallet/ConnectWallet";
import { WelcomeScreen, SelectLanguage, StakeScreen } from "./flows/beginChallenge";
import { Lose, Win } from "./flows/finishedChallenge"
import Home from "./flows/home/Home";
import Play from "./flows/play/Play";

import useStore from "./lib/state";
import { deleteValueFor, getValueFor } from "./lib/secure-store/secureStore";
import { decryptJSON } from "./lib/secure-store/crypto";
import getUserChallenge from "./lib/firebase/getUserChallenge";

const states = {
  null: null,
  "connectWallet": ConnectWallet,
  "beginChallenge_welcome": WelcomeScreen,
  "beginChallenge_language1": () => <SelectLanguage index={1} />,
  "beginChallenge_language2": () => <SelectLanguage index={2} />,
  "beginChallenge_stake": StakeScreen,
  "home": Home,
  "finishedChallenge_lose": Lose,
  "finishedChallenge_win": Win,
  "play": Play,
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
          updateFlow("beginChallenge_welcome")
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

  return (
    <SafeAreaView className="h-full">
      <GestureHandlerRootView>
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
          <StatusBar barStyle="dark-content" />
          <View className="h-full">
            {/* <MainButton text="remove account" onPress={() => deleteValueFor("sol-auth")}/> */}
            {/* <AccountProvider> */}
            {/* <ConnectionProvider> */}
            {FlowToRender && <FlowToRender />}
            {/* </ConnectionProvider> */}
            {/* </AccountProvider> */}
          </View>
        </LinearGradient>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
