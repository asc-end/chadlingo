import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Chadlingo } from "../../../components/solana/idl/chadlingo";

export async function validateDay(
  program: Program<Chadlingo>,
  owner: PublicKey,
  pda: PublicKey,
) {
  const validateInstructions = await program.methods
    .validate()
    .accounts({
      vault: pda,
      owner: owner,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
  return [validateInstructions];
}
