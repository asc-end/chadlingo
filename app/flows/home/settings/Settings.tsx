import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export default function Settings({ navigation }: { navigation: any }) {
    console.log("SETTINGS")
    return (
        <View className="bg-black right-0 h-full w-full flex flex-col pt-24 items-center">
            <Pressable onPress={() => navigation.navigate("home")} className="p-4 absolute top-3 left-3">
                <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </Pressable>
            <Text className=" text-white text-2xl">Language</Text>
            <Text className=" text-white text-2xl">Dark mode</Text>
            <Text className=" text-white text-2xl">Sound</Text>
            <Text className=" text-white text-2xl">Notifications</Text>

        </View>
    )

}