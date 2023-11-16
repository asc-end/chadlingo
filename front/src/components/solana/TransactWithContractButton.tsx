import React, { useMemo, useState } from "react";
import { Connection, PublicKey, TransactionInstruction, clusterApiUrl } from "@solana/web3.js";
import { PrimaryButton } from "../buttons";
import { progId } from "../../hooks/useChadlingoProgram";
import { getPublicKeyFromAddress } from "../../lib/solana/getPublicKeyFromAddress";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Chadlingo } from "./idl/chadlingo";
import idl from "./idl/chadlingo.json";
import signAndSendTransactions from "../../lib/solana/signAndSendTransactions";
import { useSolana } from "../../providers/SolanaProvider";

export default function TransactWithContractButton({
  text,
  onFinished,
  disabled = false,
  getInstructions,
  transactionParams
}:
  {
    text: string,
    onFinished?: () => void,
    disabled?: boolean,
    getInstructions: (...args: any[]) => Promise<TransactionInstruction[]>
    transactionParams?: any
  },
) {
  const { connection, solanaCreds, setSolanaCreds } = useSolana()
  const [signingInProgress, setSigningInProgress] = useState(false);
  const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!);

  const [pda] = useMemo(() => {
    const chadlingoSeed = anchor.utils.bytes.utf8.encode("vault");
    return anchor.web3.PublicKey.findProgramAddressSync([chadlingoSeed, pubKey.toBuffer()], new PublicKey(progId));
  }, [progId]);

  
  const program = new Program<Chadlingo>(idl as Chadlingo, progId, { connection });

  async function onPress() {
    if (signingInProgress) return
    setSigningInProgress(true);
    try {
      let instructions = await getInstructions(program, pubKey, pda, transactionParams)
      signAndSendTransactions(instructions, pubKey, setSolanaCreds)
    } finally {
      setSigningInProgress(false);
      onFinished?.()
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