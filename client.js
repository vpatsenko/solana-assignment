const anchor = require('@project-serum/anchor');
const web3js = require('@solana/web3.js');
const { SystemProgram } = anchor.web3;

const pdaInited = true

const main = async () => {
	console.log("🚀 Starting test...")

	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);

	const program = anchor.workspace.Myepicproject;


	const [baseAccPDA, _] = await web3js.PublicKey
		.findProgramAddress(
			[
				anchor.utils.bytes.utf8.encode("base_account"),
			],
			program.programId
		);

	console.log("baseAccPDA: \n\n\n", baseAccPDA, "\n\n")

	if (!pdaInited) {
		console.log("🚀 Creating base account and initializing pda...")

		let tx = await program.methods.startStuffOff().accounts({
			user: provider.wallet.publicKey,
			baseAccount: baseAccPDA,
		}).rpc();
		console.log("📝 Your transaction signature", tx);

	}

	// Fetch data from the account.
	let account = await program.account.baseAccount.fetch(baseAccPDA);
	console.log('👀 GIF Count', account.totalGifs.toString())

	const link = "https://cdn.fishki.net/upload/post/2016/12/29/2178292/ruchnoj-ezhik-foto.jpg";
	let tx = await program.rpc.addGif(link, {
		accounts: {
			baseAccount: baseAccPDA,
			user: provider.wallet.publicKey,
		}
	});

	console.log("📝 Your transaction signature from addGif", tx);


	account = await program.account.baseAccount.fetch(baseAccPDA);
	console.log('👀 GIF Count', account.totalGifs.toString());
	console.log("GIF List", account.gifList);
}

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
