// import { AnchorProvider, Program } from '@coral-xyz/anchor';
// import { Connection, PublicKey } from '@solana/web3.js';
// import { useMemo } from 'react';
// import * as anchor from '@coral-xyz/anchor';

export const progId = "4nNtVknm1ohyRyW7tSfHDZ3jFnbbFt2jc1az8fjUsmPp"

// import { Chadlingo } from "../../target/types/chadlingo"
// import idl from "../../target/idl/chadlingo.json"

// export function useChadlingoProgram(connection: Connection,
//     anchorWallet: anchor.Wallet | null,) {

//     const chadlingoProgramId = useMemo(() => {
//         return new PublicKey(progId);
//     }, []);

//     const [chadlingoPDA] = useMemo(() => {
//         const chadlingoSeed = anchor.utils.bytes.utf8.encode('vault');
//         return anchor.web3.PublicKey.findProgramAddressSync([chadlingoSeed], chadlingoProgramId);
//     }, [chadlingoProgramId]);


//     const provider = useMemo(() => {
//         if (!anchorWallet) {
//             return null;
//         }
//         return new AnchorProvider(connection, anchorWallet, {
//             preflightCommitment: 'confirmed',
//             commitment: 'processed',
//         });
//     }, [anchorWallet, connection]);

//     const basicChadlingoProgram = useMemo(() => {
//         if (!provider) {
//             return null;
//         }

//         return new Program<Chadlingo>(
//             idl as Chadlingo,
//             chadlingoProgramId,
//             provider,
//         );
//     }, [chadlingoProgramId, provider]);

//     const value = useMemo(
//         () => ({
//             counterProgram: basicChadlingoProgram,
//             counterProgramId: chadlingoProgramId,
//             counterPDA: chadlingoPDA,
//         }),
//         [basicChadlingoProgram, chadlingoProgramId, chadlingoPDA],
//     );

//     return value;
// }