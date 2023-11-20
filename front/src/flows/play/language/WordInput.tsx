import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
} from "react-native";
import SendIcon from "../../../components/icons/SendIcon";

export default function WordInput({ onSubmit }: { onSubmit: (input: string) => void }) {
  const [input, setInput] = useState("");

  function _onSubmit() {
    if (input !== "") {
      onSubmit(input);
    }
  }
  return (
    <View className="bg-white/10 rounded-b-2xl w-full flex flex-row items-center justify-between">
      <TextInput
        placeholder="Translate ..."
        className="text-xl w-full px-4 py-6"
        onSubmitEditing={_onSubmit}
        keyboardType="default"
        autoCorrect={false}
        returnKeyType={input == "" ? "none" : "send"}
        onChangeText={(inputText) => setInput(inputText)}
      />
      <Pressable onPress={_onSubmit} className=" w-12 -ml-12 flex items-center justify-center py-6">
        <SendIcon size={24} color={input == "" ? "#00000040" : "#000000AA"} />
      </Pressable>
    </View>
  );
}
