import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MainButton } from "../../components/Buttons";
import SolAmountInput from "../../components/solana/SolAmountInput";
import useStore from "../../lib/state";
import setNewChallenge from "../../lib/firebase/setNewChallenge";
import { LinearGradient } from "expo-linear-gradient";
import CreateVaultButton from "../../components/solana/CreateVaultButton";

export default function StakeScreen({ navigation, onFinish }: { navigation: any, onFinish: (amount:number) => void }) {
  const [amount, setAmount] = useState("");

  function onPress() {
    onFinish(parseInt(amount))
  }

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">

      <View className="h-full flex flex-col items-center justify-center px-6" style={{ gap: 16 }}>
        <SolAmountInput amount={amount} setAmount={setAmount} />
        <CreateVaultButton onFinished={onPress}/>
      </View>
    </LinearGradient>
  );
}
