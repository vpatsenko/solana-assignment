import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAssignment } from "../target/types/solana_assignment";
import fs from 'fs';

describe("solana-assignment", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaAssignment as Program<SolanaAssignment>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});


(async () => {

  const idl = JSON.parse(fs.readFileSync('./target/types/solana_assignment.idl').toString());
  console.log(idl)


})()