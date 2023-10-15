import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CirclesInCircle from "../../components/CirclesInCircle";
import { MainButton } from "../../components/Buttons";
import useStore from "../../lib/state";
import * as Haptics from 'expo-haptics';
import { fetchSecureDate } from "../../lib/dates/fetchSecureDate";
import { LinearGradient } from "expo-linear-gradient";
import SettingsIcon from "./settings/SettingsIcon";
import LanguageFlag from "../../components/languages/LanguageFlag";
import { languages } from "../../components/languages/languages";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getValueFor } from "../../lib/secure-store/secureStore";
import pushCards from "../../lib/firebase/pushCards";
import { getFlashCards } from "../../lib/firebase/getFlashcards";
import getFlashCardsByDate from "../../lib/firebase/getFlashCardsByDate";
import getUserChallenge from "../../lib/firebase/getUserChallenge";
// import { LinearGradientDemo } from "../../components/LinearGradient";

export default function Home({ navigation }: { navigation: any }) {
  const { updateFlow, challenge, setChallenge} = useStore()
  const [beginDate, setBeginDate] = useState(challenge?.beginDate)
  const [nbDone, setNbDone] = useState(challenge?.nbDone)
  const [index, setIndex] = useState<number>()
  const [dayState, setDayState] = useState<"done" | "not done" | "undefined">("undefined")
  const [time, setTime] = useState<Date>();
  const [chrono, setChrono] = useState<{ hours: string, minutes: string, seconds: string }>()
  const [nativeLang, setNativeLang] = useState<{ name: string, code: string }>()
  function numberToString(i: number) { return i.toString().padStart(2, '0'); }

  let nativLangIndex = languages.findIndex(lang => lang.name === challenge?.language);
  let learningLangIndex = languages.findIndex(lang => lang.name === challenge?.language);

  useEffect(() => {
    let interval: any
    async function getCurrentDayIndex() {
      console.log("WSH")
      let challenge: Challenge = await getUserChallenge("marie")
      if (!challenge) {
        updateFlow("beginChallenge")
        return
      }
      setChallenge(challenge)
      setNbDone(challenge?.nbDone)
      setBeginDate(challenge?.beginDate)

      let date = await fetchSecureDate()
      if (!date || !challenge?.beginDate) return

      // Convert date strings or objects to Date objects
      const d1 = new Date(challenge?.beginDate).getTime();
      const d2 = new Date(date).getTime();

      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(d2 - d1);

      // Calculate the number of days
      const dayDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      if (challenge?.nbDone == 30 && dayDifference == 30) {
        updateFlow("finishedChallenge_win")
        return
      }
      else if (challenge?.nbDone !== undefined && (dayDifference > challenge?.nbDone)) {
        updateFlow("finishedChallenge_lose")
        return
      }
      setIndex(dayDifference);
      setDayState((challenge?.nbDone == (dayDifference + 1)) ? "done" : "not done")

      if (date) setTime(date);
      if(interval) clearInterval(interval)
      interval = setInterval(() => {
        setTime(prevTime => { if (prevTime) return new Date(prevTime.getTime() + 1000) });
      }, 1000);
    }
    getCurrentDayIndex()


    const focused = navigation.addListener("focus", () => {
      getCurrentDayIndex()
    })
    return () => { clearInterval(interval); focused };
  }, [])

  useEffect(() => {
    async function fetchNativeLang() {
      await getValueFor("nativeLang").then((_nativeLang: string | null) => {
        if (_nativeLang) {
          nativLangIndex = languages.findIndex(lang => lang.name === _nativeLang);
          setNativeLang(languages[nativLangIndex])
        }
      })
    }
    fetchNativeLang()
    const focused = navigation.addListener("focus", () => {
      fetchNativeLang()
    })
    return focused
  }, [navigation])

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
        <View className="absolute z-20 top-3 left-3 right-3 flex flex-row items-center justify-between" >
          <View className="flex flex-row items-center" style={{ gap: 6 }}>
            <Pressable onPress={() => navigation.navigate("setLang")}>
              {nativeLang && <LanguageFlag code={nativeLang.code} size="small" />}
            </Pressable>
            <MaterialCommunityIcons name="chevron-right" color="white" size={36} />
            <LanguageFlag code={languages[learningLangIndex].code} size="small" />
          </View>
          <View className="flex flex-row" style={{ gap: 12 }}>
            <SettingsIcon onPress={() => navigation.navigate("settingsModal")} />
          </View>
        </View>
        {/* <LinearGradientDemo /> */}
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
        {dayState == "done" && <Text className="text-white text-4xl  text-center w-48 font-bold">Come back tomorrow</Text>}
        <View className="absolute bottom-10">
          {dayState == "not done" && (<MainButton text="Begin Day" onPress={onButtonPress} />)}
        </View>
      </View>
    </LinearGradient>
  );
}
