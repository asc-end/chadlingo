import { Text, View, Alert } from "react-native";
import { MainButton } from "../../../../components/Buttons";
import useStore from "../../../../lib/state";
import updateChallenge from "../../../../lib/firebase/updateChallenge";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ValidateButton from "../../../../components/solana/ValidateButton";

export default function SignDay({ navigation, route }: { navigation: any, route: any }) {
    const { solanaCreds } = useStore();
    const challenge = route.params.challenge
    function endDay() {
        //@ts-ignore
        const newChallenge: Challenge = { ...challenge, nbDone: challenge.nbDone + 1 }
        // console.log("NEW CHALLENGE", newChallenge)
        // setChallenge(newChallenge)
        updateChallenge(solanaCreds?.accounts[0].address!, newChallenge)
        navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    return (

        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
            <View className="h-full flex flex-col items-center justify-center">
                <Text className="text-white text-3xl font-bold text-center">Congrats!</Text>
                <Text className="text-white text-2xl mb-12">Sign to finish the day</Text>
                <ValidateButton onFinished={endDay}/>
            </View>
        </LinearGradient>)
}