import { View, Text } from "react-native";
import React, { useState } from "react";
import Animated, { useAnimatedStyle, SharedValue } from "react-native-reanimated";

export default function ProgressBar({ percentage }: { percentage: SharedValue<number> }) {

  const styles = useAnimatedStyle(() => ({
    width: `${( percentage.value ) * 100}%`,
  }));

  return (
    <View className="rounded-full w-full h-4 bg-white/20 overflow-hidden flex flex-row justify-start">
      <Animated.View
        className="h-full bg-pastel-green transition-all flex justify-start items-center rounded-full overflow-hidden"
        style={[styles]}
      >
        <View className="bg-white/30 h-2 w-full rounded-full" />
      </Animated.View>
    </View>
  );
}
