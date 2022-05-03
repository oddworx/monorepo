import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { Genzee__factory } from "./contracts";
import { deployer } from "./deploy";

export const startSale = async () => {
  const genzee = Genzee__factory.connect(contractAddress.genzee, deployer);
  await genzee.startSale(await genzee.TOTAL_TOKENS());
};

export const mint = (caller: Wallet) => async (amount: number) => {
  const genzee = Genzee__factory.connect(contractAddress.genzee, caller);
  const unitPrice = await genzee.unitPrice();
  const tripleUnitPrice = (await genzee.tripleUnitPrice()).mul(3);

  const howManyTrios = Math.floor(amount / 3);
  const howManyUnits = amount - howManyTrios * 3;

  // This is too slow, enhance!
  for (let i = 0; i < howManyTrios; i++) {
    await genzee.mintThreeGenzee({ value: tripleUnitPrice });
  }

  for (let i = 0; i < howManyUnits; i++) {
    await genzee.mintOneGenzee({ value: unitPrice });
  }
};

export const setApproveForAll =
  (caller: Wallet) => async (operator: string) => {
    const genzee = Genzee__factory.connect(contractAddress.genzee, caller);
    await genzee.setApprovalForAll(operator, true);
  };
