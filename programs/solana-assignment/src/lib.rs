use anchor_lang::prelude::*;

declare_id!("EE3g9Y5MsBs9HWoenTvp8SCYv9gGxeiNNjggLt4kzACL");

#[program]
pub mod solana_assignment {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>) -> Result<()> {
        let treasury_account = &mut ctx.accounts.treasury;

        // treasury_account.deposit_amount = 0;
        // treasury_account.bump = *ctx.bumps.get("treasury_account").unwrap();

        // let base_account = &mut ctx.accounts.base_account;

        // base_account.total_gifs = 0;
        // base_account.bump = *ctx.bumps.get("base_account").unwrap();

        Ok(())
    }

    // pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result<()> {
    //     let base_account = &mut ctx.accounts.base_account;

    //     let item = ItemStruct {
    //         gif_link: gif_link.to_string(),
    //         user_address: *base_account.to_account_info().key,
    //     };

    //     base_account.gif_list.push(item);

    //     Ok(())
    // }
}

#[derive(Accounts)]
pub struct InitializeTreasury<'info> {
    #[account(init, payer = user, space = 9000, seeds = [b"treasury-account"], bump)]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut, seeds = [b"treasury-account"], bump = treasury.bump)]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub amount: u64,
    pub user_address: Pubkey,
}

#[account]
pub struct Treasury {
    deposit_amount: u64,
    depositors_list: Vec<ItemStruct>,
    bump: u8,
}
