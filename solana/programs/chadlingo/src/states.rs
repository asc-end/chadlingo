use anchor_lang::prelude::*;

pub const LAMPORTS_PER_SOL: u64 = 1_000_000_000;
pub const MINIMUM_DEPOSIT: u64 = 0 * LAMPORTS_PER_SOL;
pub const MAXIMUM_DEPOSIT: u64 = 5 * LAMPORTS_PER_SOL;

#[account] 
pub struct Vault {
    pub owner: Pubkey,
    pub balance: u64,
    pub counter: u64,
    pub challenge_id: String,
    pub challenge_stake: u64,
    pub challenge_start: i64,
    pub challenge_length: u64,
}