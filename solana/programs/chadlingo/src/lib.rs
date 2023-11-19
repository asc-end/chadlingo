use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::instructions::*;

pub mod errors;
pub mod instructions;
pub mod states;

declare_id!("4nNtVknm1ohyRyW7tSfHDZ3jFnbbFt2jc1az8fjUsmPp");

#[program]
pub mod chadlingo {
    use super::*;

    pub fn create(ctx: Context<Create>, challenge_id: String, challenge_stake: u64, challenge_length: u64) -> ProgramResult {
        create_(ctx, challenge_id, challenge_stake, challenge_length)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        deposit_(ctx, amount)
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> ProgramResult {
        withdraw_(ctx)
    }
    
    pub fn validate(ctx: Context<Validate>) -> Result<()> {
       validate_(ctx)
    }
}


