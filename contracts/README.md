# Oddworx Contracts Flatten

Repo containing all the flattened contracts of Oddworx.

## Why

Two reasons: 

* unit-testing in other projects
* easy setup up of test chain with all contracts

**Unit Testing**

We want to be able to import the original contract code for writing tests, but some contracts are in a hardhat project, some in a foundry project. It's not trivial to import contracts that are in hardhat project into a foundry project because it can't solve all the dependencies.

This repo solves this part by having all the flattened contracts, then in a foundry project, we can import the contracts by adding this repo to a submodule, updating `requirements.tx` and importing it.

E.g.:

requirements.txt:

```txt
@oddworx/=lib/contracts-flatten/contracts/
```

MyContract.t.sol:
```solidity
import { Genzee } from "@oddworx/Genzee.sol"
import { Oddworx } from "@oddworx/Oddworx.sol"
import { OddworxStaking } from "@oddworx/OddworxStaking.sol"
```

**User Interface**

When building a user interface, we want to be able to test it agains a real blockchain. So far we've been using rinkeby testnet, but it's something really painful to setup and we can't really manipulate it to have a specific state we want to test. This is a recurring problem for Oddworx because we keep building, migrating contracts, and using the old contracts with the new ones.

In this repo we have everything we need to spin up a new chain and setup the specific state we want for the Oddworx/Genzee world.

### Spinning up a test chain

First start the hardhat network by running `anvil`

Then, edit [`setup.ts`](setup.ts) to mock the state you want for the chain. You'll have to explore the files inside the `scripts/` folder to find out what functions are available to setup the environment. The `setup.ts` file already has an example setup.

On your browser wallet, add the local chain `http://localhost:8545` and the wallets you want to use for testing. You can find the wallets used in this test environment in the file [`wallets.ts`](scripts/wallets.ts). You might want to setup at least the first three:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```