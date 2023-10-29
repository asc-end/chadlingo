use anchor_lang::prelude::*;

#[account] 
pub struct Vault {
    pub owner: Pubkey,
    pub balance: u64,
    pub counter: u64,
    pub challenge_stake: u64,
    pub challenge_start: i64,
    pub challenge_length: u64,
}