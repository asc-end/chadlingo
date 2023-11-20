import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Chadlingo } from "../../../components/solana/idl/chadlingo";

export async function withdraw(
  program: Program<Chadlingo>,
  owner: PublicKey,
  pda: PublicKey,
) {
  const withdrawInstructions = await program.methods
    .withdraw()
    .accounts({
      vault: pda,
      owner: owner,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
  return [withdrawInstructions];
}