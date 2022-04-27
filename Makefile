.PHONY: generate-bob-key
generate-alice-key:
	solana-keygen new -o keypairs/bob.json --force

.PHONY: generate-alice-key
generate-alice-key:
	solana-keygen new -o keypairs/alice.json --force

.PHONY: airdrop-alice
airdrop-alice:
	solana airdrop -k keypairs/alice.json 50

.PHONY: airdrop-bob
airdrop-bob:
	solana airdrop -k keypairs/bob.json 50