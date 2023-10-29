import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View } from "react-native";


export default function ExitHeader({ navigation }: { navigation: any }) {
    return (
        <View className="w-full top-0 right-0 left-0 h-14 flex justify-center z-50">
            <Pressable onPress={() => navigation.navigate("home")} className="p-3">
                <MaterialCommunityIcons name="close" size={32} color="white" />
            </Pressable>
        </View>
    );
}