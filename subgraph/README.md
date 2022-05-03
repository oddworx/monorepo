# Oddworx Subgraph

You can use this subgraph to query all kinds of information about Oddworx projects. Some of the projects covered in this graph is Genzee, Oddx Token and other NFTs created by Alex Solis and Naolito on nifty gateway.

### Playground

https://thegraph.com/hosted-service/subgraph/alephao/genzee

### Contributing

Everyone is welcome to contribute. Here are some ways you can contribute:

- Report a bug
- Fix a bug
- Enhance docs
- Answer other people's questions on open issues

### Building the project

```console
npm install
npm run codegen
npm run build
```

### Running a local graph-node

1. Start a local chain by following instructions in [https://github.com/oddworx/contracts-flatten]
2. Clone this repo and run `docker compose up`
3. Run `yarn create:local` and `yarn deploy:local`

### Deploying

```console
npm run deploy
```

### License

[MIT](LICENSE)
