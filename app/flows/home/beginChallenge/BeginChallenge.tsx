import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../../components/Buttons";

export default function BeginChallenge({ navigation }: { navigation: any }) {
  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      <View className="w-full h-full px-4 py-12 flex flex-col items-center justify-center">
        <Text className="font-black text-7xl text-white">30 days</Text>
        <Text className="font-bold text-4xl text-white">to become a chad</Text>
        <Text className="italic text-2xl text-white mb-8">stake and hold yourself accountable</Text>
        <MainButton onPress={() => navigation?.navigate("SelectChallenge")} text="Begin" />
      </View>
    </LinearGradient>
  );
}
