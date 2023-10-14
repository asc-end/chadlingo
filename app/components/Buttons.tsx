import { useState } from "react";
import { Pressable, Animated, Text } from "react-native";
import React from "react";

export function MainButton({
  onPress,
  text,
  disabled = false,
  full = false
}: {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
  full?: boolean
}) {
  const [shadow, setShadow] = useState(" shadow-[20px_10px_20px_0_rgba(0,0,255,1)]");

  function onPressIn() {
    console.log("press")
    setShadow("border-pink-500 translate-y-2");
    if (onPress) onPress();
  }

  function onPressOut() {
    setShadow("shadow-[0_10px_0px_0px_rgba(0,0,255,1)]");
  }
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} className={`${full ? "w-full": "w-fit"}`} disabled={disabled}>
      <Animated.View className={`bg-dark-indigo px-6 py-3 rounded-xl w-full ${shadow} flex items-center justify-center`}>
        <Text className="text-dark-turquoise text-2xl font-semibold w-fit">{text}</Text>
      </Animated.View>
    </Pressable>
  );
}
