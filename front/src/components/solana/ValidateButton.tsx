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
import { Chadlingo } from './idl/chadlingo';
import { Program } from '@coral-xyz/anchor';
import { getPublicKeyFromAddress } from '../../lib/solana/getPublicKeyFromAddress';
// import { struct, u32, ns64 } from "@solana/buffer-layout"
import * as anchor from '@coral-xyz/anchor';
import idl from "./idl/chadlingo.json"
import { authorize } from '../../lib/solana/authorize';

export default function ValidateButton({ onFinished }: { onFinished: () => void }) {
  //   const {connection} = useConnection();
  const { authorizeSession } = useAuthorization();

  const { solanaCreds, setSolanaCreds } = useStore()
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
    
    const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!)
    const validateInstructions = await prog.methods
      .validate()
      .accounts({
        vault: chadlingoPDA,
        owner: pubKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const latestBlock = await connection.getLatestBlockhash()
    const incrementTransaction = new Transaction({ ...latestBlock, feePayer: pubKey }).add(validateInstructions)


    const resp = await transact(async (mobileWallet) => {
      await authorize(mobileWallet, solanaCreds!, setSolanaCreds)
      const signedTransactions = await mobileWallet.signTransactions({ transactions: [incrementTransaction] })
    })
    if(onFinished) onFinished()

    return resp

  }

  return (
    <MainButton text={"Validate"} onPress={async () => {
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
      disabled={signingInProgress} full />

  );
}