import React, { useState, useCallback, useMemo } from 'react';
import { Button } from 'react-native';
import { fromUint8Array } from 'js-base64';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionInstructionCtorFields } from '@solana/web3.js';
import useStore from '../../lib/state';
import { MainButton } from '../Buttons';
import { useAuthorization } from '../../providers/AuthorizationProvider';
import { useConnection } from '../../providers/ConnectionProvider';
import { progId } from '../../hooks/useChadlingoProgram';
import { Chadlingo } from './target/types/chadlingo';
import { Program } from '@coral-xyz/anchor';
import { getPublicKeyFromAddress } from '../../lib/solana/getPublicKeyFromAddress';
// import { struct, u32, ns64 } from "@solana/buffer-layout"
import * as anchor from '@coral-xyz/anchor';
import idl from "./target/idl/chadlingo.json"

export default function CreateVaultButton({ onFinished }: { onFinished: () => void }) {
  //   const {connection} = useConnection();
  const { authorizeSession } = useAuthorization();

  const { solanaCreds } = useStore()
  const [signingInProgress, setSigningInProgress] = useState(false);
  const { connection } = useConnection();
  // const { chadlingoProgram } = useChadlingoProgram(connection, { address: solanaCreds?.account?.address!, });

  const [chadlingoPDA] = useMemo(() => {
    const chadlingoSeed = anchor.utils.bytes.utf8.encode('vault');
    return anchor.web3.PublicKey.findProgramAddressSync([chadlingoSeed], new PublicKey(progId));
  }, [progId]);


  async function createVault() {
    console.log("coucou")
    const prog = new Program<Chadlingo>(
      idl as Chadlingo,
      progId,
      { connection },
    );
    let challengeLength = new anchor.BN(30)
    let challengeStake = new anchor.BN(30)


    let amount = new anchor.BN(1 * LAMPORTS_PER_SOL)

    console.log("chal", challengeLength)
    const pubKey = getPublicKeyFromAddress(solanaCreds?.account?.address!)
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

    const latestBlock = await connection.getLatestBlockhash()
    const incrementTransaction = new Transaction({ ...latestBlock, feePayer: pubKey })
      .add(createInstructions)
      .add(depositInstructions);
    console.log("cocco")


    const resp = await transact(async (mobileWallet) => {
  
      console.log("-------------------------")
      if (solanaCreds?.authToken)
        await mobileWallet.reauthorize({ auth_token: solanaCreds?.authToken!, identity: { name: "Ascend" } })

      else {
        const authorization = await mobileWallet.authorize({
          cluster: "devnet",
          identity: { name: "Ascend" },
        });
      }
      console.log("coucou")
      const signedTransactions = await mobileWallet.signTransactions({ transactions: [incrementTransaction] })
      console.log(signedTransactions)
    })
    if(onFinished) onFinished()

    return resp

  }

  return (
    <MainButton text={"transact"} onPress={async () => {
      if (signingInProgress || !solanaCreds?.account?.address) {
        return;
      }
      setSigningInProgress(true);
      try {
        await createVault();
      } finally {
        setSigningInProgress(false);
      }
    }}
      disabled={signingInProgress} full />

  );
}