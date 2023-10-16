use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::solana_program::sysvar::rent::Rent;
use anchor_lang::solana_program::clock::Clock;

declare_id!("4hbWdGHR64ppsFyfqFNmR4FuUndAX9cHJvPqcqePWKpJ");

// #[program]: program module
// #[account]: dat structures stored onchain
// #[derive(Accounts)]: function context

#[program]
pub mod chadlingo {
    use super::*;

    pub fn create(ctx: Context<Create>, challenge_stake: u64, challenge_length: u64) -> ProgramResult {
        let owner = ctx.accounts.owner.key();
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        vault.owner = owner;
        vault.counter = 0;
        vault.challenge_stake = challenge_stake;
        vault.challenge_start = clock.unix_timestamp;
        vault.challenge_length = challenge_length;

        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> ProgramResult {
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

    pub fn withdraw(ctx: Context<Withdraw>) -> ProgramResult {
        let owner = &mut ctx.accounts.owner;
        let vault = &mut ctx.accounts.vault;

        if vault.owner != owner.key() {
            return Err(ProgramError::IncorrectProgramId);
        }

        if vault.counter < 30 {
            return Err(ProgramError::Custom(1));
        }

        **vault.to_account_info().try_borrow_mut_lamports()? -= vault.balance;
        **owner.to_account_info().try_borrow_mut_lamports()? += vault.balance;
        Ok(())
    }

    pub fn validate(ctx: Context<Validate>) -> ProgramResult {
        let owner = &mut ctx.accounts.owner;
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        if vault.owner != owner.key() {
            return Err(ProgramError::IncorrectProgramId);
        }

        let seconds_in_day = 60 * 60 * 24;
        let nb_days: i64 = vault.counter.try_into().unwrap();
        let challenge_start: i64 = vault.challenge_start.try_into().unwrap();
        let lower_bound = challenge_start + nb_days * seconds_in_day; 
        let upper_bound = challenge_start + (nb_days + 1) * seconds_in_day;

        if clock.unix_timestamp < lower_bound || clock.unix_timestamp > upper_bound {
            return Err(ProgramError::IncorrectProgramId);
        }

        vault.counter += 1;
        Ok(())
    }
}

#[account] 
pub struct Vault {
    pub owner: Pubkey,
    pub balance: u64,
    pub counter: u64,
    pub challenge_stake: u64,
    pub challenge_start: i64,
    pub challenge_length: u64,
}

#[derive(Accounts)] 
pub struct Create<'info> {
    #[account(init, payer=owner, space=264, seeds=["vault".as_bytes(), &owner.key.to_bytes()], bump)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)] 
pub struct Deposit<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, close = owner)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Validate<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>
}