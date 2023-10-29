import { View, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ProgressBar from "../../../../components/ProgressBar";
import Card from "./Card";
import {
  GestureDetector,
  Gesture,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { GestureResponderEvent, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import * as Haptics from "expo-haptics";

import { runOnJS, runOnUI, useAnimatedGestureHandler, useSharedValue, withTiming } from "react-native-reanimated";
import useStore from "../../../../lib/state";
import { getFlashCards } from "../../../../lib/firebase/getFlashcards";
import Loading from "./Loading";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { nbCards, duration, part } from "./config";
import { languages as languagesDict } from "../../../../components/languages/languages";
import { getValueFor } from "../../../../lib/secure-store/secureStore";
import pushCards from "../../../../lib/firebase/pushCards";
import getFlashCardsByDate from "../../../../lib/firebase/getFlashCardsByDate";
import setDayDone from "../../../../lib/firebase/setDayDone";
import { useNavigation } from "@react-navigation/native";
import PlayHeader from "../PlayHeader";

export default function PlayLanguage({ navigation, route }: { navigation: any; route: any }) {
  const [flashCards, setFlashCards] = useState<Flashcard[] | null>(null);
  const [validatedCards, setValidatedCards] = useState<boolean[]>([]);
  const { updateFlow, solanaCreds } = useStore();
  const activeCard = useSharedValue(0);
  const progression = useSharedValue(0);
  const [progress, setProgress] = useState(0);
  const [swipable, setSwipable] = useState(false);
  const [firstCardState, setFirstCardState] = useState<"input" | "wrong" | "valid">("input");
  const [languages, setLanguages] = useState<{ nativeLang: string; learningLang: string }>();
  // console.log("CHALLENGE", route.params.challenge)
  const challenge:LanguageChallenge = route.params.challenge;

  useEffect(() => {
    async function _getFlashCards() {
      const _flashcards = await getFlashCardsByDate(nbCards);
      if (_flashcards) setFlashCards(_flashcards as Flashcard[]);
    }
    _getFlashCards();

    async function getLanguages() {
      const nativeLang = challenge?.languageFrom;
      const learningLang = challenge?.languageTo;
      setLanguages({ nativeLang: nativeLang!, learningLang: learningLang! });
    }
    getLanguages();
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        console.log("prog", progression.value);
        console.log(progress, validatedCards.length);
        if (validatedCards.length != nbCards) {
          e.preventDefault();

          // Prompt the user before leaving the screen
          Alert.alert("Do you really want to continue?", "All progress from this session will be lost.", [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]);
        }
      }),
    [navigation]
  );

  function onWrongCardSwiped() {
    if (!swipable) return;
    activeCard.value = withTiming(activeCard.value + 1, { duration });
    setTimeout(() => {
      if (Math.floor(activeCard.value) == nbCards) {
      }
    }, duration);
    setSwipable(false);
  }

  flashCards?.map((flashcard, i) => console.log("flashcard", i, flashcard.english));
  function onCardSubmit(input: string, expect: string) {
    const isValid = input.toLowerCase() == expect.toLowerCase();

    validatedCards.push(isValid);
    if (isValid) {
      activeCard.value = withTiming(activeCard.value + 1, { duration: duration });
      setProgress((prevProgress) => parseFloat((prevProgress + part).toFixed(6)));
      progression.value = withTiming(progression.value + 1 / nbCards, { duration: duration });
      console.log(progress);
      if (validatedCards.length == nbCards) {
        pushCards(validatedCards, flashCards!, languages!.learningLang, "marie");
        setDayDone(solanaCreds?.accounts[0].address!, challenge!);
        setTimeout(() => {
          // navigation.reset({ index: 0, routes: [{ name: "signDay" }] });
          navigation.navigate("signDay", {challenge: challenge})
        }, duration + 100);
      }
      setFirstCardState("input");
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setFirstCardState("wrong");
      setSwipable(true);
    }
  }

  if (!flashCards || !languages || !challenge) return <Loading />;

  console.log(languages);
  return (
    <FlingGestureHandler direction={Directions.LEFT} onEnded={onWrongCardSwiped}>
      <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
        <View className="w-full h-full p-12 flex flex-col items-center justify-center relative">
          <PlayHeader progression={progression} navigation={navigation}/>
          <View
            className="w-full overflow-x-visible h-fit flex flex-row items-center justify-start ml-2 order-last"
            pointerEvents="box-none">
            {flashCards !== null &&
              flashCards?.map((e: Flashcard, i: number) => (
                <Card
                  data={e}
                  index={i}
                  key={i}
                  activeIndex={activeCard}
                  onSubmit={onCardSubmit}
                  state={i == activeCard.value ? firstCardState : "input"}
                  languages={languages}
                />
              ))}
          </View>
        </View>
      </LinearGradient>
    </FlingGestureHandler>
  );
}
