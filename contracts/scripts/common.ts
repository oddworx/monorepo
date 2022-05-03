import { ethers } from "ethers";
import MerkleTree from "merkletreejs";
import { wallets } from "./wallets";

// Addresses if we use the `deployAll` function
// they should always be the same
export const contractAddress = {
  genzee: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  oddworx: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  staking: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  golden: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  foodzLegacy: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  foodz: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
};

export const provider = new ethers.providers.StaticJsonRpcProvider(
  "http://localhost:8545"
);

export const goldenPassMerkleTree = () => {
  const keccak256 = ethers.utils.keccak256;
  const toUtf8Bytes = ethers.utils.toUtf8Bytes;

  const leavesUnhashed = wallets.slice(5).map(({ address }) => {
    return `${address.toLowerCase()}:10`;
  });

  const leaves = leavesUnhashed.map((x) => keccak256(toUtf8Bytes(x)));
  const tree = new MerkleTree(leaves, keccak256, {
    sortLeaves: true,
    sortPairs: true,
    hashLeaves: false,
  });

  return tree;
};

export const foodzPartyMerkletree = goldenPassMerkleTree;
