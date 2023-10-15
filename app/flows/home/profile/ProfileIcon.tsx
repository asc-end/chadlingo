import { View, Text, Pressable } from "react-native";
import Avatar from "../../../components/Avatar";
import useStore from "../../../lib/state";

export default function ProfileIcon({onPress}: {onPress: () => void}) {
    const { solanaCreds } = useStore()


    return (
        <Pressable className="bg-purple-800/30 px-3 py-2 rounded-md flex flex-row items-center w-fit" style={{ gap: 12 }}  onPress={() => onPress()}>
            <Avatar size="small"/>
            <Text className="text-white">{solanaCreds?.account?.address}</Text>
        </Pressable>
    )
}

