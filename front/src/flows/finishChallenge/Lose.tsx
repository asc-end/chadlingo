import { Image, Text, View } from "react-native"
import React, { useEffect } from "react";
import { SecondaryButton } from "../../components/buttons";
import { LinearGradient } from "expo-linear-gradient";
import setChallengeEnded from "../../lib/firebase/setChallengeEnded";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SolanaIcon from "../../components/solana/SolanaIcon";
import { useSolana } from "../../providers/SolanaProvider";

const gifs = [
    "https://media.tenor.com/W5SYj30r3JkAAAAC/american-psycho.gif",
    "https://i.gifer.com/UTJb.gif"
]

export default function Lose({ navigation, route }: { navigation: any, route: any }) {
    const { solanaCreds } = useSolana()
    const challenge: Challenge = route.params.challenge


    useEffect(() =>{
        setChallengeEnded(solanaCreds?.accounts[0].address!, route.params.challenge);

    }, [])

    async function endChallenge() {
        console.log("home")
        navigation.navigate("home")
    }

    return (
        <View className="flex items-center justify-center h-full w-full bg-black/30 px-8 py-48">

            <LinearGradient colors={["#9c3838", "#460404"]}

                className="flex flex-col items-center justify-between h-full w-full p-4 rounded-md" style={{ gap: 24, backgroundColor: "#050e230" }}>
                <Text className="text-white text-2xl font-bold text-center">{`You lost a ${challenge.type} challenge`}</Text>
                <Image className=" w-full h-32" source={{ uri: gifs[Math.floor(Math.random() * gifs.length)] }} />
                <View className="flex flex-row items-center bg-black rounded-md p-4 border  border-red-600" style={{ gap: 24 }}>
                    <Text className="text-white text-4xl" style={{ fontFamily: "Orbitron_700Bold" }}> {`- ${challenge.solStaked.toFixed(2)}`}</Text>
                    <SolanaIcon size={40} />
                </View>
                <View className="w-full flex justify-end flex-row h-14">
                    <SecondaryButton onPress={endChallenge} fade>
                        <Text className="text-white text-xl 48">I will do better.</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color={"#FFFFFF30"} />
                    </SecondaryButton>
                </View>
                {/* <Challenge challengeData={route.params.challenge} alone={true} onPress={() => { }} /> */}

                {/* </View> */}
            </LinearGradient>
        </View>
    )
}


