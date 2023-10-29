import { useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable, Image } from "react-native";
import useStore from "../../../lib/state";
import { MainButton } from "../../../components/Buttons";
import { LinearGradient } from "expo-linear-gradient";
import { getValueFor, save } from "../../../lib/secure-store/secureStore";
import LanguagesMap from "../../../components/languages/LanguagesMap";
import { languages } from "../../../components/languages/languages";
import ExitHeader from "../../../components/headers/ExitHeader";

export default function SelectLanguage({
  index,
  setLanguage,
  nativeLanguage,
  navigation,
}: {
  index: 1 | 2;
  nativeLanguage?: LanguageType,
  setLanguage: (language: LanguageType) => void;
  navigation: any;
}) {
  // const [nativeLang, setNativeLang] = useState<string | null>();
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

  useEffect(() => {
    if(index==2){
      const firstNonNativeLanguage = Object.keys(languages).find(key => {
        console.log(key)
        return key !== nativeLanguage
      })
      console.log(firstNonNativeLanguage)
      setSelectedLanguage(firstNonNativeLanguage)
    }
    else  setSelectedLanguage("english")
  }, []);

  function onNextPress() {
    setLanguage!(selectedLanguage as LanguageType);
    if (index == 2) navigation.navigate("Stake");
    else
      navigation.navigate("Language2")
  }

  if (!selectedLanguage) return;
  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full relative">
      <ExitHeader navigation={navigation}/>
      <View className="flex-1 relative flex flex-col items-center justify-start p-6  h-full">
        <Text className="text-white text-4xl font-bold text-center w-full">
          {index == 1 ? "Mother Tongue" : "Ascend Language"}
        </Text>
        <Text className="text-white text-lg text-center mb-12">
          {index == 1 ? "Select your native language." : "Choose the language you aspire to master."}
        </Text>

        <LanguagesMap
          selectedLanguage={selectedLanguage!}
          setSelectedLanguage={setSelectedLanguage}
          exeptions={[index === 2 && nativeLanguage ? nativeLanguage : ""]}
        />
      </View>
        <View className="absolute bottom-8 left-8 right-8">
          <MainButton onPress={onNextPress} text="Next" full />
        </View>
    </LinearGradient>
  );
}
