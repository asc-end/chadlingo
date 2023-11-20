import { View, Text, Pressable, Switch } from "react-native";
import { useEffect, useState } from "react";
import { getValueFor, save } from "../../lib/secure-store/secureStore";
import ConnectButton from "../../components/solana/ConnectButton";
import { ScrollView } from "react-native-gesture-handler";
import { getPublicKeyFromAddress } from "../../lib/solana/getPublicKeyFromAddress";
import { elementWrapper } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import BackHeader from "../../components/headers/Back";
import { useSolana } from "../../providers/SolanaProvider";

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

export default function Settings({ navigation }: { navigation: any }) {

    const { solanaCreds } = useSolana()
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

                    </View>
                </ScrollView>
            </View>
            <View className="w-full h-fit flex flex-col items-center p-6 border-t border-indigo-600/40 " style={{ gap: 8, backgroundColor: "#0a022f" }}>
                <Text className="text-white">{`${pubKey.slice(0, 6)}...${pubKey.slice(-6)}`}</Text>
                <ConnectButton text="Change Wallet"/>
            </View>
        </LinearGradient>
    )

}