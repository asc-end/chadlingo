import { useState } from "react";
import { View, ScrollView, Text, Pressable, Image } from "react-native";
import useStore from "../../lib/state";
import { MainButton } from "../../components/Buttons";

const languages = [
  { name: "english", code: "us" },
  { name: "portuguese", code: "pt" },
  { name: "french", code: "fr" },
  { name: "spanish", code: "es" },
  { name: "italian", code: "it" },
  { name: "german", code: "de" },
];

function Language({
  language,
  code,
  onPress,
  selected,
}: {
  language: string;
  code: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable
      className={`bg-violet-500/20 rounded-md flex flex-row items-center justify-stqrt px-4 py-3 w-72 border ${selected ? " border-gray-400" : ""
        }`}
      style={{ gap: 16 }}
      onPress={onPress}>
      <Image
        source={{ uri: `https://flagcdn.com/w160/${code}.png` }}
        alt="Ukraine"
        className="w-10 h-10 rounded-full"
      />
      <Text className={` w-fit text-lg ${selected ? "text-white" : " text-white/50"}`}>{language.charAt(0).toUpperCase() + language.slice(1)}</Text>
    </Pressable>
  );
}

export default function SelectLanguage({ index }: { index: 1 | 2 }) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { updateFlow } = useStore();
  function selecteLanguage(index: number) {
    setSelectedLanguage(languages[index]);
  }

  function onNextPress() {
    if (index == 1) updateFlow("beginChallenge_language2");
    else updateFlow("beginChallenge_stake");
  }

  return (
    <View className="relative flex flex-col items-center py-12  h-full" style={{ gap: 30 }}>

      <View className="absolute bottom-8 left-8 right-8">
        <MainButton onPress={onNextPress} text="Next" full/>
      </View>
      <Text className="text-white text-4xl font-bold text-center w-full">
        {index == 1 ? "Mother Tongue" : "Ascend Language"}
      </Text>
      <Text className="text-white text-lg text-center">
        {index == 1 ? "Select your native language." : "Choose the language you aspire to master."}
      </Text>
      <ScrollView className=" ">
        <View className="flex flex-col" style={{ gap: 10 }}>
          {languages.map((e, i) => (
            <Language
              language={e.name}
              code={e.code}
              key={i}
              onPress={() => selecteLanguage(i)}
              selected={selectedLanguage.name == e.name}
            />
          ))}
        </View>
      </ScrollView>
      {/* <View className="absolute right-0 bottom-0 flex flex-row items-center p-6 justify-end"> */}

      {/* </View> */}
    </View>
  );
}
