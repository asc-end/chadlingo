use anchor_lang::prelude::*;

use crate::states::*;
use crate::errors::DepositError;

pub fn deposit_(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    require!(amount > MINIMUM_DEPOSIT, DepositError::AmountTooLow);
    require!(amount <= MAXIMUM_DEPOSIT, DepositError::AmountTooHigh);
    require!(amount < ctx.accounts.owner.to_account_info().try_lamports()?, DepositError::InsufficientFunds);

    let txn = anchor_lang::solana_program::system_instruction::transfer(
        &ctx.accounts.owner.key(),
        &ctx.accounts.vault.key(),
        amount
    );
    anchor_lang::solana_program::program::invoke(
        &txn,
        &[
            ctx.accounts.owner.to_account_info(),                
            ctx.accounts.vault.to_account_info(),                
        ]
    )?;
    (&mut ctx.accounts.vault).balance += amount;
    Ok(())
}

#[derive(Accounts)] 
pub struct Deposit<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}
