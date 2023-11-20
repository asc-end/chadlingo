import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ConnectButton from "../../components/solana/ConnectButton";
import { LinearGradient } from "expo-linear-gradient";
import { useSolana } from "../../providers/SolanaProvider";

export default function ConnectWallet({ navigation }: { navigation: any }) {
    const { connexionState, solanaCreds } = useSolana()

    useEffect(() => {
        if (connexionState == "connected") {
            navigation.navigate('home')
            console.log("CONNNNNNNECTED", solanaCreds)
        }
    }, [connexionState])
    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
            <View className="flex flex-col items-center justify-center h-full px-6" style={{ gap: 48 }}>
                <Text className="text-white text-4xl font-bold">Oops</Text>
                <Text className="text-white text-xl -mt-12">You need to connect your wallet first</Text>
                <ConnectButton />
            </View>
        </LinearGradient>
    )
}