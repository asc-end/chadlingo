import { View, Text, Pressable, Switch } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from "react";
import { getValueFor, save } from "../../../lib/secure-store/secureStore";

export function SwitchSetting({ title, text, code, disabled = false }: { title: string, text: string, code: string, disabled?: boolean }) {
    const [isEnabled, setIsEnabled] = useState(!disabled);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        async function fetchSecureStore() {
            const value = await getValueFor(code)
            if (!value)
                setIsEnabled(true)
            else setIsEnabled(value === 'true')
        }
        fetchSecureStore()
    }, [])

    function onToggleSwitch() {
        save(code, (!isEnabled).toString())
        toggleSwitch()
    }

    return (
        <Pressable className="flex flex-row py-4 px-6 bg-white/10 w-full rounded-md justify-between" onPress={onToggleSwitch}>
            <View className="flex flex-col w-auto">
                <Text className="text-white text-2xl w-auto">{title}</Text>
                <Text className="text-white/50 w-64">
                    {text}
                </Text>
            </View>
            <Switch onChange={onToggleSwitch} value={isEnabled} trackColor={{ false: "#434343", true: "#00FF" }} />
        </Pressable>)
}


import { NavigationProp } from "@react-navigation/native";
import ConnectButton from "../../../components/solana/ConnectButton";
import setChallengeEnd from "../../../lib/firebase/demos/setChallengeEnd";
import useStore from "../../../lib/state";
import setChallengeNextDay from "../../../lib/firebase/demos/setChallengeNextDay";
import { ScrollView } from "react-native-gesture-handler";
function LanguageSetting({ navigation }: { navigation: any }) {
    const [language, setLanguage] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSecureStore() {
            const _language = await getValueFor("nativeLang")
            setLanguage(_language)
        }
        fetchSecureStore()

        const focused = navigation.addListener("focus", () => {
            fetchSecureStore()
        })
        return focused
    }, [navigation])

    return (
        <Pressable onPress={() => { navigation.navigate("setLang") }} className="flex flex-row items-center py-4 px-6 bg-white/10 w-full rounded-md justify-between">
            <Text className=" text-white text-2xl">Language</Text>
            <View className="flex flex-row items-center">
                <Text className="text-white/50">{language}</Text>
                <View className=" -mr-3">
                    <MaterialCommunityIcons name="chevron-right" color="white" size={36} />
                </View>
            </View>
        </Pressable>
    )
}

export default function Settings({ navigation }: { navigation: any }) {

    const { challenge } = useStore()

    return (
        <View className="bg-black right-0 h-full w-full flex flex-col pt-20 items-center px-8 justify-between " style={{ gap: 24 }}>
            <Pressable onPress={() => navigation.navigate("home")} className="p-2 absolute top-3 left-3">
                <MaterialCommunityIcons name="chevron-left" size={48} color="white" />
            </Pressable>
            <ScrollView className="w-full h-full">
                <View className="flex flex-col w-full" style={{ gap: 12 }}>
                    <LanguageSetting navigation={navigation} />
                    <SwitchSetting title={"Dark mode"} text="Switch to dark mode for a more eye-friendly interface during the night." code="colors" />
                    <SwitchSetting title={"Sound"} text="Switch sound effects on or off for a more personalized experience." code="sound" />
                    <SwitchSetting title={"Notifications"} text="If you agree, we can remind you to do your daily tasks!" code="notifs" />
                    <Pressable className="flex flex-col py-4 px-6 bg-white/5 w-full rounded-md" onPress={() => { setChallengeNextDay("marie", challenge!); navigation.goBack() }}>
                        <Text className=" text-white text-2xl w-auto">Fast forward one day</Text>
                        <Text className="text-white/50 w-64">Go to the next day,&#10;&#13;/!\ developer mode</Text>
                    </Pressable>
                    <Pressable className="flex flex-col py-4 px-6 bg-white/5 w-full rounded-md" onPress={() => { setChallengeEnd("marie", challenge!); navigation.goBack() }}>
                        <Text className=" text-white text-2xl w-auto">Fast forward full </Text>
                        <Text className="text-white/50 w-64">Go to the end of the challenge,&#10;&#13;/!\ developer mode</Text>
                    </Pressable>

                </View>
            </ScrollView>
            <View className="w-full h-fit flex flex-col items-center" style={{ gap: 12 }}>
                <Text className="text-white text-lg">Connected as : 0x454545</Text>
                <ConnectButton text="Change Wallet" onConnected={() => { }} />

            </View>

        </View>
    )

}