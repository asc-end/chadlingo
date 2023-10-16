import { Text, View } from "react-native"
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../components/Buttons";
import setChallengeEnded from "../../lib/firebase/setChallengeEnded";
import useStore from "../../lib/state";


export default function Win() {
    const { challenge, updateFlow, solanaCreds} = useStore()

    function onWidthDraw(){
        setChallengeEnded(solanaCreds?.account?.address!, challenge!)
        updateFlow("beginChallenge")
    }
    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">

            <View className="flex flex-col items-center justify-center h-full w-full">
                <Text className="text-white font-bold text-4xl">
                    You won congrats!
                </Text>
                <Text className="text-white/20 text-lg">
                    You can now take back your money
                </Text>
                <View className="absolute bottom-3">

                    <MainButton text="Withdraw" full onPress={onWidthDraw } />
                </View>
            </View>
        </LinearGradient>
    )
}