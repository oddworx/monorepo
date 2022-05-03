import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { OddworxStaking__factory } from "./contracts";
import { deployer } from "./deploy";

export const setupGenzees = async () => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    deployer
  );
  await oddworx.toggleNftInterface(contractAddress.genzee);
};

export const toggleGoldenPass = async () => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    deployer
  );
  await oddworx.toggleAdmin(contractAddress.golden);
};

export const toggleFoodz = async () => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    deployer
  );
  await oddworx.toggleAdmin(contractAddress.foodz);
};

export const stakeGenzees = (caller: Wallet) => async (ids: string[]) => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    caller
  );
  await oddworx.stakeNfts(contractAddress.genzee, ids);
};

export const unstakeGenzees = (caller: Wallet) => async (ids: string[]) => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    caller
  );
  await oddworx.unstakeNfts(contractAddress.genzee, ids);
};
