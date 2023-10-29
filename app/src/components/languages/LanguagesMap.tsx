import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { languages } from "./languages";
import Language from "./Language";

export default function LanguagesMap({
  selectedLanguage,
  setSelectedLanguage,
  exeptions,
}: {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | undefined>>;
  exeptions?: string[];
}) {
  return (
    <ScrollView className=" mb-8">
      <View className="flex flex-col" style={{ gap: 10 }}>
        {Object.keys(languages).map((e: string, i) => {
          if (exeptions?.includes(e)) return;
          return (
            <Language
              language={e}
              code={languages[e as keyof typeof languages]}
              key={i}
              onPress={() => setSelectedLanguage(e)}
              selected={selectedLanguage == e}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
