/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      loggingEnabled: true,
      chainId: 1337
    }
  }
};
