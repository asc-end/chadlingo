import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MainButton } from "../../../components/Buttons";
import SolAmountInput from "../../../components/solana/SolAmountInput";
import useStore from "../../../lib/state";
import setNewChallenge from "../../../lib/firebase/setNewChallenge";
import { LinearGradient } from "expo-linear-gradient";
import CreateVaultButton from "../../../components/solana/CreateVaultButton";
import { fetchSecureDate } from "../../../lib/dates/fetchSecureDate";

export default function Stake({ navigation, onFinish, newChallengeState }: { navigation: any; onFinish?: (amount: number) => void, newChallengeState: {
  type?: ChallengeType;
  languageFrom?: LanguageType;
  languageTo?: LanguageType;
} }) {
  const [amount, setAmount] = useState("");
  const { solanaCreds } = useStore();

  function onPress() {
    async function _onPress() {
      try {
        let secureDate = await fetchSecureDate();
        if(!secureDate) throw Error("Secure date fetch not possible")
        let challenge: LanguageChallenge = {
          beginDate: secureDate?.getTime(),
          type: "Language",
          nbDone: 0,
          state: "during",
          //add selected
          languageFrom: newChallengeState.languageFrom!,
          languageTo: newChallengeState.languageTo!,
          solStaked: parseFloat(amount)
        };
        setNewChallenge(solanaCreds?.accounts[0].address!, challenge);
        navigation.navigate("home");
      } catch (e) {
        console.log(e);
      }
    }
    _onPress()
  }

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      <View className="h-full flex flex-col items-center justify-center px-6" style={{ gap: 16 }}>
        <SolAmountInput amount={amount} setAmount={setAmount} />
        <CreateVaultButton onFinished={onPress} />
      </View>
    </LinearGradient>
  );
}
