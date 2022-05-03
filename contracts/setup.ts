import { wallets } from "./scripts/wallets";
import { deployAll } from "./scripts/deploy";
import * as Genzee from "./scripts/genzee";
import * as Oddworx from "./scripts/oddworx";
import * as OddworxStaking from "./scripts/oddworx-staking";
import * as GoldenPass from "./scripts/golden-pass";
import * as FoodzPartyLegacy from "./scripts/foodz-party-legacy";
import * as FoodzParty from "./scripts/foodz-party";
import { contractAddress } from "./scripts/common";
import { parseEther } from "ethers/lib/utils";

const main = async () => {
  await deployAll();

  await Genzee.startSale();
  await Genzee.mint(wallets[1])(20);
  await Genzee.setApproveForAll(wallets[1])(contractAddress.staking);

  await Oddworx.toggleAdmin(contractAddress.staking);
  await Oddworx.mint(wallets[1].address, parseEther("1000000"));

  await OddworxStaking.setupGenzees();
  await OddworxStaking.toggleGoldenPass();
  await OddworxStaking.toggleFoodz();
  await OddworxStaking.stakeGenzees(wallets[1])(["1", "2", "3"]);

  await GoldenPass.setFoodzPartyAsController();
  await GoldenPass.setIsSaleActive(true);
  await GoldenPass.mint(wallets[1])(1, []);
  await GoldenPass.mint(wallets[1])(1, []);
  await GoldenPass.mint(wallets[1])(1, []);
  await GoldenPass.mint(wallets[1])(1, []);
  await GoldenPass.mint(wallets[1])(1, []);

  await FoodzPartyLegacy.setIsSaleActive(true);
  await FoodzPartyLegacy.setIsPresaleActive(true);

  await FoodzParty.setIsMigrationActive(true)
  await FoodzParty.setIsSaleActive(true)
  await FoodzParty.setIsPassSaleActive(true)
};

main();
