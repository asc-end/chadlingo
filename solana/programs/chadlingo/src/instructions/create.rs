use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::states::*;
// use crate::errors::CreateError;

pub fn create_(ctx: Context<Create>, challenge_id: String, challenge_stake: u64, challenge_length: u64) -> ProgramResult {
    let owner = ctx.accounts.owner.key();
    let vault = &mut ctx.accounts.vault;
    let clock = Clock::get()?;

    vault.owner = owner;
    vault.counter = 0;
    vault.challenge_id = challenge_id;
    vault.challenge_stake = challenge_stake;
    vault.challenge_start = clock.unix_timestamp;
    vault.challenge_length = challenge_length;

    Ok(())
}

#[derive(Accounts)]
#[instruction(challenge_id: String)]
pub struct Create<'info> {
    #[account(init, payer=owner, space=264, seeds=["vault".as_bytes(), challenge_id.as_str().as_bytes(), &owner.key.to_bytes()], bump)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}
