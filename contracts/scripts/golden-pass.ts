import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { GoldenPass__factory } from "./contracts";
import { deployer } from "./deploy";

export const setIsSaleActive = async (isSaleActive: boolean) => {
  const golden = GoldenPass__factory.connect(contractAddress.golden, deployer);
  await golden.setIsSaleActive(isSaleActive);
};

export const mint =
  (caller: Wallet) => async (amount: number, nftIds: string[]) => {
    const golden = GoldenPass__factory.connect(contractAddress.golden, caller);
    await golden.mint(amount, nftIds);
  };

export const setFoodzPartyAsController = async () => {
  const golden = GoldenPass__factory.connect(contractAddress.golden, deployer);
  await golden.setIsController(contractAddress.foodz, true);
};
