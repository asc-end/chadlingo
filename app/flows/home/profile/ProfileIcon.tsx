import { View, Text, Pressable } from "react-native";

export default function ProfileIcon({onPress}: {onPress: () => void}) {

    return (
        <Pressable className="bg-purple-800/30 px-3 py-2 rounded-md flex flex-row items-center w-fit" style={{ gap: 12 }}  onPress={() => onPress()}>
            <View className=" w-8 h-8 rounded-full bg-cyan-400/20"></View>
            <Text className="text-white">Address</Text>
        </Pressable>
    )
}

