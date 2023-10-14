import { Pressable, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export default function SettingsIcon({ onPress }: { onPress: () => void }) {
    function _onPress() {
        console.log("press")
        onPress()
    }
    return (
        <Pressable className="" onPressIn={() => _onPress()}>
            <View className="h-full bg-purple-800/30 px-3 py-2 rounded-md flex flex-row items-center w-fit">
                <MaterialCommunityIcons name="cog" size={24} color="white" />
            </View>
        </Pressable>
    )
}