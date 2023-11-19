use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::states::*;

pub fn withdraw_(ctx: Context<Withdraw>) -> ProgramResult {
    let owner = &mut ctx.accounts.owner;
    let vault = &mut ctx.accounts.vault;

    if vault.owner != owner.key() {
        return Err(ProgramError::IncorrectProgramId);
    }

    if vault.counter < 30 {
        return Err(ProgramError::Custom(1));
    }

    vault.sub_lamports(vault.balance)?;
    owner.add_lamports(vault.balance)?;
    Ok(())
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, close = owner)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}

