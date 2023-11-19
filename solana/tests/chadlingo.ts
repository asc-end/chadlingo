import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Chadlingo } from "../target/types/chadlingo";
import assert from 'assert';

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Chadlingo as Program<Chadlingo>;
const system_program_id = anchor.web3.SystemProgram.programId;
const challengeId = "1";
const challengeLength = new anchor.BN(30);
const challengeStake = new anchor.BN(30);
const amount = new anchor.BN(1 * LAMPORTS_PER_SOL);
const minDeposit = new anchor.BN(0);
const maxDeposit = new anchor.BN(5 * LAMPORTS_PER_SOL);

async function airdrop(connection: any, address: any, amount: any) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount * LAMPORTS_PER_SOL), "confirmed");
}

function getProgramDerivedAddress(stringAsBytes: string, challengeId: String, userPublicKey: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode(stringAsBytes),
      anchor.utils.bytes.utf8.encode(challengeId.toString()),
      userPublicKey.toBuffer()
    ], programId);
}

async function create(owner: anchor.web3.Keypair, vault_pda_pk: PublicKey, challengeId: string, challengeLength: anchor.BN, challengeStake: anchor.BN) {
  await program.methods
    .create(challengeId, challengeLength, challengeStake)
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
  it("user create one vault, initialisation value are correctly set", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);
    
    await airdrop(provider.connection, owner.publicKey, 1);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.owner.toString(), owner.publicKey.toString());
    assert.strictEqual(vault_data.balance.toString(), new anchor.BN(0).toString());
    assert.strictEqual(vault_data.counter.toString(), new anchor.BN(0).toString());
    assert.strictEqual(vault_data.challengeId.toString(), challengeId.toString());
    assert.strictEqual(vault_data.challengeLength.toString(), challengeLength.toString());
    assert.strictEqual(vault_data.challengeStake.toString(), challengeStake.toString());
  })

  it("user can create two vaults", async() => {
    const owner = anchor.web3.Keypair.generate();
    const secondChallengeId = "2";
    const secondChallengeLength = new anchor.BN(10);
    const secondChallengeStake = new anchor.BN(10);
    const [vault_pda_pk_one, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);
    const [vault_pda_pk_two, ] = getProgramDerivedAddress("vault", secondChallengeId, owner.publicKey, program.programId);
    
    await airdrop(provider.connection, owner.publicKey, 1);
    await create(owner, vault_pda_pk_one, challengeId, challengeLength, challengeStake);
    await create(owner, vault_pda_pk_two, secondChallengeId, secondChallengeLength, secondChallengeStake);

    const vault_data_one = await program.account.vault.fetch(vault_pda_pk_one);
    const vault_data_two = await program.account.vault.fetch(vault_pda_pk_two);

    assert.strictEqual(vault_data_one.challengeId.toString(), challengeId.toString());
    assert.strictEqual(vault_data_two.challengeId.toString(), secondChallengeId.toString());
  })

  it("user can' create two vaults with the same challenge id", async() => {
    let should_fail = false;
    
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);
    
    await airdrop(provider.connection, owner.publicKey, 1);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);
    try {
      await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);
    } catch (error) {
      // assert.strictEqual(error.message, ""); not sure if i should leave it fail (seed constraint error as it was already create or if i should do verification on the program & log a clean error - should i save those cu or not? please let me know)
      should_fail = true;
    }
    assert.strictEqual(should_fail, true);
  })
});

describe("Deposit in Vault", async () => {
  it("user can validate the current day", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);

    const vault_address_balance_before = await provider.connection.getBalance(vault_pda_pk);
    await deposit(amount, owner, vault_pda_pk);
    const vault_address_balance_after = await provider.connection.getBalance(vault_pda_pk);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.owner.toString(), owner.publicKey.toString());
    assert.strictEqual(vault_address_balance_before, vault_address_balance_after - 1 * LAMPORTS_PER_SOL);
    assert.strictEqual(vault_data.balance.toString(), (1 * LAMPORTS_PER_SOL).toString());
  })

  it("user can't deposit 0 sol", async() => {
    let should_fail = false;
    
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);

    try {
      await deposit(minDeposit, owner, vault_pda_pk)
    } catch (error) {
      assert.strictEqual(error.error.errorMessage, "Deposit needs to be > 0 SOL");
      should_fail = true;
    }
    assert.strictEqual(should_fail, true);
  })

  it("user can't deposit more than 5 sol", async() => {
    let should_fail = false;
    
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 6);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);

    try {
      await deposit(maxDeposit.add(new anchor.BN(1)), owner, vault_pda_pk)
    } catch (error) {
      assert.strictEqual(error.error.errorMessage, "Deposit needs to be <= 5 SOL");
      should_fail = true;
    }
    assert.strictEqual(should_fail, true);
  })

  it("user can't deposit if he doesn't have enough fund", async() => {
    let should_fail = false;
    
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);

    try {
      await deposit(maxDeposit, owner, vault_pda_pk)
    } catch (error) {
      assert.strictEqual(error.error.errorMessage, "Insufficient funds to deposit");
      should_fail = true;
    }
    assert.strictEqual(should_fail, true);
  })
});

describe("Validate day", async () => {
  it("base case works", async () => {
    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);
    await deposit(amount, owner, vault_pda_pk);
    await validate(owner, vault_pda_pk);

    const vault_data = await program.account.vault.fetch(vault_pda_pk);
    assert.strictEqual(vault_data.counter.toString(), new anchor.BN(1).toString());
  })

  it("user can't validate out of range", async() => {
    // should make different case for that - here we protect out of range validation by incrementing the current day. works for all branches but return the same error for all of them, not ideal. same question, is it worth the compute units?
    let should_fail = false;

    const owner = anchor.web3.Keypair.generate();
    const [vault_pda_pk, ] = getProgramDerivedAddress("vault", challengeId, owner.publicKey, program.programId);

    await airdrop(provider.connection, owner.publicKey, 2);
    await create(owner, vault_pda_pk, challengeId, challengeLength, challengeStake);
    await deposit(amount, owner, vault_pda_pk);
    await validate(owner, vault_pda_pk);
    try {
      await validate(owner, vault_pda_pk);
    } catch (error) {
      assert.strictEqual(error.error.errorMessage, "Validation out of range");
      should_fail = true;
    }
    assert.strictEqual(should_fail, true);
  })
});

// need to use https://github.com/kevinheavey/solana-bankrun to manipulate clock

// describe("Withdraw from Vault", async () => {
//   it("", async () => {
//     const owner = anchor.web3.Keypair.generate();
//     const [vault_pda_pk, ] = getProgramDerivedAddress("vault", owner.publicKey, program.programId);

//     await airdrop(provider.connection, owner.publicKey, 2);
//     const intial_owner_balance = await provider.connection.getBalance(owner.publicKey);
//     await create(owner, vault_pda_pk);
//     await deposit(amount, owner, vault_pda_pk);
//     await withdraw(owner, vault_pda_pk);
//     const owner_balance_after = await provider.connection.getBalance(owner.publicKey);

//     assert.strictEqual(intial_owner_balance, owner_balance_after);
//   })
// });