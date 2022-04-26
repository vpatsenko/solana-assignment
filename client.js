const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;


async function main() {
	const programID = "Df4dFXdvoVW7RAdsnEwxSBT48j1Mh3CJTJWy4PKDJg9W"

	const idl = JSON.parse(
		require("fs").readFileSync("./target/idl/solana_assignment.json", "utf8")
	);

	// Address of the deployed program.
	const programId = new anchor.web3.PublicKey(programID);


	console.log(idl)
	const provider = anchor.AnchorProvider.local();
	anchor.setProvider(provider);

	const treasury = anchor.web3.Keypair.generate();
	const program = new anchor.Program(idl, programId);


	await program.rpc.create(
		provider.wallet.publicKey,
		{
			accounts: {
				treasury: treasury.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			signers: [treasury],
		}
	);

	let treasuryAccount = await program.account.treasury.fetch(treasury.publicKey);
	// console.log(treasuryAccount.deposit);
	// let deposit = treasuryAccount.deposit.toString();
	// console.log(deposit);



	// const accountTo = anchor.web3.Keypair.generate();

	// await program.rpc.sendSol(
	// 	provider.wallet.publicKey,
	// 	{
	// 		accounts: {
	// 			from: provider.wallet.publicKey,
	// 			to: accountTo.publicKey,
	// 			systemProgram: SystemProgram.programId,
	// 		},
	// 		signers: [provider.wallet.Keypair],
	// 		amount: 100
	// 	},

	// )
}


main()