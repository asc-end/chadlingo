import React, { useState, useCallback, useMemo } from "react";
import { Button } from "react-native";
import { fromUint8Array } from "js-base64";
import { transact, Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import useStore from "../../lib/state";
import { MainButton } from "../Buttons";
import { useAuthorization } from "../../providers/AuthorizationProvider";
import { useConnection } from "../../providers/ConnectionProvider";
import { progId } from "../../hooks/useChadlingoProgram";
import { Chadlingo } from "./idl/chadlingo";
import { Program } from "@coral-xyz/anchor";
import { getPublicKeyFromAddress } from "../../lib/solana/getPublicKeyFromAddress";
// import { struct, u32, ns64 } from "@solana/buffer-layout"
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl/chadlingo.json";
import { authorize } from "../../lib/solana/authorize";

export default function CreateVaultButton({ onFinished, disabled }: { onFinished?: () => void, disabled: boolean }) {
  const { solanaCreds, setSolanaCreds } = useStore();
  const [signingInProgress, setSigningInProgress] = useState(false);
  const { connection } = useConnection();
  // const { chadlingoProgram } = useChadlingoProgram(connection, { address: solanaCreds?.account?.address!, });

  const [chadlingoPDA] = useMemo(() => {
    const chadlingoSeed = anchor.utils.bytes.utf8.encode("vault");
    return anchor.web3.PublicKey.findProgramAddressSync([chadlingoSeed], new PublicKey(progId));
  }, [progId]);

  async function createVault() {
    console.log("coucou");
    const prog = new Program<Chadlingo>(idl as Chadlingo, progId, { connection });
    let challengeLength = new anchor.BN(30);
    let challengeStake = new anchor.BN(30);

    let amount = new anchor.BN(1 * LAMPORTS_PER_SOL);

    console.log("chal", challengeLength);
    const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!);
    const createInstructions = await prog.methods
      .create(challengeLength, challengeStake)
      .accounts({
        vault: chadlingoPDA,
        owner: pubKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const depositInstructions = await prog.methods
      .deposit(amount)
      .accounts({
        vault: chadlingoPDA,
        owner: pubKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const keypair = Keypair.generate();

    console.log(solanaCreds?.accounts[0].address)
    const latestBlock = await connection.getLatestBlockhash();
    const incrementTransaction = new Transaction({ ...latestBlock, feePayer: pubKey })
      .add(SystemProgram.transfer({
        fromPubkey: getPublicKeyFromAddress(solanaCreds?.accounts[0].address!),
        toPubkey: keypair.publicKey,
        lamports: 1_000,
      }))
    // .add(createInstructions)
    // .add(depositInstructions);

    const resp = await transact(async (mobileWallet) => {
      await authorize(mobileWallet, solanaCreds!, setSolanaCreds)
      console.log(latestBlock)
      const signedTransactions = await mobileWallet.signTransactions({ transactions: [incrementTransaction] });
      console.log(signedTransactions)

      return signedTransactions
    });
    if (onFinished) onFinished();

    return resp;
  }

  return (
    <MainButton
      text={"Stake"}
      onPress={async () => {
        if (signingInProgress || !solanaCreds?.accounts[0].address) {
          return;
        }
        setSigningInProgress(true);
        try {
          await createVault();
        } finally {
          setSigningInProgress(false);
        }
      }}
      disabled={signingInProgress || disabled}
      full
    />
  );
}
