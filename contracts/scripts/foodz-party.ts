import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { FoodzPartyV2__factory } from "./contracts";
import { deployer } from "./deploy";

export const setIsMigrationActive = async (isMigrationActive: boolean) => {
  const foodz = FoodzPartyV2__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsMigrationActive(isMigrationActive);
};

export const setIsSaleActive = async (isSaleActive: boolean) => {
  const foodz = FoodzPartyV2__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsSaleActive(isSaleActive);
};

export const setIsPassSaleActive = async (isPassSaleActive: boolean) => {
  const foodz = FoodzPartyV2__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsPassSaleActive(isPassSaleActive);
};

export const migrate = (caller: Wallet) => async (ids: string[]) => {
  const foodz = FoodzPartyV2__factory.connect(contractAddress.foodz, caller);
  await foodz.migrate(ids);
};
