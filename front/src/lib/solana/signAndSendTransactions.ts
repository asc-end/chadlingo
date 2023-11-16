import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { authorize } from "./authorize";
import getConnection from "./connection";

export default async function signAndSendTransactions(
  instructions: anchor.web3.TransactionInstruction[],
  payerKey: PublicKey,
  setSolanaCreds: (creds: Creds) => void,
  auth_token?: string
) {

  const connection = getConnection();
  //Create the transaction from instructions
  const latestBlock = await connection.getLatestBlockhash();

  const txMessage = new TransactionMessage({
    payerKey: payerKey,
    recentBlockhash: latestBlock.blockhash,
    instructions,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(txMessage);

  //Authorize session to the mobile wallet, then sign and sends transaction through it
  const txSignatures = await transact(async (mobileWallet) => {
    await authorize(mobileWallet, setSolanaCreds, auth_token);

    const signedTransactions = await mobileWallet.signAndSendTransactions({ transactions: [transaction] });
    return signedTransactions;
  });
  return txSignatures;
}
