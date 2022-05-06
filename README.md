# Oddworx Monorepo

* [contracts](contracts) - All flattened contracts used in the Oddworx world. Contracts are added here after they're deployed.
* [subgraph](subgraph) - The subgraph that indexes events from all contracts in the Oddworx world and it's used on our websites and discord bots.

### How to use this repo

There are two reasons for using this repo.

1. You are developing a new contract that will interact with Oddworx contracts.

If you want to deploy a contract that interacts with Oddworx contracts, you should use the flattened contracts inside the `contracts/contracts` directory,

2. You are developing something that will use the Oddworx subgraph.

To make development easier, you can spin up a local chain and local subgraph with all Oddworx contracts setup by cloning this repo and running `yarn start`.

Local chain RPC url: `http://localhost:8545`
Subgraph's GraphiQL interface: `http://localhost:8000/subgraphs/name/alephao/Genzee/graphql`
Subgraph GraphQL endpoint: `http://localhost:8000/subgraphs/name/alephao/Genzee`

### How the setup of development env works

The [start.ts](start.ts) script run a bunch of commands to setup the environment.

1. Starts the docker containers specified on [docker-compose.yml](docker-compose.yml) by running `docker compose up`. That's a local chain, an ipfs node, a postgres database, and a graph node. 
2. Wait for the local chain to become a vailable by trying to get the balance of an account. We know the chain is up when the request is successful.
3. Once the chain is up, delpoy the contracts by running `yarn setup` in the [`contracts/`](contracts) directory.
4. Wait for the graph-node to be up. We do this by making an OPTION request to the graph-node until it stops failing.
5. Once graph-node is up, we create and deploy the subgraph by running `yarn create:local` and `yarn create:local` in the [`subgraph/`](subgraph) directory.