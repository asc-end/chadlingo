import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MainButton } from "../../components/Buttons";
import SolAmountInput from "../../components/solana/SolAmountInput";
import useStore from "../../lib/state";
import setNewChallenge from "../../lib/firebase/setNewChallenge";

export default function StakeScreen() {
  const [amount, setAmount] = useState("");
  const {updateFlow} = useStore()

  function onPress(){
    setNewChallenge("marie", "portuguese")
    updateFlow("home")
  }

  return (
    <View className="h-full flex flex-col items-center justify-center" style={{gap: 16}}>
      <SolAmountInput amount={amount} setAmount={setAmount}/>
      <MainButton text="Stake and Begin" onPress={onPress}/>
    </View>
  );
}
