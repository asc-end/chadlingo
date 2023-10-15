import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import ConnectButton from "../../../components/solana/ConnectButton";
import useStore from "../../../lib/state";
import Avatar from "../../../components/Avatar";

export default function Profile({ navigation }: { navigation: any }) {
    const { solanaCreds } = useStore()
    return (
        <View className="bg-black flex p-4 pt-24 h-full flex-col items-center justify-between">
            <Pressable onPress={() => navigation.navigate("home")} className="p-4 absolute top-3 left-3">
                <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </Pressable>
            <Avatar size="large" />
            <Text className="text-white">{solanaCreds?.account?.address}</Text>
            <ConnectButton text="Change Wallet" onConnected={() => { }} />
        </View>
    )
}