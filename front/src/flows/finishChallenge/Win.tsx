import { Text, View } from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import setChallengeEnded from "../../lib/firebase/setChallengeEnded";
import SolanaIcon from "../../components/solana/SolanaIcon";
import TransactWithContractButton from "../../components/solana/TransactWithContractButton";
import { withdraw } from "../../lib/solana/instructions/withdraw";
import { useSolana } from "../../providers/SolanaProvider";


export default function Win({ navigation, route }: { navigation: any, route: any }) {
  const { solanaCreds } = useSolana()
  const animation = useRef(null);
  const challenge: Challenge = route.params.challenge

  async function onWidthDraw() {
    await setChallengeEnded(solanaCreds?.accounts[0].address!, challenge);
    navigation.navigate("home")
  }

  return (

    <View className="flex items-center justify-center h-full w-full bg-black/30 px-8 py-48">
      <LinearGradient colors={["#7300ff", "#f6885f", "#a152fc"]}
        className="flex flex-col items-center justify-between h-full w-full p-4 rounded-md" style={{ gap: 24, backgroundColor: "#020b2d" }}>
        <Text className="text-white text-2xl font-bold text-center">{`You won a ${challenge.type} challenge`}</Text>
        <View className="flex flex-row items-center bg-black rounded-md p-4 border   border-purple-600" style={{ gap: 24 }}>
          <Text className="text-white text-4xl" style={{ fontFamily: "Orbitron_700Bold" }}> {`+ ${challenge.solStaked.toFixed(2)}`}</Text>
          <SolanaIcon size={40} />
        </View>
        <View className="w-full">
          <TransactWithContractButton text="Withdraw" onFinished={onWidthDraw} getInstructions={withdraw} challengeId={challenge.id}/>
        </View>
      </LinearGradient >
    </View>
  );
}
