import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useStore from "../../lib/state";
import { MainButton } from "../../components/Buttons";
import setNewUser from "../../lib/firebase/setNewUser";
import getUserKey from "../../lib/firebase/getUserKey";

export default function BeginChallenge() {
  const { updateFlow } = useStore();

  useEffect(() => { 
    console.log("user", getUserKey("marie"))
  }, [])

  return (
    <View className="w-full h-full px-4 py-12 flex flex-col items-center justify-center">
      <Text className="font-black text-7xl text-white">30 days</Text>
      <Text className="font-bold text-4xl text-white">to become a chad</Text>
      <Text className="italic text-2xl text-white mb-8">stake and hold yourself accountable</Text>
      <MainButton onPress={() => updateFlow("beginChallenge_language1")} text="Begin" />
    </View>
  );
}
