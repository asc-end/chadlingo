import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import Card from "./Card";
import {
  GestureDetector,
  Gesture,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { runOnJS, runOnUI, useAnimatedGestureHandler, useSharedValue, withTiming } from "react-native-reanimated";
import useStore from "../../lib/state";
import { getFlashCards } from "../../lib/firebase/getFlashcards";
import Loading from "./Loading";
export const duration = 200;
const nbCards = 2;

export default function Play() {
  const [flashCards, setFlashCards] = useState<Flashcard[] | null>(null);
  const { updateFlow, challenge } = useStore();
  const activeCard = useSharedValue(0);
  const progression =  useSharedValue(0)
  const [swipable, setSwipable] = useState(false);

  useEffect(() => {
    console.log(0)
    async function _getFlashCards() {
      const _flashcards = await getFlashCards(nbCards);
      if (_flashcards) setFlashCards(_flashcards)
    };
    _getFlashCards()
  }, []);

  function onEnd() {
    if (!swipable) return;
    // activeCard.value = withTiming(activeCard.value + 1, { duration });
    setTimeout(() => {
      if (Math.floor(activeCard.value) == nbCards){
      }
    }, duration);
    setSwipable(false);
  }

  if(!flashCards) return <Loading/>
  return (
    <FlingGestureHandler direction={Directions.LEFT}>
      <View className="w-full h-full p-12 flex flex-col items-center justify-center relative">
        <View className="absolute top-3 w-full">
          <ProgressBar percentage={progression} />
        </View>
        <View
          className="w-full overflow-x-visible h-fit flex flex-row items-center justify-start ml-2 order-last"
          pointerEvents="box-none">
          {flashCards !== null && flashCards?.map((e:Flashcard, i:number) => (
            <Card setSwipable={setSwipable} data={e} index={i} key={i} activeIndex={activeCard} progression={progression}/>
          ))}
        </View>
      </View>
    </FlingGestureHandler>
  );
}
