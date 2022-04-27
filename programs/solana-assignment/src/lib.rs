use anchor_lang::prelude::*;

declare_id!("CeuDHWi9VKhFFhoveVkZkPNmhX5NKSjPfAfzy8ssY3HP");

#[program]
pub mod solana_assignment {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>) -> Result<()> {
        let treasury_account = &mut ctx.accounts.treasury_account;

        treasury_account.deposit_amount = 0;
        treasury_account.bump = *ctx.bumps.get("treasury_account").unwrap();
        Ok(())
    }

    //     pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result<()> {
    //         let base_account = &mut ctx.accounts.base_account;

    //         let item = ItemStruct {
    //             gif_link: gif_link.to_string(),
    //             user_address: *base_account.to_account_info().key,
    //         };

    //         base_account.gif_list.push(item);

    //         Ok(())
    //     }
}

#[derive(Accounts)]
pub struct InitializeTreasury<'info> {
    #[account(init, payer = user, space = 9000, seeds = [b"treasury_account"], bump)]
    pub treasury_account: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut, seeds = [b"treasury_account"], bump = treasury.bump)]
    pub treasury: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub amount: u64,
    pub user_address: Pubkey,
}

#[account]
pub struct TreasuryAccount {
    deposit_amount: u64,
    depositors_list: Vec<ItemStruct>,
    bump: u8,
}
