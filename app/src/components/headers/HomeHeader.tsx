import { Text, View } from "react-native";
import SettingsIcon from "../../flows/home/settings/SettingsIcon"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MainButton, SecondaryButton } from "../../components/Buttons";

export default function HomeHeader({ navigation }: { navigation: any }) {
    return (
        <View className="absolute z-50 top-0 left-0 right-0 flex flex-row items-center justify-between px-3 py-2" style={{ backgroundColor: "#00001e" }}>
            <SecondaryButton onPress={() => navigation.navigate("SelectChallenge")} fade={false}>
                <MaterialCommunityIcons name="plus" color={"white"} size={20}/>
                <Text className="text-white font-bold">New Challenge</Text>
            </SecondaryButton>
            <View className="flex flex-row" style={{ gap: 12 }}>
                <SettingsIcon onPress={() => navigation.navigate("settingsModal")} />
            </View>
        </View>
    );
}
