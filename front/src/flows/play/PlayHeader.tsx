import { Pressable, Share, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import { SharedValue } from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PlayHeader({ navigation, progression }: {navigation:any, progression: SharedValue<number> }) {
  return (
    <View className="absolute top-3 left-2 right-2 flex flex-row items-center justify-around" style={{ gap: 12 }}>
      <Pressable className=" bg-white/20 rounded-full p-2" onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" color="white" size={24} />
      </Pressable>
      <View className=" w-5/6">
        <ProgressBar percentage={progression} />
      </View>
    </View>
  );
}
