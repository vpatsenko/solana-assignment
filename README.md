# Solana test assignment


To use default wallet run before running client.js
``` bash
export ANCHOR_WALLET=~/.config/solana/id.json
```

## How to change programID

Make sure to delete all target folders

``` bash
anchor build
solana address -k target/deploy/myepicproject-keypair.json
anchor build
anchor test
```