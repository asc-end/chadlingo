import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CirclesInCircle from "../../components/CirclesInCircle";
import { MainButton } from "../../components/Buttons";
import useStore from "../../lib/state";
import * as Haptics from 'expo-haptics';
import { fetchSecureDate } from "../../lib/dates/fetchSecureDate";
import incrementSeconds from "../../lib/dates/incrementSeconds";
import { LinearGradient } from "expo-linear-gradient";
import Profile from "./profile/ProfileIcon";
import Settings from "./settings/SettingsIcon";
import ProfileIcon from "./profile/ProfileIcon";
import SettingsIcon from "./settings/SettingsIcon";

export default function Home({ navigation }: { navigation: any }) {
  const { updateFlow, challenge } = useStore()
  const [beginDate, setBeginDate] = useState(challenge?.beginDate)
  const [nbDone, setNbDone] = useState(challenge?.nbDone)
  const [index, setIndex] = useState<number>()
  const [dayState, setDayState] = useState<"done" | "not done" | "undefined">("undefined")
  const [time, setTime] = useState<Date>();
  const [chrono, setChrono] = useState<{ hours: string, minutes: string, seconds: string }>()

  function numberToString(i: number) {
    return i.toString().padStart(2, '0');
  }

  useEffect(() => {
    let interval: any
    async function getCurrentDayIndex() {
      console.log(0)
      let date = await fetchSecureDate()
      if (!date || !beginDate) return
      console.log(1)
      let beginDay = new Date(beginDate).getUTCDate();
      let currentDay = date.getUTCDate();
      let dayDifference = currentDay - beginDay;
      console.log(3)

      if (nbDone !== undefined && (dayDifference > nbDone)) {
        console.log("looose")
        updateFlow("finishedChallenge_lose")
        return
      }
      setIndex(dayDifference);
      setDayState((nbDone == (dayDifference + 1)) ? "done" : "not done")

      if (date) setTime(date);
      interval = setInterval(() => {
        setTime(prevTime => { if (prevTime) return new Date(prevTime.getTime() + 1000) });
      }, 1000);
    }
    getCurrentDayIndex()

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (time) {
      setChrono({
        hours: numberToString(23 - time.getUTCHours()),
        minutes: numberToString(59 - time.getUTCMinutes()),
        seconds: numberToString(59 - time.getUTCSeconds())
      });
    }
  }, [time])

  function onButtonPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    navigation.navigate("play")
  }

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      <View className="w-full h-full px-4 py-12 flex flex-col items-center justify-center relative">
        <View className="absolute z-20 top-3 left-3 right-3 justify-end flex flex-row items-center" style={{gap: 10}}>
          <ProfileIcon onPress={() => navigation.navigate("profileModal")}/>
          <SettingsIcon onPress={() => navigation.navigate("settingsModal")}/>
        </View>
        <View className="absolute top-0 left-0">
          <CirclesInCircle nbDone={nbDone} current={index} />
        </View>
        {dayState == "not done" && chrono && <View className="flex flex-row">
          <Text className="text-white text-5xl font-bold mt-15 w-18">
            {`${chrono.hours}:`}
          </Text>
          <Text className="text-white text-5xl font-bold mt-15 w-18">
            {`${chrono.minutes}:`}
          </Text>
          <Text className="text-white text-5xl font-bold mt-15 w-14">
            {`${chrono.seconds}`}
          </Text>
        </View>
        }
        {dayState == "done" && <Text className="text-white text-4xl  text-center w-48">Come back tomorrow</Text>}
        <View className="absolute bottom-10">
          {dayState == "not done" && (<MainButton text="Begin Day" onPress={onButtonPress} />)}
        </View>
      </View>
    </LinearGradient>
  );
}
