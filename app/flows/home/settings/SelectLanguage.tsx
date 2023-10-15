import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import useStore from "../../../lib/state";
import { languages } from "../../../components/languages/languages";
import { getValueFor, save } from "../../../lib/secure-store/secureStore";
import { LinearGradient } from "expo-linear-gradient";
import LanguagesMap from "../../../components/languages/LanguagesMap";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SelectLanguage({ navigation }: { setLanguage?: React.Dispatch<React.SetStateAction<string | undefined>>, navigation: any }) {
  const [nativeLang, setNativeLang] = useState<string | null>()
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    async function fetchNativeLang() {
      await getValueFor("nativeLang").then((_nativeLang: string | null) => {
        if (_nativeLang) {
          const languageIndex = languages.findIndex(lang => lang.name === _nativeLang);
          setSelectedLanguage(languages[languageIndex]);
        }
      })
    }
    fetchNativeLang()
  }, [])

  useEffect(() => {
    console.log("change language", selectedLanguage.name)
    save("nativeLang", selectedLanguage.name)
  }, [selectedLanguage])

  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full">
      <Pressable onPress={() => navigation.goBack()} className="p-2 absolute top-3 left-3">
        <MaterialCommunityIcons name="chevron-left" size={48} color="white" />
      </Pressable>

      <View className="relative flex flex-col items-center py-12 pt-24  h-full" style={{ gap: 30 }}>
        <Text className="text-white text-4xl font-bold text-center w-full">
          Native Language
        </Text>
        <Text className="text-white text-lg text-center">Select your native language.</Text>
        <LanguagesMap selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      </View>
    </LinearGradient>
  );
}
