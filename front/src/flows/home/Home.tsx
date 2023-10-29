import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CirclesInCircle from "../../components/CirclesInCircle";
import { MainButton } from "../../components/Buttons";
import useStore from "../../lib/state";
import * as Haptics from "expo-haptics";
import { fetchSecureDate } from "../../lib/dates/fetchSecureDate";
import { LinearGradient } from "expo-linear-gradient";
import SettingsIcon from "./settings/SettingsIcon";
import LanguageFlag from "../../components/languages/LanguageFlag";
import { languages } from "../../components/languages/languages";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getValueFor } from "../../lib/secure-store/secureStore";
import getUserChallenge from "../../lib/firebase/getUserChallenge";
import getDayDifference from "../../lib/dates/getDayDifference";
import { Svg } from "react-native-svg";
import CircleProgress from "../../components/CircleProgress";
import HomeHeader from "../../components/headers/HomeHeader";
import Challenge from "../../components/challenges/Challenge";
import { ScrollView } from "react-native-gesture-handler";
import getUserChallenges from "../../lib/firebase/getUserChallenge";
import Loading from "./play/language/Loading";
import updateChallenge from "../../lib/firebase/updateChallenge";

const challengesState = [
  {
    name: "to-do",
    children: ["Language", "Meditation", "Meditation", "Code", "Code", "Code", "Code"],
  },
  {
    name: "done",
    children: ["Meditation", "Meditation", "Code"],
  },
  {
    name: "pending",
    children: ["Code"],
  },
];

export default function Home({ navigation }: { navigation: any }) {
  const { updateFlow, challenge, setChallenge, solanaCreds } = useStore();
  // const [beginDate, setBeginDate] = useState(challenge?.beginDate);
  // const [nbDone, setNbDone] = useState(challenge?.nbDone);
  // const [index, setIndex] = useState<number>();
  const [dayState, setDayState] = useState<"done" | "not done" | "undefined">("undefined");
  const [time, setTime] = useState<Date>();
  const [chrono, setChrono] = useState<{ hours: string; minutes: string; seconds: string }>();
  // const [nativeLang, setNativeLang] = useState<{ name: string; code: string }>();
  function numberToString(i: number) {
    return i.toString().padStart(2, "0");
  }
  const [challenges, setChallenges] = useState<Challenge[] | undefined>(undefined);

  useEffect(() => {
    let interval: any;
    async function getCurrentDayIndex() {
      // let challenge: Challenge = await getUserChallenge(solanaCreds?.accounts[0].address!);
      // if (!challenge) {
      //   updateFlow("beginChallenge");
      //   return;
      // }
      // console.log(challenge);

      let date = await fetchSecureDate();
      if (!date) return;

      let _challenges = await getUserChallenges(solanaCreds?.accounts[0].address!);
      console.log("FETCH NEW CHALLENGE", _challenges?.length, "INTERVAL", interval);
      _challenges = _challenges?.filter((challenge) => {
        if (challenge.state == "lost" || challenge.state == "won") return true;
        if (challenge.state == "archived") return false;

        const timeDifference = new Date(date!.getTime() - challenge.beginDate).getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        const floor = Math.floor(daysDifference);
        const top = floor + 1;
        if (challenge.nbDone < floor) {
          let _challenge = challenge;
          _challenge.state = challenge.nbDone == 30 ? "won" : "lost";
          updateChallenge(solanaCreds?.accounts[0].address!, _challenge);
        }
        return challenge.nbDone == floor;
      });

      setChallenges(_challenges);

      if (date) setTime(date);
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime) return new Date(prevTime.getTime() + 1000);
        });
      }, 1000);
    }
    getCurrentDayIndex();

    const focused = navigation.addListener("focus", () => {
      getCurrentDayIndex();
    });
    return () => {
      clearInterval(interval);
      focused;
    };
  }, []);

  useEffect(() => {
    const focused = navigation.addListener("focus", () => {});
    return focused;
  }, [navigation]);

  useEffect(() => {
    // if (time && challenge?.beginDate) {
    //   const tom = new Date(challenge.beginDate).setDate(new Date(challenge.beginDate).getDate() + challenge.nbDone + 1);
    //   const timeDifference = tom - time.getTime();
    //   setChrono({
    //     hours: numberToString(Math.floor((timeDifference / (1000 * 60 * 60)) % 24)),
    //     minutes: numberToString(Math.floor((timeDifference / 1000 / 60) % 60)),
    //     seconds: numberToString(Math.floor((timeDifference / 1000) % 60)),
    //   });
    // }
    if (time) {
      let tom = new Date(time.getTime()).setDate(time.getDate() + 1);
      tom = new Date(tom).setHours(0);
      tom = new Date(tom).setMinutes(0);
      tom = new Date(tom).setSeconds(0);
      const timeDifference = tom - time.getTime();

      setChrono({
        hours: numberToString(Math.floor((timeDifference / (1000 * 60 * 60)) % 24)),
        minutes: numberToString(Math.floor((timeDifference / 1000 / 60) % 60)),
        seconds: numberToString(Math.floor((timeDifference / 1000) % 60)),
      });
    }
  }, [time]);

  function onChallengePlay(challenge: Challenge) {
    if (challenge.state == "won") {
      navigation.navigate("win", { challenge: challenge });
      return;
    } else if (challenge.state == "lost") {
      navigation.navigate("lose", { challenge: challenge });
      return;
    }
    switch (challenge.type) {
      case "Language":
        navigation.navigate("playLanguage", { challenge: challenge });
        break;
      case "Code":
        break;
      case "Meditation":
        navigation.navigate("playMeditation", { challenge: challenge });

        break;
      case "Socials":
        break;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
  if (!challenges) return <Loading />;
  // const [selected, setSelected] = useState(0);
  return (
    <LinearGradient colors={["#00001e", "rgba(0,0,20,1)"]} className="h-full w-full relative">
      <HomeHeader navigation={navigation}/>
      <ScrollView className="">
        <View
          className="w-full h-full px-4 py-24 flex flex-col items-center justify-start relative"
          style={{ gap: 48 }}>
          <CircleProgress chrono={challenges && challenges!.length > 0 ? chrono : null} />
          <View className="flex flex-col w-full" style={{ gap: 8 }}>
            <View className="w-full flex flex-col" style={{ gap: 12 }}>
              {challenges?.map((el: any, i) => (
                <Challenge
                  challengeData={el}
                  type={el.type as ChallengeType}
                  alone={true}
                  onPress={(challenge: Challenge) => onChallengePlay(challenge)}
                  key={i}
                  percentage={(el.nbDone / 30) * 100}
                  solStaked={el.solStaked}
                />
              ))}
              {(!challenges || challenges === undefined || challenges.length === 0) && (
                <Text className="text-white/50 text-3xl text-center font-bold">Come back tomorrow</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="w-full"></View>
    </LinearGradient>
  );
}
