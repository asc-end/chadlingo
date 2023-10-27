import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ChallengePreview from "../../../components/challenges/ChallengePreview";
import { challengesData } from "../../../components/challenges/challengesData";
import { MainButton } from "../../../components/Buttons";

export default function SelectChallenge({ navigation, setType }: { navigation: any, setType: (type: ChallengeType) => void }) {
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>("Language")
  
  
  function onSubmit() {
      setType(selectedChallenge)
      console.log("coucou")
      navigation.navigate("Language1");
  }

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full flex items-center">
      <ScrollView>
        <View
          className="h-full w-full px-6 py-12 flex flex-row flex-wrap items-center justify-between"
          style={{ gap: 12 }}>
          {challengesData.map((el, i) => (
            <ChallengePreview data={el} key={i} onPress={ (type:ChallengeType) => setSelectedChallenge(type)} selected={el.name == selectedChallenge}/>
          ))}
        </View>
      </ScrollView>
      <MainButton text="Next" onPress={() => onSubmit()}/>
    </LinearGradient>
  );
}

