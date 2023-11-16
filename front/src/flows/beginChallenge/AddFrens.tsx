import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import { PrimaryButton } from "../../components/buttons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ExitHeader } from "../../components/headers";
import { useState } from "react";

export default function AddFrens({ navigation, setFriends }: { navigation: any, setFriends: (friends: string[]) => void }) {
    let [friend, setFriend] = useState<string>()
    let [friends, _setFriends] = useState<string[]>([])

    function addFriend() {
        if (!friend) return
        let _friends = friends
        _friends.push(friend)
        setFriends(_friends)
        _setFriends(_friends)
        setFriend("")
    }
    console.log(friends)

    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full flex items-center relative">
            <ExitHeader navigation={navigation} />
            <View
                className={`w-fit bg-black flex items-center justify-center mx-4  px-1 py-1 rounded-md border-neutral-600 mb-15 flex-row border-2 border-transparent`}
            style={{gap: 12}}
            >
                <TextInput
                    underlineColorAndroid="transparent"
                    className={` border border-transparent flex-1 text-white text-xl px-3 py-2 rounded-md focus:border-neutral-600 `}
                    onChangeText={(e) => setFriend(e)}
                    value={friend}
                    placeholderTextColor={"#505050"}
                    placeholder={"Friend's address"}
                    returnKeyType={"done"}

                />
                <Pressable
                    className="text-center color-white px-2 py-3 rounded-md font-bold bg-indigo-600 "
                    onPress={() => {
                        addFriend()
                    }}>
                        <Text className="text-white  text-lg">Add friend</Text>
                    </Pressable>
            </View>
            <ScrollView className="flex-1 mt-12 w-full px-8">
                <View className="flex flex-col items-center" style={{gap: 6}}>

                {friends.map((el, i) =>
                    <View className="px-4 py-2 rounded md bg-white/20 w-full" key={i}>
                        <Text className="text-white/70 text-lg px-2 py-1">{el}</Text>

                    </View>)}
                </View>
            </ScrollView>
            <View className="absolute bottom-8 left-8 right-8">
                <PrimaryButton text="Next" onPress={() => navigation.navigate("Stake")} full />
            </View>
        </LinearGradient>


    )
}