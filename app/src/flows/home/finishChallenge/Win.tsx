import { Text, View } from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../../components/Buttons";
import setChallengeEnded from "../../../lib/firebase/setChallengeEnded";
import useStore from "../../../lib/state";
import WithdrawButton from "../../../components/solana/WithdrawButton";
import LottieView from 'lottie-react-native';
import animation from "../../../assets/money.json"
export default function Win({ navigation, route }: { navigation: any, route: any }) {
  const { solanaCreds } = useStore();
  const animation = useRef(null);

  async function onWidthDraw() {
    await setChallengeEnded(solanaCreds?.accounts[0].address!, route.params.challenge);
    navigation.navigate("home")
  }

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      {/* <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 800,
          height: 800,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={animation}
      /> */}
      <View className="flex flex-col items-center justify-center h-full w-full">
        <Text className="text-white font-bold text-4xl">You won congrats!</Text>
        <Text className="text-white/20 text-lg">You can now take back your money</Text>
        <View className="absolute bottom-3">
          <WithdrawButton onFinished={onWidthDraw} />
        </View>
      </View>
    </LinearGradient>
  );
}
