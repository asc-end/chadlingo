import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Pressable } from "react-native";
import { elementWrapper } from "../../styles/styles";

export default function ChallengePreview({
  data,
  onPress,
  selected,
}: {
  data: any;
  onPress?: (type: ChallengeType) => void;
  selected: boolean;
}) {
  const textColor = data.state == "Coming Soon" ? "text-white/50" : "text-white";

  return (
    <Pressable onPress={() => data.state != "Coming Soon" && onPress && onPress(data.name)} className={`${elementWrapper} ${selected && " border-white/40"} ${data.state == "Coming Soon" && "opacity-50"}`} style={{gap: 12}}>
        <MaterialCommunityIcons name={data.iconName} size={42} color={"#956bff"} />
        <View className="flex-1 flex flex-col justify-center">
          <View className="flex flex-row justify-between items-center">
            <Text className={`font-bold text-2xl text-white`}>{data.name}</Text>
            {data.state == "Coming Soon" && <Text className={` tex-xl text-white italic`}>{data.state}</Text>}
          </View>
          <Text className={`text-white/50`}>{data.description}</Text>
        </View>
    </Pressable>
  );
}
