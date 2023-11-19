use anchor_lang::prelude::*;

#[error_code]
pub enum CreateError {
    #[msg("")]
    ErrorCreate,
}

#[error_code]
pub enum DepositError {
    #[msg("Deposit needs to be > 0 SOL")]
    AmountTooLow,
    #[msg("Deposit needs to be <= 5 SOL")]
    AmountTooHigh,
    #[msg("Insufficient funds to deposit")]
    InsufficientFunds
}

#[error_code]
pub enum ValidateError {
    #[msg("Incorrect owner")]
    IncorrectOwner,
    #[msg("Validation out of range")]
    InvalidTime,
}

#[error_code]
pub enum WithdrawError {
    #[msg("")]
    ErrorWithdraw,
}
