import { View, Text, Pressable, Switch } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from "react";
import { getValueFor, save } from "../../../lib/secure-store/secureStore";
import { NavigationProp } from "@react-navigation/native";
import ConnectButton from "../../../components/solana/ConnectButton";
import setChallengeEnd from "../../../lib/firebase/demos/setChallengeEnd";
import useStore from "../../../lib/state";
import setChallengeNextDay from "../../../lib/firebase/demos/setChallengeNextDay";
import { ScrollView } from "react-native-gesture-handler";
import setDayDone from "../../../lib/firebase/demos/setDayDone";
import { getPublicKeyFromAddress } from "../../../lib/solana/getPublicKeyFromAddress";
import { elementWrapper } from "../../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import BackHeader from "../../../components/headers/BackHeader";

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
        <Pressable className={` ${elementWrapper}`} onPress={onToggleSwitch}>
            <View className="flex flex-col w-auto">
                <Text className="text-white text-2xl w-auto">{title}</Text>
                <Text className="text-white/50 w-64">
                    {text}
                </Text>
            </View>
            <Switch onChange={onToggleSwitch} value={isEnabled} trackColor={{ false: "#434343", true: "#00FF" }} />
        </Pressable>)
}

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
        <Pressable onPress={() => { navigation.navigate("setLang") }} className={` ${elementWrapper}`}>
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

    const { challenge, solanaCreds } = useStore()
    const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!).toString()
    return (
        <LinearGradient colors={["#00001e", "rgba(0,0,20,1)"]} className="flex flex-col h-full w-full">

            <BackHeader navigation={navigation} />
            <View className="flex-1 w-full flex flex-col  items-center p-6 pb-0 justify-between relative" style={{ gap: 24 }}>
                <ScrollView className="flex-1">
                    <View className="flex flex-col w-full" style={{ gap: 12 }}>
                        {/* <LanguageSetting navigation={navigation} /> */}
                        <SwitchSetting title={"Dark mode"} text="Switch to dark mode for a more eye-friendly interface during the night." code="colors" />
                        <SwitchSetting title={"Sound"} text="Switch sound effects on or off for a more personalized experience." code="sound" />
                        <SwitchSetting title={"Notifications"} text="If you agree, we can remind you to do your daily tasks!" code="notifs" />

                        <Pressable className="flex flex-col py-4 px-6 bg-white/5 w-full rounded-md" onPress={async () => { await setDayDone(solanaCreds?.accounts[0].address!, challenge!); navigation.goBack() }}>
                            <Text className=" text-white text-2xl w-auto">Set Current day done </Text>
                            <Text className="text-white/50 w-64">Act as if the challenge has been made,&#10;&#13;/!\ developer mode</Text>
                        </Pressable>
                        <Pressable className="flex flex-col py-4 px-6 bg-white/5 w-full rounded-md" onPress={async () => { await setChallengeNextDay(solanaCreds?.accounts[0].address!, challenge!); navigation.goBack() }}>
                            <Text className=" text-white text-2xl w-auto">Fast forward one day</Text>
                            <Text className="text-white/50 w-64">Go to the next day,&#10;&#13;/!\ developer mode</Text>
                        </Pressable>
                        <Pressable className="flex flex-col py-4 px-6 bg-white/5 w-full rounded-md" onPress={async () => { await setChallengeEnd(solanaCreds?.accounts[0].address!, challenge!); navigation.goBack() }}>
                            <Text className=" text-white text-2xl w-auto">Fast forward full </Text>
                            <Text className="text-white/50 w-64">Go to the end of the challenge,&#10;&#13;/!\ developer mode</Text>
                        </Pressable>

                    </View>
                </ScrollView>
            </View>
            <View className="w-full h-fit flex flex-row items-center p-6 border-t border-indigo-600/40 " style={{ gap: 24, backgroundColor: "#0a022f" }}>
                <View className="flex flex-col">
                    <Text className="text-white">Connected as :</Text>
                    <Text className="text-white text-xl">{`${pubKey.slice(0, 4)}...${pubKey.slice(-3)}`}</Text>
                </View>
                <View className="flex-1">

                <ConnectButton text="Change Wallet" onConnected={() => { }} />
                </View>
                {/* <Text className="text-white text-lg text-center">{`Connected as :\n ${pubKey.slice(0, 6)}...${pubKey.slice(-3)}`}</Text> */}
            </View>
        </LinearGradient>
    )

}