# Oddworx Monorepo

WIP...

* [contracts](contracts) - All flattened contracts used in the Oddworx world. Contracts are added here after they're deployed.
* [subgraph](subgraph) - The subgraph that indexes events from all contracts in the Oddworx world and it's used on our websites and discord bots.

### Setup Dev Enviroment

```
docker compose up
```

This will:

- Spin up a local chain on `localhost:8545`
- Deploy all Oddworx contracts
- Start a graph node on `localhost:8020`
- Deploy the oddworx subgraph to the local node