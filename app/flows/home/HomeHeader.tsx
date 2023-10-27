import { Pressable, Text, View } from "react-native";
import SettingsIcon from "./settings/SettingsIcon";
import LanguageFlag from "../../components/languages/LanguageFlag";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { languages } from "../../components/languages/languages";
import SolanaPrice from "../../components/solana/SolanaPrice";

export default function HomeHeader({ navigation }: { navigation: any }) {
  return (
    <View className="absolute z-50 top-0 left-0 right-0 flex flex-row items-center justify-between px-3 py-2" style={{backgroundColor: "#00001e"}}>
      <Text className="font-bold text-white">Date</Text>
      <View className="flex flex-row" style={{ gap: 12 }}>
        {/* <SolanaPrice amount={30} /> */}
        <SettingsIcon onPress={() => navigation.navigate("settingsModal")} />
      </View>
    </View>
  );
}
