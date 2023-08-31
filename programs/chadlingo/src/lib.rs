use anchor_lang::prelude::*;

declare_id!("4hbWdGHR64ppsFyfqFNmR4FuUndAX9cHJvPqcqePWKpJ");

#[program]
pub mod chadlingo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
