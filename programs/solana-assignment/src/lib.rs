use anchor_lang::prelude::*;

declare_id!("Df4dFXdvoVW7RAdsnEwxSBT48j1Mh3CJTJWy4PKDJg9W");

#[program]
mod solana_assignment {
    use super::*;
    use anchor_lang::solana_program::entrypoint::*;
    use anchor_lang::solana_program::program::*;
    use anchor_lang::solana_program::system_instruction::*;
    use system_instruction;

    pub fn create(ctx: Context<Create>, authority: Pubkey) -> Result<()> {
        let tresuary = &mut ctx.accounts.treasury;
        tresuary.authority = authority;
        let accountInfo = &mut tresuary.to_account_info();

        let lamports = match accountInfo.try_lamports() {
            Ok(l) => l,
            Err(e) => {
                msg!("Error: {:?}", e);
                return Err(anchor_lang::error::Error::from(e));
            }
        };

        msg!("accountInfo: {:?}", accountInfo);
        msg!("lamports: {:?}", lamports);

        system_instruction::transfer(&ctx.accounts.treasury, &ctx.accounts.program, lamports)?;
        // let x = accountInfo.lamports;
        // let b = x.into_inner().;

        // let c = *b.;

        Ok(())
    }

    // pub fn increment(ctx: Context<Increment>) -> Result<()> {
    //     let counter = &mut ctx.accounts.counter;
    //     counter.count += 1;
    //     Ok(())
    // }

    pub fn send_sol(ctx: Context<SendSol>, amount: u64) -> ProgramResult {
        // let ix = transfer(&ctx.accounts.from.key(), &ctx.accounts.to.key(), amount);

        // invoke(
        //     &ix,
        //     &[
        //         ctx.accounts.from.to_account_info(),
        //         ctx.accounts.to.to_account_info(),
        //     ],
        // )

        let acc = match ctx.accounts.from.try_borrow_mut_lamports() {
            Ok(number) => number,
            Err(e) => {
                msg!("{}", e);
                return Err(e);
            }
        };

        msg!("{}", acc);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// pub struct Increment<'info> {
//     #[account(mut, has_one = authority)]
//     pub counter: Account<'info, Counter>,
//     pub authority: Signer<'info>,
// }

// #[account]
// pub struct Counter {
//     pub authority: Pubkey,
//     pub count: u64,
// }

#[derive(Accounts)]
pub struct SendSol<'info> {
    #[account(mut)]
    from: Signer<'info>,
    #[account(mut)]
    to: AccountInfo<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct Treasury {
    pub authority: Pubkey,
    // deposit: >,
}
