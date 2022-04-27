
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAssignment } from "../target/types/solana_assignment";
import * as web3js from "@solana/web3.js";

describe("solana-assignment", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaAssignment as Program<SolanaAssignment>;

  // !!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!! make fase if running for the first time
  // !!!!!!!!!!!!!!!!!!!!!!!
  const isPDAInited: boolean = false;


  it("Is initialized!", async () => {

    console.log("programId: ", program.programId);

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

  });
});