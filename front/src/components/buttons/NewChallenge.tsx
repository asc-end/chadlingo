import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { default as SecondaryButton } from "./Secondary";
import { Text } from "react-native";

export default function NewChallenge({ navigation }: { navigation: any }) {
    return (
        <SecondaryButton onPress={() => navigation.navigate("SelectChallenge")} fade={false}>
            <MaterialCommunityIcons name="plus" color={"white"} size={20} />
            <Text className="text-white font-bold">New Challenge</Text>
        </SecondaryButton>
    )
}