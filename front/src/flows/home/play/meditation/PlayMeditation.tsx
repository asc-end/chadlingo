import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View } from "react-native";
import ProgressBar from "../../../../components/ProgressBar";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { AppState } from "react-native";
import { Audio } from "expo-av"
import { Asset, useAssets } from 'expo-asset';
// const mp3Asset = Asset.fromModule(require('../../../../assets/meditation.mp3'));
// mp3Asset.downloadAsync()

export default function PlayMeditation({ navigation, route }: { navigation: any; route: any }) {
    const challenge: MeditationChallenge = route.params.challenge;
    // const [assets, error] = useAssets([require("../../../../assets/meditation.mp3")])

    const progression = useSharedValue(0);
    useEffect(() => {
        let timer = 0
        const interval = setInterval(() => {
            timer += 1
            if (timer == challenge.duration * 60)
                navigation.navigate("signDay", { challenge: challenge })
            console.log(timer, challenge.duration * 60)
            progression.value = withTiming(timer / (challenge.duration * 60))

        }, 1000)

        AppState.addEventListener("change", (state) => {
            if (state == "background")
                navigation.navigate("home")
        })

        async function playSound() {
            // console.log(error, assets)
            // Audio.setAudioModeAsync({
                
            // })
            // if(!assets) return
            // let sound = await Audio.Sound.createAsync({uri: "https://cdn.discordapp.com/attachments/735519649277673572/1168331263464181870/mixkit-relax-beat-292.mp3?ex=65516047&is=653eeb47&hm=4ff9fd30fcbff57a92440ad83a42e83a8344fa0760aab4737af2bf7254053532&"})
            // sound.sound.playAsync()

        }
        playSound()

        return (() => {
            clearInterval(interval)
        })
    }, [])

    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full p-6 flex items-center">
            <View className="w-full flex-1 flex items-center justify-center">
                <ProgressBar percentage={progression} />
            </View>
        </LinearGradient>
    )
}