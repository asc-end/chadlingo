import { useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable, Image } from "react-native";
import useStore from "../../lib/state";
import { MainButton } from "../../components/Buttons";
import { LinearGradient } from "expo-linear-gradient";
import { getValueFor, save } from "../../lib/secure-store/secureStore";
import Language from "../../components/languages/Language";
import { get } from "http";
import LanguagesMap from "../../components/languages/LanguagesMap";
import { languages } from "../../components/languages/languages";



export default function SelectLanguage({ index, setLanguage, navigation }: { index: 1 | 2, setLanguage?: React.Dispatch<React.SetStateAction<string | undefined>>, navigation: any }) {
  const [nativeLang, setNativeLang] = useState<string | null>()
  const [selectedLanguage, setSelectedLanguage] = useState<{ name: string, code: string }>();

  useEffect(() => {
    async function fetchNativeLang() {
      await getValueFor("nativeLang").then((_nativeLang) => setNativeLang(_nativeLang))
      setSelectedLanguage(languages.filter((language) => language.name != nativeLang || index == 1)[0])
    }
    fetchNativeLang()
  }, [])

  useEffect(() => {
    setSelectedLanguage(languages.filter((language) => language.name != nativeLang || index == 1)[0])
  }, [nativeLang])
  
  function onNextPress() {
    if (index == 1) {
      save("nativeLang", selectedLanguage!.name)
      navigation.navigate("Language2")
    }
    else {
      setLanguage!(selectedLanguage?.name)
      navigation.navigate("Notifs")
    }
  }
  if (!selectedLanguage) return
  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      <View className="relative flex flex-col items-center py-12  h-full" style={{ gap: 30 }}>
        <View className="absolute bottom-8 left-8 right-8">
          <MainButton onPress={onNextPress} text="Next" full />
        </View>
        <Text className="text-white text-4xl font-bold text-center w-full">
          {index == 1 ? "Mother Tongue" : "Ascend Language"}
        </Text>
        <Text className="text-white text-lg text-center">
          {index == 1 ? "Select your native language." : "Choose the language you aspire to master."}
        </Text>

        <LanguagesMap selectedLanguage={selectedLanguage!} setSelectedLanguage={setSelectedLanguage} exeptions={[index === 2 && nativeLang ? nativeLang : ""]} />
      </View>
    </LinearGradient>
  );
}
