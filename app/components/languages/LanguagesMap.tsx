import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { languages } from "./languages"
import Language from "./Language"


export default function LanguagesMap({ selectedLanguage, setSelectedLanguage, exeptions }: { selectedLanguage: { name: string, code: string }, setSelectedLanguage: React.Dispatch<React.SetStateAction<{ name: string, code: string } | undefined>>, exeptions?: string[] }) {

    console.log("COUCOU", selectedLanguage)
    return (
        <ScrollView className=" ">
            <View className="flex flex-col" style={{ gap: 10 }}>
                {languages.map((e, i) => {
                    if (exeptions?.includes(e.name)) return
                    return <Language
                        language={e.name}
                        code={e.code}
                        key={i}
                        onPress={() => setSelectedLanguage(languages[i])}
                        selected={selectedLanguage.name == e.name}
                    />
                })}
            </View>
        </ScrollView>
    )
}
