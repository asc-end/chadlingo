import { Image, Text, View } from "react-native"
import React from "react";
import { MainButton } from "../../components/Buttons";
import useStore from "../../lib/state";
import getUserChallenge from "../../lib/firebase/getUserChallenge";
import setChallengeEnded from "../../lib/firebase/setChallengeEnded";


const gifs = [
    "https://media.tenor.com/W5SYj30r3JkAAAAC/american-psycho.gif",
    "https://i.gifer.com/UTJb.gif"
]

export default function Lose() {
    const { updateFlow } = useStore()

    async function endChallenge() {
        const challenge = await getUserChallenge("marie")
        setChallengeEnded("marie", challenge)
        updateFlow("beginChallenge_welcome")
    }

    return (
        <View className="flex flex-col items-center h-full w-full">
            <View className="absolute z-30 h-full mt-24">

                <Text className="text-white text-5xl font-bold">
                    You lost
                </Text>
            </View>
            <View className="absolute z-40 bottom-24">
                <MainButton text="Try again" onPress={endChallenge} />
            </View>
            <Image className="w-96 h-full absolute " source={{ uri: gifs[Math.floor(Math.random() * gifs.length)] }} />
        </View>
    )
}


