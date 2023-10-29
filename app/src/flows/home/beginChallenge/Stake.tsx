import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MainButton } from "../../../components/Buttons";
import SolAmountInput from "../../../components/solana/SolAmountInput";
import useStore from "../../../lib/state";
import setNewChallenge from "../../../lib/firebase/setNewChallenge";
import { LinearGradient } from "expo-linear-gradient";
import CreateVaultButton from "../../../components/solana/CreateVaultButton";
import { fetchSecureDate } from "../../../lib/dates/fetchSecureDate";
import ExitHeader from "../../../components/headers/ExitHeader";

export default function Stake({ navigation, onFinish, newChallengeState }: {
  navigation: any; onFinish?: (amount: number) => void, newChallengeState: {
    type?: ChallengeType;
    languageFrom?: LanguageType;
    languageTo?: LanguageType;
    duration?: number
  }
}) {
  const [amount, setAmount] = useState("");
  const { solanaCreds } = useStore();

  function onPress() {
    if (amount == "") return
    async function _onPress() {
      try {
        let secureDate = await fetchSecureDate();
        if (!secureDate) throw Error("Secure date fetch not possible")

        let challenge: LanguageChallenge | MeditationChallenge;

        switch (newChallengeState.type) {
          case "Language":
            challenge = {
              beginDate: secureDate?.getTime(),
              type: newChallengeState.type!,
              nbDone: 0,
              state: "during",
              solStaked: parseFloat(amount),
              languageFrom: newChallengeState.languageFrom!,
              languageTo: newChallengeState.languageTo!
            } as LanguageChallenge;
            break;
          case "Meditation":
            challenge = {
              beginDate: secureDate?.getTime(),
              type: newChallengeState.type!,
              nbDone: 0,
              state: "during",
              solStaked: parseFloat(amount),
              duration: newChallengeState.duration
            } as MeditationChallenge;
            break;
        }

        await setNewChallenge(solanaCreds?.accounts[0].address!, challenge!);
        navigation.navigate("home");
      } catch (e) {
        console.log(e);
      }
    }
    _onPress()
  }

  console.log(amount, (amount == "" || parseFloat(amount) === 0))
  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full relative flex flex-col">
      <ExitHeader navigation={navigation} />
      <View className="flex-1 h-full flex flex-col items-center justify-center px-6" style={{ gap: 16 }}>
        <SolAmountInput amount={amount} setAmount={setAmount} />
        <CreateVaultButton onFinished={onPress} disabled={amount == "" || parseFloat(amount) === 0} />
      </View>
    </LinearGradient>
  );
}
