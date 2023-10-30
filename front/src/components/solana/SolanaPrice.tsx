import { Image, Text, View } from "react-native";
import SolanaIcon from "./SolanaIcon";

export default function SolanaPrice({ amount, hue=230 }: { amount: number, hue?: number}) {
  return (
    <View className="rounded-lg  flex flex-row items-center px-4 py-2" style={{ gap: 6, backgroundColor:`hsl(${hue}, 100%, 49.411764705882355%)` }}>
      <Text className="text-white font-bold text-xs w-8 text-center">{parseFloat(amount.toFixed(3))}</Text>
      <SolanaIcon size={16}/>
    </View>
  );
}
