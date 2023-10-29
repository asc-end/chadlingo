import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Chadlingo } from "../target/types/chadlingo";
import assert from 'assert';

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Chadlingo as Program<Chadlingo>;
const system_program_id = anchor.web3.SystemProgram.programId;
const challengeLength = new anchor.BN(30);
const challengeStake = new anchor.BN(30);
const amount = new anchor.BN(1 * LAMPORTS_PER_SOL);

async function airdrop(connection: any, address: any, amount: any) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount * LAMPORTS_PER_SOL), "confirmed");
}

function getProgramDerivedAddress(stringAsBytes: string, userPublicKey: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode(stringAsBytes),
      userPublicKey.toBuffer()
    ], programId);
}

async function create(owner: anchor.web3.Keypair, vault_pda_pk: PublicKey) {
  await program.methods
    .create(challengeLength, challengeStake)
    .accounts({vault: vault_pda_pk, owner: owner.publicKey, systemProgram: system_program_id})
    .signers([owner])
    .rpc({commitment: "confirmed"})
}

async function deposit(amount: anchor.BN, owner: anchor.web3.Keypair, vault_pda_pk: PublicKey) {
  await program.methods
  .deposit(amount)
  .accounts({vault: vault_pda_pk, owner: owner.publicKey, systemProgram: system_program_id})
  .signers([owner])
  .rpc({commitment: "confirmed"})
}

async function withdraw(owner: anchor.web3.Keypair, vault_pda_pk: PublicKey) {
  await program.methods
    .withdraw()
    .accounts({vault: vault_pda_pk, owner: owner.publicKey, systemProgram: system_program_id})
    .signers([owner])
    .rpc({commitment: "confirmed"})
}

async function validate(owner: anchor.web3.Keypair, vault_pda_pk: PublicKey) {
  await program.methods
    .validate()
    .accounts({vault: vault_pda_pk, owner: owner.publicKey, systemProgram: system_program_id})
    .signers([owner])
    .rpc({commitment: "confirmed"})
}

describe("Create Vault", async () => {
  it("base case works", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", owner.publicKey, program.programId);
 
    await airdrop(provider.connection, owner.publicKey, 1);
    await create(owner, vault_pda_pk);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.owner.toString(), owner.publicKey.toString());
    assert.strictEqual(vault_data.balance.toString(), new anchor.BN(0).toString());
    assert.strictEqual(vault_data.counter.toString(), new anchor.BN(0).toString());
    assert.strictEqual(vault_data.challengeLength.toString(), challengeLength.toString());
    assert.strictEqual(vault_data.challengeStake.toString(), challengeStake.toString());
  })
});

describe("Deposit in Vault", async () => {
  it("base case works", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk);

    const vault_address_balance_before = await provider.connection.getBalance(vault_pda_pk);
    await deposit(amount, owner, vault_pda_pk);
    const vault_address_balance_after = await provider.connection.getBalance(vault_pda_pk);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.owner.toString(), owner.publicKey.toString());
    assert.strictEqual(vault_address_balance_before, vault_address_balance_after - 1 * LAMPORTS_PER_SOL);
    assert.strictEqual(vault_data.balance.toString(), (1 * LAMPORTS_PER_SOL).toString());
  })
});

describe("Withdraw from Vault", async () => {
  it("", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    const intial_owner_balance = await provider.connection.getBalance(owner.publicKey);
    await create(owner, vault_pda_pk);
    await deposit(amount, owner, vault_pda_pk);
    await withdraw(owner, vault_pda_pk);
    const owner_balance_after = await provider.connection.getBalance(owner.publicKey);

    assert.strictEqual(intial_owner_balance, owner_balance_after);
  })
});

describe("Validate day", async () => {
  it("base case works", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk);
    await deposit(amount, owner, vault_pda_pk);
    await validate(owner, vault_pda_pk);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.counter.toString(), new anchor.BN(1).toString());
  })
});
