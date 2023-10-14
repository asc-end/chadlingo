import { Text, View, Vibration } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WordInput from "./WordInput";
import * as Haptics from "expo-haptics";
import { getValueFor } from "../../lib/secure-store/secureStore";

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { hsvToRgb } from "../../lib/colors/hsvToRgb";
import { l, s } from "../../config/colors";
import { GestureResponderEvent, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import useStore from "../../lib/state";
import updateChallenge from "../../lib/firebase/updateChallenge";
const duration = 200;
const maxVisibleItems = 20;
const cardsGap = 20;
const nbCards = 2;


export default function Card({
  data,
  index,
  activeIndex,
  progression,
  setSwipable,
}: // setAnimQueueBusy,
  {
    data: Flashcard
    index: number;
    activeIndex: SharedValue<number>;
    progression: SharedValue<number>;
    setSwipable: React.Dispatch<React.SetStateAction<boolean>>;
    // setAnimQueueBusy?: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  const { updateFlow, setChallenge, challenge } = useStore();
  const [languages, setLanguages] = useState<{ nativeLang: string, learningLang: string }>()

  const [state, setState] = useState<string>("input");
  const [input, setInput] = useState("");
  const [cardsColors, setCardColors] = useState({
    first: hsvToRgb((index / 20 + 0.1) % 1, s, l + 0.02),
    sec: hsvToRgb((index / 20) % 1, s, l),
  });


  const styles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: 20 - index,
      transform: [
        {
          translateX: interpolate(activeIndex.value, [index - 1, index, index + 1], [cardsGap, 0, -400 + cardsGap]),
        },
        {
          scale: interpolate(activeIndex.value, [index - 1, index, index + 1], [0.96, 1, 1]),
        },
      ],
    };
  });


  useEffect(() => {
    async function getLanguages() {
      const nativeLang = await getValueFor("nativeLang")
      const learningLang = challenge?.language
      setLanguages({ nativeLang: nativeLang!, learningLang: learningLang! })
    }
    getLanguages()

  }, [])

  function onSubmit(event: GestureResponderEvent | NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    console.log(input, (data as any)[languages!.learningLang].toLowerCase())
    const isValid = input.toLowerCase() == (data as any)[languages!.learningLang].toLowerCase();
    activeIndex.value = withTiming(activeIndex.value + 1, { duration: duration });

    console.log(activeIndex.value);
    if (isValid) {
      progression.value = withTiming(progression.value + (1 / nbCards))
      if (progression.value == 1 - (1 / nbCards)) {
        updateFlow("play_sign")
      }
      setState("input");
    } else {
      setState("wrong");
      setSwipable(true);
      setCardColors({ first: hsvToRgb(1, s, l + 0.02), sec: hsvToRgb(1, s, l) });
      Haptics.impactAsync();
    }
  }

  if (!languages) return
  return (
    <Animated.View className="w-full h-fit absolute" style={[styles]}>
      <LinearGradient
        className="w-full h-fit rounded-2xl flex items-center justify-between"
        colors={[
          `#rgba(${cardsColors.first[0]}, ${cardsColors.first[1]}, ${cardsColors.first[2]}, 1.0)`,
          `#rgba(${cardsColors.sec[0]}, ${cardsColors.sec[1]}, ${cardsColors.sec[2]}, 1.0)`,
        ]}>
        {(state == "valid" || state == "wrong") && (
          <View className=" h-[68px]">
            {state == "valid" ? (
              <View>
                <Text>Correct</Text>
              </View>
            ) : (
              <View>
                <Text>Not correct</Text>
              </View>
            )}
          </View>
        )}
        <View className="w-full h-80 text-center flex items-center justify-center">
          <Text className="text-white font-bold text-6xl ">
            {state == "valid" || state == "wrong" ? (data as any)[languages.learningLang] : (data as any)[languages.nativeLang]}
          </Text>
        </View>
        {state == "input" && <WordInput onSubmit={onSubmit} setInput={setInput} input={input} />}
      </LinearGradient>
    </Animated.View>
  );
}
