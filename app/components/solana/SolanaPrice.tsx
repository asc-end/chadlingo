import { Image, Text, View } from "react-native";
import SolanaIcon from "./SolanaIcon";

export default function SolanaPrice({ amount }: { amount: number }) {
  return (
    <View className="rounded-lg  flex flex-row items-center px-4 py-2" style={{ gap: 6, backgroundColor:"rgb(0, 8, 252)" }}>
      <Text className="text-white font-bold text-xs">{amount}</Text>
      <SolanaIcon size={16}/>
    </View>
  );
}
