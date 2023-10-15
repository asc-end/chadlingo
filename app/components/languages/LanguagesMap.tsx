import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { languages } from "./languages"
import Language from "./Language"
import { useState } from "react";
export default function LanguagesMap({ selectedLanguage, setSelectedLanguage, exeptions }: { selectedLanguage: { name: string, code: string }, setSelectedLanguage: React.Dispatch<React.SetStateAction<{ name: string, code: string }>>, exeptions?: string[] }) {
    function selectLanguage(index: number) { setSelectedLanguage(languages[index]); }

    return (
        <ScrollView className=" ">
            <View className="flex flex-col" style={{ gap: 10 }}>
                {languages.map((e, i) => {
                    if (exeptions?.includes(e.name)) return
                    return <Language
                        language={e.name}
                        code={e.code}
                        key={i}
                        onPress={() => selectLanguage(i)}
                        selected={selectedLanguage.name == e.name}
                    />
                })}
            </View>
        </ScrollView>
    )
}
