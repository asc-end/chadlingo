import { View, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ProgressBar from "../../../components/ProgressBar";
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
import useStore from "../../../lib/state";
import { getFlashCards } from "../../../lib/firebase/getFlashcards";
import Loading from "./Loading";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export const duration = 200;
const nbCards = 2;

export default function Play({ navigation }: { navigation: any }) {
  const [flashCards, setFlashCards] = useState<Flashcard[] | null>(null);
  const { updateFlow, challenge } = useStore();
  const activeCard = useSharedValue(0);
  const progression = useSharedValue(0)
  const [swipable, setSwipable] = useState(false);

  useEffect(() => {
    console.log(0)
    async function _getFlashCards() {
      const _flashcards = await getFlashCards(nbCards);
      if (_flashcards) setFlashCards(_flashcards)
    };
    _getFlashCards()
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        console.log("prog", progression.value)
        if (progression.value !== 1) {
          e.preventDefault();

          // Prompt the user before leaving the screen
          Alert.alert(
            'Do you really want to continue?',
            'All progress from this session will be lost.',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => { } },
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action),
              },
            ]
          );

        }
      }),
    [navigation]
  );

  function onEnd() {
    if (!swipable) return;
    // activeCard.value = withTiming(activeCard.value + 1, { duration });
    setTimeout(() => {
      if (Math.floor(activeCard.value) == nbCards) {
      }
    }, duration);
    setSwipable(false);
  }


  if (!flashCards) return <Loading />
  return (
    <FlingGestureHandler direction={Directions.LEFT}>
      <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">

        <View className="w-full h-full p-12 flex flex-col items-center justify-center relative">
          <View className="absolute top-3 left-2 right-2 flex flex-row items-center justify-around" style={{ gap: 12 }}>
            <Pressable className=" bg-white/20 rounded-full p-2" onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" color="white" size={24} />
            </Pressable>
            <View className=" w-5/6">
              <ProgressBar percentage={progression} />
            </View>
          </View>
          <View
            className="w-full overflow-x-visible h-fit flex flex-row items-center justify-start ml-2 order-last"
            pointerEvents="box-none">
            {flashCards !== null && flashCards?.map((e: Flashcard, i: number) => (
              <Card setSwipable={setSwipable} data={e} index={i} key={i} activeIndex={activeCard} progression={progression} navigation={navigation} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </FlingGestureHandler>
  );
}
