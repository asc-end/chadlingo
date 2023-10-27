import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View } from "react-native";
import LanguageFlag from "./LanguageFlag";

export default function FromTo({ codeFrom, codeTo }: { codeFrom: string; codeTo: string }) {
  return (
    <View className="flex flex-row items-center" style={{ gap: 6 }}>
      <Pressable>{codeFrom && <LanguageFlag code={codeFrom} size="small" />}</Pressable>
      <MaterialCommunityIcons name="chevron-right" color="white" size={20} />
      <LanguageFlag code={codeTo} size="small" />
    </View>
  );
}
