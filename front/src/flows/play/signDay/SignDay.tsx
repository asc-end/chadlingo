import { Text, View } from "react-native";
import updateChallenge from "../../../lib/firebase/updateChallenge";
import { LinearGradient } from "expo-linear-gradient";
import TransactWithContractButton from "../../../components/solana/TransactWithContractButton";
import { validateDay } from "../../../lib/solana/instructions/validateDay";
import { useSolana } from "../../../providers/SolanaProvider";

export default function SignDay({ navigation, route }: { navigation: any, route: any }) {
    const { solanaCreds } = useSolana();
    const challenge = route.params.challenge


    function endDay() {
        //@ts-ignore
        const newChallenge: Challenge = { ...challenge, nbDone: challenge.nbDone + 1 }
        updateChallenge(solanaCreds?.accounts[0].address!, newChallenge)
        navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    return (

        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full px-4">
            <View className="h-full flex flex-col items-center justify-center">
                <Text className="text-white text-3xl font-bold text-center">Congrats!</Text>
                <Text className="text-white text-2xl mb-12">Sign to finish the day</Text>
                <TransactWithContractButton text="Validate" onFinished={endDay} getInstructions={validateDay} />
            </View>
        </LinearGradient>)
}