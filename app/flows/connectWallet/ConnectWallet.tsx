import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import ConnectButton from "../../components/solana/ConnectButton";
import useStore from "../../lib/state";
import setNewUser from "../../lib/firebase/setNewUser";
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../components/Buttons";

export default function ConnectWallet() {
    const { updateFlow } = useStore()

    function onConnected(address: string) {
        setNewUser(address)
        updateFlow(null)
    }

    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
            <View className="flex flex-col items-center justify-center h-full px-6" style={{ gap: 48 }}>
                <Text className="text-white text-4xl font-bold">Oops</Text>
                <Text className="text-white text-xl -mt-12">You need to connect your wallet first</Text>
                <ConnectButton onConnected={onConnected} />
            </View>
        </LinearGradient>
    )
}