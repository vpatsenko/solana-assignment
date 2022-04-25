const anchor = require('@project-serum/anchor');
// const fs = require('fs');


// anchor.setProvider(anchor.AnchorProvider.local());

// const { SystemProgram } = anchor.web3;
async function main() {
	const programID = "Df4dFXdvoVW7RAdsnEwxSBT48j1Mh3CJTJWy4PKDJg9W"

	const idl = JSON.parse(
		require("fs").readFileSync("./target/idl/solana_assignment.json", "utf8")
	);

	// Address of the deployed program.
	const programId = new anchor.web3.PublicKey(programID);

	// Generate the program client from IDL.

	const provider = anchor.AnchorProvider.local();
	// const provider = anchor.AnchorProvider.env();
	console.log(provider);

	// const program = new anchor.Program(idl, programId);

	// Execute the RPC.
	// await program.rpc.initialize();



}


main().then(
	console.log("success"),
)