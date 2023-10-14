import { Text, View, Vibration } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WordInput from "./WordInput";
import { cards } from "./cards";
import * as Haptics from "expo-haptics";
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
const duration = 200;
const maxVisibleItems = 20;
const cardsGap = 20;

const nbCards = 2;
export default function Card({
  data,
  index,
  activeIndex,
  setSwipable,
}: // setAnimQueueBusy,
  {
    data: Flashcard
    index: number;
    activeIndex: SharedValue<number>;
    setSwipable: React.Dispatch<React.SetStateAction<boolean>>;
    // setAnimQueueBusy?: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  const { updateFlow, setChallenge, challenge } = useStore();

  const [state, setState] = useState<string>("input");
  const [input, setInput] = useState("");
  const [cardsColors, setCardColors] = useState({
    first: hsvToRgb((index / 20 + 0.1) % 1, s, l + 0.02),
    sec: hsvToRgb((index / 20) % 1, s, l),
  });
  const styles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: cards.length - index,
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

  function onSubmit(event: GestureResponderEvent | NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    const isValid = input.toLowerCase() == cards[index].portuguese.toLowerCase();
    console.log(input);
    if (isValid) {
      // setState("valid");
      // setCardColors({ first: hsvToRgb(0.3, s, l + 0.02), sec: hsvToRgb(0.3, s, l) });
      activeIndex.value = withTiming(activeIndex.value + 1, { duration: duration });
      if (Math.floor(activeIndex.value) + 1 == nbCards) {
        //@ts-ignore
        const newChallenge:Challenge = { ...challenge, nbDone: challenge.nbDone + 1}
        console.log("NEW CHALLENGE", newChallenge)
        setChallenge(newChallenge)
        updateFlow("home")
      }
      setState("input");
    } else {
      setState("wrong");
      setSwipable(true);
      setCardColors({ first: hsvToRgb(1, s, l + 0.02), sec: hsvToRgb(1, s, l) });
      Haptics.impactAsync();
    }
  }

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
            {state == "valid" || state == "wrong" ? data.portuguese : data.french}
          </Text>
        </View>
        {state == "input" && <WordInput onSubmit={onSubmit} setInput={setInput} input={input} />}
      </LinearGradient>
    </Animated.View>
  );
}
