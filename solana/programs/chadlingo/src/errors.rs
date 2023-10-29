use anchor_lang::prelude::*;

#[error_code]
pub enum CreateError {
    #[msg("")]
    ErrorCreate,
}

#[error_code]
pub enum DepositError {
    #[msg("")]
    ErrorDeposit,
}

#[error_code]
pub enum ValidateError {
    #[msg("")]
    ErrorValidate,
}

#[error_code]
pub enum WithdrawError {
    #[msg("")]
    ErrorWithdraw,
}
