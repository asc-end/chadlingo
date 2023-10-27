import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Pressable } from "react-native";

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
    <Pressable onPress={() => data.state != "Coming Soon" && onPress && onPress(data.name)} className="w-full">
      <LinearGradient
        colors={["#121293", "#3d23ce"]}
        className={`w-full h-fit rounded-md p-3 flex flex-row items-center justify-between border
          ${data.state == "Coming Soon" ? " opacity-40" : ""}
          ${selected ? " border-gray-400" : ""}
          `}
        style={{ gap: 12 }}>
        <MaterialCommunityIcons name={data.iconName} size={58} color={"#bc6bff"} />
        <View className="flex-1 flex flex-col justify-center">
          <View className="flex flex-row justify-between items-center">
            <Text className={`font-bold text-2xl text-white`}>{data.name}</Text>
            {data.state == "Coming Soon" && <Text className={` tex-xl text-white italic`}>{data.state}</Text>}
          </View>
          <Text className={`text-white/50 w-52`}>{data.description}</Text>
        </View>
        {data.state !== "Coming Soon" && <MaterialCommunityIcons name="chevron-right" color={"white"} size={36} />}
      </LinearGradient>
    </Pressable>
  );
}
