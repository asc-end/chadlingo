import { Image, Pressable, Text } from "react-native";
import LanguageFlag from "./LanguageFlag";
import { elementWrapper } from "../../styles/styles";

export default function Language({
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
            className={` ${elementWrapper} justify-start w-72 ${selected ?  " border-white/40" : "opacity-60"}`}
            style={{ gap: 16 }}
            onPress={onPress}>
            <LanguageFlag code={code} size="medium"/>
            <Text className={` w-fit text-lg text-white `}>{language.charAt(0).toUpperCase() + language.slice(1)}</Text>
        </Pressable>
    );
}
