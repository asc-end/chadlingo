import { Image, Pressable, Text } from "react-native";

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
