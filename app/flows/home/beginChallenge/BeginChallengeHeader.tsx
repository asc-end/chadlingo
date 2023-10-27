import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View } from "react-native";

export default function BeginChallengeHeader({navigation}: {navigation:any}) {
  return (
    <View className="w-full px-4 py-2 bg-[#000014]">
      <Pressable onPress={() => navigation.navigate("home")}>
        <MaterialCommunityIcons name="close" size={32} color="white" />
      </Pressable>
    </View>
  );
}
