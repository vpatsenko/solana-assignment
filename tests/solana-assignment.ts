
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAssignment } from "../target/types/solana_assignment";
import * as web3js from "@solana/web3.js";
import { assert } from "chai";

describe("solana-assignment", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaAssignment as Program<SolanaAssignment>;

  // !!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!! make fase if running for the first time
  // !!!!!!!!!!!!!!!!!!!!!!!
  const isPDAInited: boolean = true;


  it("Is initialized!", async () => {


    const [treasuryPDA, _] = await web3js.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("treasury_account")], program.programId);

    if (!isPDAInited) {
      console.log("🚀 Creating base account and initializing pda...")

      let tx = await program.methods.initializeTreasury().accounts({
        user: provider.wallet.publicKey,
        treasuryAccount: treasuryPDA,
      }).rpc();

      console.log("📝 Your transaction signature of initialized pda:", tx);
    }

    console.log("🚀 PDA is initialized!");
  });

  it("Retrives deposit amount from treasury, asserts, and then makes a deposit", async () => {
    const [treasuryPDA, _] = await web3js.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("treasury_account")], program.programId);

    let account = await program.account.treasuryAccount.fetch(treasuryPDA);
    console.log('👀 Deposit size', account.depositAmount.toString());

    assert(account.depositAmount.toNumber() === 0);
  });
});