import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import { authorize } from "../authorize";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Program } from "@coral-xyz/anchor";
import { Chadlingo } from "../../../components/solana/idl/chadlingo";
import { progId } from "../../../hooks/useChadlingoProgram";
import idl from "../../../components/solana/idl/chadlingo.json";
import * as anchor from "@coral-xyz/anchor";
import { getPublicKeyFromAddress } from "../getPublicKeyFromAddress";

export default async function createVaultAndDeposit(
  program: Program<Chadlingo>,
  owner: PublicKey,
  pda: PublicKey,
  transactionParams: { amount: number, length: number,  }
) {

  let length = new anchor.BN(transactionParams.length);
  let amount = new anchor.BN(transactionParams.amount * LAMPORTS_PER_SOL);

  const createInstructions = await program.methods
    .create(length, amount)
    .accounts({
      vault: pda,
      owner: owner,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const depositInstructions = await program.methods
    .deposit(amount)
    .accounts({
      vault: pda,
      owner: owner,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  return [createInstructions, depositInstructions];
}
