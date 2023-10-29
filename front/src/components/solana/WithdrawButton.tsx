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
import idl from "./idl/chadlingo.json"

export default function WithdrawButton({ onFinished }: { onFinished: () => void }) {
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

        const pubKey = getPublicKeyFromAddress(solanaCreds?.accounts[0].address!)
        const withdrawInstructions = await prog.methods
            .withdraw()
            .accounts({
                vault: chadlingoPDA,
                owner: pubKey,
                systemProgram: SystemProgram.programId,
            })
            .instruction();

            console.log(connection)
        const latestBlock = await connection.getLatestBlockhash()
        const incrementTransaction = new Transaction({ ...latestBlock, feePayer: pubKey })
            .add(withdrawInstructions)
        console.log("cocco")


        const resp = await transact(async (mobileWallet) => {
            console.log("-------------------------")
            if (solanaCreds?.auth_token)
                await mobileWallet.reauthorize({ auth_token: solanaCreds?.auth_token, identity: { name: "Ascend" } })

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
        if (onFinished) onFinished()

        return resp

    }

    return (
        <MainButton text={"Withdraw"} onPress={async () => {
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