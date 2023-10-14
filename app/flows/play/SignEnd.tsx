import { Text, View } from "react-native";
import { MainButton } from "../../components/Buttons";
import useStore from "../../lib/state";
import updateChallenge from "../../lib/firebase/updateChallenge";

export default function SignEnd(){
  const { updateFlow, setChallenge, challenge} = useStore();

    function endDay(){
        //@ts-ignore
        const newChallenge: Challenge = { ...challenge, nbDone: challenge.nbDone + 1 }
        console.log("NEW CHALLENGE", newChallenge)
        setChallenge(newChallenge)
        updateChallenge("marie", newChallenge)
        updateFlow("home")
    }

    return(<View>
        <Text>Sign to finish the day</Text>
        <MainButton text="Sign" onPress={endDay}/>
    </View>)
}