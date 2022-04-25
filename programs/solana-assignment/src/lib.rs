use anchor_lang::prelude::*;

declare_id!("Df4dFXdvoVW7RAdsnEwxSBT48j1Mh3CJTJWy4PKDJg9W");

#[program]
pub mod solana_assignment {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
