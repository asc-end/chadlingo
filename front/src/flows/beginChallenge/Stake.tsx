import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SolAmountInput from "../../components/solana/SolAmountInput";
import setNewChallenge from "../../lib/firebase/setNewChallenge";
import { LinearGradient } from "expo-linear-gradient";
import { fetchSecureDate } from "../../lib/dates/fetchSecureDate";
import ExitHeader from "../../components/headers/Exit";
import TransactWithContractButton from "../../components/solana/TransactWithContractButton";
import createVaultAndDeposit from "../../lib/solana/instructions/createVaultAndDeposit";
import { useSolana } from "../../providers/SolanaProvider";
import { getUserChallenges } from "../../lib/firebase";

export default function Stake({ navigation, onFinish, newChallengeState }: {
  navigation: any; onFinish?: (amount: number) => void, newChallengeState: {
    type?: ChallengeType;
    languageFrom?: LanguageType;
    languageTo?: LanguageType;
    duration?: number
    friends?: string[]
  }
}) {
  const [amount, setAmount] = useState("");
  const { solanaCreds } = useSolana()
  const [challengeId, setChallengeId] = useState<string>()
  useEffect(() => {
    async function getNbChallenges(){
      const challenge = await getUserChallenges(solanaCreds?.accounts[0].address!)
      setChallengeId(challenge ? challenge?.length.toString() : "0")
    }
    getNbChallenges()
  }, [])

  function onStaked() {
    if (amount == "") return
    async function _onPress() {
      try {
        let secureDate = await fetchSecureDate();
        if (!secureDate) throw Error("Secure date fetch not possible")
        let challenge: LanguageChallenge | MeditationChallenge;

        switch (newChallengeState.type) {
          case "Language":
            challenge = {
              id: challengeId,
              beginDate: secureDate?.getTime(),
              type: newChallengeState.type!,
              nbDone: 0,
              state: "during",
              friends: newChallengeState.friends ? newChallengeState.friends : null,
              solStaked: parseFloat(amount),
              languageFrom: newChallengeState.languageFrom!,
              languageTo: newChallengeState.languageTo!
            } as LanguageChallenge;
            break;
          case "Meditation":
            challenge = {
              id: challengeId,
              beginDate: secureDate?.getTime(),
              type: newChallengeState.type!,
              nbDone: 0,
              state: "during",
              friends: newChallengeState.friends ? newChallengeState.friends : null,
              solStaked: parseFloat(amount),
              duration: newChallengeState.duration
            } as MeditationChallenge;
            break;
        }

        await setNewChallenge(solanaCreds?.accounts[0].address!, challenge!);
        navigation.navigate("home");
      } catch (e) {
        console.log(e);
      }
    }
    _onPress()
  }

console.log("challengeId", challengeId)
if(!challengeId) return <></>
  return (
    <LinearGradient colors={["rgba(0,0,30,1)", "rgba(0,0,20,1)"]} className="h-full w-full relative flex flex-col">
      <ExitHeader navigation={navigation} />
      <View className="flex-1 h-full flex flex-col items-center justify-center px-6" style={{ gap: 16 }}>
        <SolAmountInput amount={amount} setAmount={setAmount} />
        <TransactWithContractButton text="Stake" onFinished={onStaked} disabled={amount == "" || parseFloat(amount) === 0} getInstructions={createVaultAndDeposit} transactionParams={{ amount: amount, length: 30, challengeId: challengeId }} challengeId={challengeId}/>
      </View>
    </LinearGradient>
  );
}
