import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import ConnectButton from "../../../components/solana/ConnectButton";

export default function Profile({ navigation }: { navigation: any }) {
    return (<View className="bg-black flex p-4 h-full flex-col items-center">
        <Pressable onPress={() => navigation.navigate("home")} className="p-4 absolute top-3 left-3">
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </Pressable>
        <View className="h-24 w-24 bg-cyan-400/20 rounded-full"></View>
        <ConnectButton text="Change Wallet" onConnected={() => {}}/>
    </View>)
}