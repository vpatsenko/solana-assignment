import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAssignment } from "../target/types/solana_assignment";
import fs from 'fs';

describe("solana-assignment", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaAssignment as Program<SolanaAssignment>;

  it("Is initialized!", async () => {
    await program.rpc.create(
      provider.wallet.publickey,
      {
        accounts: {
          treasury: treasury.publickey,
          user: provider.wallet.publickey,
          systemprogram: systemprogram.programid,
        },
        signers: [treasury],
      }
    );

    let treasuryAccount = await program.account.treasury.fetch(treasury.publicKey);
    console.log(treasuryAccount.deposit);
    let deposit = treasuryAccount.deposit.toString();
    console.log(deposit);
  });
});


