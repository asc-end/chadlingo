import { Pressable, Text, View } from "react-native";
import SolanaPrice from "../solana/SolanaPrice";
import FromTo from "../languages/FromTo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { challengesData } from "./challengesData";
import { languages } from "../languages/languages";
import { useEffect, useState } from "react";
export default function Challenge({
  challengeData,
  percentage = 50,
  alone,
  onPress,
}: {
  challengeData: LanguageChallenge | MeditationChallenge;
  percentage?: number;
  alone: boolean;
  onPress: (challenge: Challenge) => void;
}) {
  const challengeType = challengesData.find((challenge) => challenge.name === challengeData.type);
  if (!challengeType) return;
  

  const [hue, setHue] = useState(initHue);

  function initHue() {
    let hue;
    if (challengeData.state == "during") hue = 260;
    else if (challengeData.state == "lost") hue = 0;
    else if (challengeData.state == "won") hue = 500;

    hue= 260
    return hue;
  }

  useEffect(() => {
    initHue()
  }, [challengeData])
  return (
    <Pressable
      className={`flex flex-col rounded-lg w-full overflow-hidden relative ${onPress == undefined ? " opacity-40" : " "
        }`}
      style={{ backgroundColor: `hsla(${hue}, 100%, 50%, 0.295)` }}
      onPress={() => onPress(challengeData)}>
      <View className="flex flex-row px-4 py-3 items-center" style={{ gap: 24 }}>
        <View className="rounded-full p-3" style={{ backgroundColor: `hsla(${hue}, 54.761904761904766%, 49.41176470588235%, 0.395)` }}>
          <MaterialCommunityIcons name={challengeType.iconName as any} size={30} color={"#ffffff"} />
        </View>

        <View className="flex flex-col flex-1 h-full" style={{ gap: 6 }}>
          <Text className="text-white font-bold text-lg">{challengeData.type}</Text>
          {challengeData.type == "Language" && (
            <FromTo codeFrom={languages[(challengeData as LanguageChallenge).languageFrom]} codeTo={languages[(challengeData as LanguageChallenge).languageTo]} />
          )}
          {challengeData.type == "Code" && <Text className="text-white/70">as mgavillo</Text>}
          {challengeData.type == "Meditation" && <Text className="text-white/70">{`for${Math.floor((challengeData as MeditationChallenge).duration / 60) ?
              `${Math.floor((challengeData as MeditationChallenge).duration / 60)} minutes` : ""} ${Math.floor((challengeData as MeditationChallenge).duration % 60) ? `${Math.floor((challengeData as MeditationChallenge).duration % 60)} seconds`: ""} `}</Text>}
          {challengeData.type == "Socials" && <Text className="text-white/70">as swaggyMarie</Text>}
        </View>
        {challengeData.friends?.length && <MaterialCommunityIcons name="account-multiple" size={32} color={`hsla(${hue}, 100%, 50%, 0.602)`} />}
      </View>
      {challengeData.state == "during" ? (
        <View
          className="flex flex-row px-2 py-2 items-center bg-opacity-40"
          style={{ gap: 12, backgroundColor: `hsla(${hue}, 86.24338624338623%, 62.94117647058823%, 0.4)` }}>
          <SolanaPrice amount={challengeData.solStaked} hue={hue} />
          <View className="flex-1 rounded-md overflow-hidden h-5" style={{ backgroundColor: `hsla(${hue}, 100%, 17.84313725490196%, 0.714)` }}>
            <View
              className="absolute top-0 bottom-0 left-0 "
              style={{ width: `${percentage}%`, backgroundColor: `hsla(${hue}, 98.08612440191389%, 59.01960784313726%, 0.507)` }}
            />
          </View>
        </View>
      ) : (
        <View
          className="flex flex-row px-2 py-2 items-center justify-between bg-opacity-40"
          style={{ gap: 12, backgroundColor: `hsla(${hue}, 86.24338624338623%, 62.94117647058823%, 0.4)` }}>
          {/* <Text className="text-white">{`Challenge ${challengeData.state}`}</Text> */}
          <SolanaPrice amount={challengeData.solStaked} hue={hue} />
        </View>
      )}


    </Pressable>
  );
}
