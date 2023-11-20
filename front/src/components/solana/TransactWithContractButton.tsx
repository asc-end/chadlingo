import React, { useEffect, useMemo, useState } from "react";
import { Connection, PublicKey, TransactionInstruction, clusterApiUrl } from "@solana/web3.js";
import { PrimaryButton } from "../buttons";
import { getPublicKeyFromAddress } from "../../lib/solana/getPublicKeyFromAddress";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Chadlingo } from "./idl/chadlingo";
import idl from "./idl/chadlingo.json";
import signAndSendTransactions from "../../lib/solana/signAndSendTransactions";
import { useSolana } from "../../providers/SolanaProvider";
import { getUserChallenges } from "../../lib/firebase";

export default function TransactWithContractButton({
  text,
  onFinished,
  disabled = false,
  getInstructions,
  transactionParams,
  challengeId
}:
  {
    text: string,
    onFinished?: () => void,
    disabled?: boolean,
    getInstructions: (...args: any[]) => Promise<TransactionInstruction[]>
    transactionParams?: any,
    challengeId: string
  },
) {
  const { connection, solanaCreds, setSolanaCreds } = useSolana()
  const [ signingInProgress, setSigningInProgress ] = useState(false);
  const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!);
  const progId = "5uuL3s2tWFk3paG9p4E4tRE1LxWjsWftfrYgUwYBh7jN"
  const program = new Program<Chadlingo>(idl as Chadlingo, progId, { connection });
  // const [challengeId, setChallengeId] = useState<string>()
  
  // useEffect(() => {
  //   async function getNbChallenges(){
  //     const challenge = await getUserChallenges(solanaCreds?.accounts[0].address!)
  //     setChallengeId(challenge?.length.toString())
  //   }
  //   getNbChallenges()
  // }, [])
  
  console.log(challengeId)
  const [pda] = useMemo(() => {
    const chadlingoSeed = anchor.utils.bytes.utf8.encode("vault");
    return anchor.web3.PublicKey.findProgramAddressSync([chadlingoSeed, anchor.utils.bytes.utf8.encode(challengeId), pubKey.toBuffer()], program.programId);
  }, [progId]);

  async function onPress() {
    if (signingInProgress) return
    setSigningInProgress(true);
    try {
      let instructions = await getInstructions(program, pubKey, pda, transactionParams)
      await signAndSendTransactions(instructions, pubKey, setSolanaCreds, solanaCreds?.auth_token)
      onFinished?.()
    }
    catch (e) {
      console.log("TransactWithContractButton", e)
    } finally {
      setSigningInProgress(false);
    }
  }

  return (
    <PrimaryButton
      text={text}
      onPress={onPress}
      disabled={signingInProgress || disabled}
      full
    />
  );
}