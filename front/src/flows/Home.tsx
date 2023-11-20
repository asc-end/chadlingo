import { View, Text} from "react-native";
import React, { useEffect, useState } from "react";
import { NewChallengeButton, SecondaryButton } from "../components/buttons";
import * as Haptics from "expo-haptics";
import { fetchSecureDate } from "../lib/dates/fetchSecureDate";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CircleProgress from "../components/CircleProgress";
import HomeHeader from "../components/headers/Home";
import Challenge from "../components/challenges/Challenge";
import { ScrollView } from "react-native-gesture-handler";
import getUserChallenges from "../lib/firebase/getUserChallenges";
import Loading from "./play/language/Loading";
import updateChallenge from "../lib/firebase/updateChallenge";
import demo_fastForward from "../lib/firebase/demos/demo_fastForward";
import demo_fastForwardKeepState from "../lib/firebase/demos/demo_fastForwardKeepState";
import { useSolana } from "../providers/SolanaProvider";

export default function Home({ navigation }: { navigation: any }) {
  const { solanaCreds } = useSolana()
  const [time, setTime] = useState<Date>();
  const [chrono, setChrono] = useState<{ hours: string; minutes: string; seconds: string }>();
  function numberToString(i: number) {
    return i.toString().padStart(2, "0");
  }
  const [challenges, setChallenges] = useState<Challenge[] | undefined>();
  const [challengesFetched, setChallengesFetched] = useState(false);
  const [challengesNb, setChallengesNb] = useState<number>();

  async function fetchChallenges(date: Date) {
    console.log("get User challenges")
    let _challenges = await getUserChallenges(solanaCreds?.accounts[0].address!);
    let _challengesNb = 0;
    console.log(challenges?.length);
    _challenges = _challenges?.filter((challenge) => {
      console.log(challenge.type, challenge.state, challenges?.length);
      if (challenge.state == "lost" || challenge.state == "won") {
        navigation.navigate(challenge.state, { challenge: challenge })
        return false;
      }
      if (challenge.state == "archived") return false;
      _challengesNb += 1;
      console.log(challenge.type);
      const timeDifference = date!.getTime() - challenge.beginDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const floor = Math.floor(daysDifference);
      const top = floor + 1;
      console.log(challenge.nbDone, floor, daysDifference)
      if (challenge.nbDone < floor || (challenge.nbDone == floor && challenge.nbDone == 30)) {
        let _challenge = challenge;
        _challenge.state = challenge.nbDone == 30 ? "won" : "lost";
        navigation.navigate(challenge.state, { challenge: challenge })
        updateChallenge(solanaCreds?.accounts[0].address!, _challenge);
      }
      return challenge.nbDone == floor;
    });

    setChallengesNb(_challengesNb);

    setChallenges(_challenges);
    setChallengesFetched(true);
  }
  useEffect(() => {
    let interval: any;
    async function getCurrentDayIndex() {
      let date = await fetchSecureDate()
      if (!date) return;
      fetchChallenges(date)
      setTime(date);
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime) return new Date(prevTime.getTime() + 1000);
        });
      }, 1000);
    }
    getCurrentDayIndex();

    const focused = navigation.addListener("focus", () => {
      async function fetch() {
        let date = await fetchSecureDate()
        fetchChallenges(date!);

      }
      fetch()
    });
    return () => {
      clearInterval(interval);
      focused;
    };
  }, []);

  useEffect(() => {
    const focused = navigation.addListener("focus", () => { });
    return focused;
  }, [navigation]);

  useEffect(() => {
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

  async function fastForward() {
    await demo_fastForward(1, solanaCreds?.accounts[0].address!)
    let date = await fetchSecureDate()
    fetchChallenges(date!)
  }

  async function fastForwardFull() {
    await demo_fastForwardKeepState(30, solanaCreds?.accounts[0].address!)
    let date = await fetchSecureDate()
    fetchChallenges(date!)
  }


  if (!challengesFetched) return <Loading />;

  return (
    <LinearGradient colors={["#00001e", "rgba(0,0,20,1)"]} className="h-full w-full relative">
      <HomeHeader navigation={navigation} noNew={challengesNb == 0} />
      <ScrollView className="">
        <View
          className="w-full h-full px-4 py-24 pt-32 flex flex-col items-center justify-start relative"
          style={{ gap: 48 }}>
          <CircleProgress chrono={challenges && challenges!.length > 0 ? chrono : null} />
          <View className="flex flex-col w-full" style={{ gap: 8 }}>
            <View className="w-full flex flex-col" style={{ gap: 12 }}>
              {challenges?.map((el: any, i) => (
                <Challenge
                  challengeData={el}
                  alone={true}
                  onPress={(challenge: Challenge) => onChallengePlay(challenge)}
                  key={i}
                  percentage={(el.nbDone / 30) * 100}
                />
              ))}
              {(!challenges || challenges === undefined || challenges.length === 0) && challengesNb! > 0 && (
                <Text className="text-white/50 text-3xl text-center font-bold">Come back tomorrow</Text>
              )}
              {challengesNb == 0 && (
                <View className="flex flex-col items-center">
                  <Text className="font-black text-5xl text-white">30 days</Text>
                  <Text className="font-black text-2xl text-white"> to become a Chad</Text>
                  <Text className="text-xl text-white mt-6 italic opacity-70">stake and hold yourself accountable</Text>

                  <View className=" h-12 mt-12">
                    <NewChallengeButton navigation={navigation} />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="DEV  right-0 top-0 flex flex-row justify-end px-4 py-2 h-16" style={{ gap: 12 }}>
        <SecondaryButton onPress={() => fastForward()}>
          <MaterialCommunityIcons name="play" size={28} color={"#ffffff79"} />
        </SecondaryButton>
        <SecondaryButton onPress={() => fastForwardFull()}>
          <MaterialCommunityIcons name="fast-forward" size={28} color={"#FFFFFF7a"} />
        </SecondaryButton>
      </View>
      <View className="w-full"></View>
    </LinearGradient>
  );
}
