import { Pressable, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { SecondaryButton } from "../../../components/Buttons";

export default function SettingsIcon({ onPress }: { onPress: () => void }) {
    return (
        <SecondaryButton onPress={onPress}>
            <MaterialCommunityIcons name="cog" size={24} color="white" />
        </SecondaryButton>
    )
}