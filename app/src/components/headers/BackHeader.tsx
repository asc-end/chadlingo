import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View } from "react-native";

export default function BackHeader({ navigation }: { navigation: any }) {

    return (
        <View className="w-full top-0 right-0 left-0 h-14 flex justify-center z-50">
            <Pressable onPress={() => navigation.navigate("home")} className="">
                <MaterialCommunityIcons name="chevron-left" size={40} color="white" />
            </Pressable>
        </View>
    )
}