import { Text, View } from "react-native";
import { MainButton } from "../../../../components/Buttons";
import ExitHeader from "../../../../components/headers/ExitHeader";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useState } from "react";

export default function SelectDuration({ navigation, setDuration }: { navigation: any, setDuration: (duration: number) => void }) {
    const [duration, _setDuration] = useState(2)

    return (
        <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full relative">
            <ExitHeader navigation={navigation} />
            <View className="flex-1 relative flex flex-col items-center justify-start p-6 w-full">
                <Text className="text-white text-4xl font-bold text-center w-full">Meditation duration</Text>
                <Text className="text-white text-2xl">{duration} min</Text>
                <Slider
                    style={{ width: 350, height: 100 }}
                    className="w-full h-48 p-6"
                    minimumValue={2}
                    maximumValue={30}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgb(162, 162, 255)"
                    value={duration}
                    onValueChange={(value) => _setDuration(value)}
                />

            </View>
            <View className="absolute bottom-8 left-8 right-8">
                <MainButton onPress={() => { setDuration(duration); navigation.navigate("Stake") }} text="Next" full />
            </View>
        </LinearGradient>
    )
}