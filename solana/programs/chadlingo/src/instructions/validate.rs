use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use crate::errors::ValidateError;

use crate::states::*;

pub fn validate_(ctx: Context<Validate>) -> Result<()> {
    let owner = &mut ctx.accounts.owner;
    let vault = &mut ctx.accounts.vault;
    let clock = Clock::get()?;

    let seconds_in_day = 60 * 60 * 24;
    let nb_days: i64 = vault.counter.try_into().unwrap();
    let challenge_start: i64 = vault.challenge_start.try_into().unwrap();
    let lower_bound = challenge_start + nb_days * seconds_in_day; 
    let upper_bound = challenge_start + (nb_days + 1) * seconds_in_day;

    require!(vault.owner == owner.key(), ValidateError::IncorrectOwner);
    require!(clock.unix_timestamp >= lower_bound && clock.unix_timestamp <= upper_bound, ValidateError::InvalidTime);

    vault.counter += 1;
    Ok(())
}

#[derive(Accounts)]
pub struct Validate<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}