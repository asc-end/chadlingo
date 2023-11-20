import { Text, View } from "react-native";
import SettingsIcon from "../../flows/settings/SettingsIcon"
import NewChallenge from "../buttons/NewChallenge";

export default function HomeHeader({ navigation, noNew }: { navigation: any, noNew: boolean }) {
    return (
        <View className="absolute z-50 top-0 left-0 right-0 flex flex-row items-center justify-between px-3 py-2" style={{ backgroundColor: "#00001e" }}>
            {noNew ? <></> : <NewChallenge navigation={navigation} />}
            <View className="flex flex-row ml-auto" style={{ gap: 12 }}>
                <SettingsIcon onPress={() => navigation.navigate("settingsModal")} />
            </View>
        </View>
    );
}
