import { Text, View } from "react-native";
import { PrimaryButton } from "../../../components/buttons";
import ExitHeader from "../../../components/headers/Exit";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useState } from "react";

export default function SelectDuration({ navigation, setDuration }: { navigation: any, setDuration: (duration: number) => void }) {
    const [duration, _setDuration] = useState(5)

    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration % 60)

    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full relative">
            <ExitHeader navigation={navigation} />
            <View className="flex-1 relative flex flex-col items-center justify-start p-6 w-full" style={{ gap: 24 }}>
                <Text className="text-white text-4xl font-bold text-center w-full">Meditation duration</Text>
                <View className=" bg-black border border-neon-blue px-6 py-3 rounded-md flex flex-row items-center">
                    <Text className="text-white text-2xl text-right w-12" style={{ fontFamily: "Orbitron_700Bold" }}>{`${minutes.toString().length == 1 ? "0" : ""}${minutes}`}</Text>
                    <Text className="text-white text-2xl text-center" style={{ fontFamily: "Orbitron_700Bold" }}>:</Text>
                    <Text className="text-white text-2xl text-left w-12" style={{ fontFamily: "Orbitron_700Bold" }}>{`${seconds.toString().length == 1 ? "0" : ""}${seconds}`}</Text>
                </View>
                <Slider
                    style={{ width: 350, height: 100 }}
                    className="w-full h-48 p-6"
                    minimumValue={5}
                    maximumValue={260}
                    step={5}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgb(162, 162, 255)"
                    value={duration}
                    onValueChange={(value) => _setDuration(value)}
                />

            </View>
            <View className="absolute bottom-8 left-8 right-8">
                <PrimaryButton onPress={() => { setDuration(duration); navigation.navigate("Friends") }} text="Next" full />
            </View>
        </LinearGradient>
    )
}