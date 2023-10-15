import { Text, View, Vibration } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WordInput from "./WordInput";

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { hsvToRgb } from "../../../lib/colors/hsvToRgb";
import { l, s } from "../../../config/colors";
import { duration, nbCards, cardsGap } from "./config";

function interpolateBetween(x: number) {
  const lowerBound = 0.55;
  const upperBound = 0.7;

  return lowerBound + x * (upperBound - lowerBound);
}


function createFloatBetweenRange(number: number, min: number, max: number) {
  // Use cosine to get a value between -1 and 1, then scale to the range [0.3, 0.5]
  const value = (max - min) * 0.5 * Math.cos(number) + (max - min) * 0.5;

  // Ensure the value is within the range [0.3, 0.5]
  return Math.max(min, Math.min(max, value));
}

export default function Card({
  data,
  index,
  activeIndex,
  onSubmit,
  state,
  languages
}: // setAnimQueueBusy,
  {
    data: Flashcard
    index: number;
    activeIndex: SharedValue<number>;
    onSubmit: (input: string, expect: string) => void;
    state: "input" | "wrong" | "valid"
    languages: { nativeLang: string, learningLang: string }
    // setAnimQueueBusy?: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  const [cardColors, setCardColors] = useState<{ first: number[], sec: number[] }>();


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
    if (state === "wrong")
      setCardColors({ first: hsvToRgb(1, s, l + 0.02), sec: hsvToRgb(1, s, l) });
    else {
      const h = interpolateBetween(index / nbCards)
      setCardColors({
        first: hsvToRgb(h, s, l + 0.02),
        sec: hsvToRgb(h, s, l),
      })
    }
  }, [state])


  if (!languages || !cardColors) return
  return (
    <Animated.View className="w-full h-fit absolute" style={[styles]}>
      <LinearGradient
        className="w-full h-fit rounded-2xl flex items-center justify-between"
        colors={[
          `#rgba(${cardColors.first[0]}, ${cardColors.first[1]}, ${cardColors.first[2]}, 1.0)`,
          `#rgba(${cardColors.sec[0]}, ${cardColors.sec[1]}, ${cardColors.sec[2]}, 1.0)`,
        ]}
      >
        {(state == "wrong") && (
          <View className=" h-[68px]">
            <Text>Not correct</Text>
          </View>
        )}
        <View className="w-full h-80 text-center flex items-center justify-center">
          <Text className="text-white font-bold text-6xl ">
            {state == "wrong" ? (data as any)[languages.learningLang] : (data as any)[languages.nativeLang]}
          </Text>
        </View>
        {state == "input" && <WordInput onSubmit={(input) => onSubmit(input, (data as any)[languages.learningLang])} />}
      </LinearGradient>
    </Animated.View>
  );
}
