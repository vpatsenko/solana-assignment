
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAssignment } from "../target/types/solana_assignment";
import * as web3js from "@solana/web3.js";

describe("solana-assignment", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaAssignment as Program<SolanaAssignment>;
  const isPDAInited: boolean = false;

  console.log(provider.wallet)
  console.log(provider)
  console.log(provider.wallet.publicKey)

  it("Is initialized!", async () => {
    const [treasuryPDA, bump] = await web3js.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("treasury-account")], program.programId);


    console.log("programId: ", program.programId);

    if (!isPDAInited) {
      console.log("🚀 Creating base account and initializing pda...")
      let tx = await program.methods.initializeTreasury().accounts({
        user: provider.wallet.publicKey,
        treasury: treasuryPDA,
      }).rpc();
      console.log("📝 Your transaction signature", tx);
    }


    // const [userStatsPDA, _] = await PublicKey
    //   .findProgramAddress(
    //     [
    //       anchor.utils.bytes.utf8.encode("user-stats"),
    //       provider.wallet.publicKey.toBuffer()
    //     ],
    //     program.programId
    //   );






    // const [baseAccPDA, _] = await web3js.PublicKey
    //   .findProgramAddress(
    //     [
    //       anchor.utils.bytes.utf8.encode("base_account"),
    //     ],
    //     program.programId
    //   );

    // console.log("baseAccPDA: \n\n\n", baseAccPDA, "\n\n")

    // console.log("🚀 Creating base account and initializing pda...")

    // let tx = await program.methods.startStuffOff().accounts({
    //   user: provider.wallet.publicKey,
    //   baseAccount: baseAccPDA,
    // }).rpc();
    // console.log("📝 Your transaction signature", tx);





    // program.metho

  });

  // "instructions": [
  //   {
  //     "name": "initializeTreasury",
  //     "accounts": [
  //       {
  //         "name": "treasury",
  //         "isMut": true,
  //         "isSigner": false
  //       },
  //       {
  //         "name": "user",
  //         "isMut": true,
  //         "isSigner": true
  //       },
  //       {
  //         "name": "systemProgram",
  //         "isMut": false,
  //         "isSigner": false
  //       }
  //     ],
  //     "args": []
  //   }
  // ],



  //   if (!pdaInited) {
  //     console.log("🚀 Creating base account and initializing pda...")

  //     let tx = await program.methods.startStuffOff().accounts({
  //       user: provider.wallet.publicKey,
  //       baseAccount: baseAccPDA,
  //     }).rpc();
  //     console.log("📝 Your transaction signature", tx);

  //   }

  //   // Fetch data from the account.
  //   let account = await program.account.baseAccount.fetch(baseAccPDA);
  //   console.log('👀 GIF Count', account.totalGifs.toString())

  //   const link = "https://cdn.fishki.net/upload/post/2016/12/29/2178292/ruchnoj-ezhik-foto.jpg";
  //   let tx = await program.rpc.addGif(link, {
  //     accounts: {
  //       baseAccount: baseAccPDA,
  //       user: provider.wallet.publicKey,
  //     }
  //   });

  //   console.log("📝 Your transaction signature from addGif", tx);


  //   account = await program.account.baseAccount.fetch(baseAccPDA);
  //   console.log('👀 GIF Count', account.totalGifs.toString());
  //   console.log("GIF List", account.gifList);
  // }

  // const runMain = async () => {
  //   try {
  //     await main();
  //     process.exit(0);
  //   } catch (error) {
  //     console.error(error);
  //     process.exit(1);
  //   }
  // };

  // runMain();

});






