import { Pressable, Text, View } from "react-native";
import SolanaPrice from "../solana/SolanaPrice";
import FromTo from "../languages/FromTo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { challengesData  } from "./challengesData";
import { languages } from "../languages/languages";
export default function Challenge({
  challengeData,
  type,
  percentage = 50,
  alone,
  onPress,
  solStaked
}: {
  challengeData: LanguageChallenge;
  type: ChallengeType;
  percentage?: number;
  alone: boolean;
  solStaked:number
  onPress: (challenge: Challenge) => void;
}) {
  const challenge = challengesData.find((challenge) => challenge.name === type);
  if (!challenge) return;

  return (
    <Pressable
      className={`flex flex-col rounded-lg w-full  overflow-hidden bg-neon-blue/20 ${
        onPress == undefined ? " opacity-40" : " "
      }`}
      onPress={() => onPress(challengeData)}>
      <View className="flex flex-row px-4 py-3 items-center" style={{ gap: 24 }}>
        <View className="rounded-full p-3" style={{backgroundColor: "rgba(91, 57, 195, 0.395)"}}>
          <MaterialCommunityIcons name={challenge.iconName as any} size={30} color={"#ffffff"} />
        </View>

        <View className="flex flex-col flex-1 h-full" style={{ gap: 6 }}>
          <Text className="text-white font-bold text-lg">{type}</Text>
          {type == "Language" && <FromTo codeFrom={ languages[challengeData.languageFrom]} codeTo={languages[challengeData.languageTo]} />}
          {type == "Code" && <Text className="text-white/70">as mgavillo</Text>}
          {type == "Meditation" && <Text className="text-white/70">for 5 minutes</Text>}
          {type == "Socials" && <Text className="text-white/70">as swaggyMarie</Text>}
        </View>
        {!alone && <MaterialCommunityIcons name="account-multiple" size={32} color={"rgba(85, 0, 255, 0.602)"} />}
      </View>
      <View className="flex flex-row px-2 py-2 items-center bg-opacity-40" style={{ gap: 12, backgroundColor: "rgba(81, 79, 242, 0.4)"}}>
        <SolanaPrice amount={challengeData.solStaked} />
        <View className="flex-1 rounded-md overflow-hidden h-5" style={{backgroundColor: "#09005bb6"}}>
          <View className="absolute top-0 bottom-0 left-0 " style={{ width: `${percentage}%`, backgroundColor:"rgba(48, 65, 253, 0.507)" }} />
        </View>
      </View>
    </Pressable>
  );
}
