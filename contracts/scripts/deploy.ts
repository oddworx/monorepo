import { foodzPartyMerkletree, goldenPassMerkleTree } from "./common";
import {
  Genzee__factory,
  Oddworx__factory,
  OddworxStaking__factory,
  GoldenPass__factory,
  FoodzParty__factory,
  FoodzPartyV2__factory,
} from "./contracts";
import { wallets } from "./wallets";

export const deployer = wallets[0];

export const deployGenzee = async () => {
  const factory = new Genzee__factory(deployer);
  const tx = await factory.deploy(
    await deployer.getAddress(),
    await deployer.getAddress()
  );
  await tx.deployed();
  return tx.address;
};

export const deployOddworx = async (genzee: string) => {
  const factory = new Oddworx__factory(deployer);
  const tx = await factory.deploy(genzee);
  await tx.deployed();
  return tx.address;
};

export const deployOddworxStaking = async (oddworx: string) => {
  const factory = new OddworxStaking__factory(deployer);
  const tx = await factory.deploy(oddworx);
  await tx.deployed();
  return tx.address;
};

export const deployGoldenPass = async (staking: string, genzee: string) => {
  const merkleRoot = goldenPassMerkleTree().getHexRoot();
  const uri = "golden://";
  const factory = new GoldenPass__factory(deployer);
  const tx = await factory.deploy(staking, genzee, uri, merkleRoot);
  await tx.deployed();
  return tx.address;
};

export const deployFoodzPartyLegacy = async (goldenPass: string) => {
  const merkleRoot = foodzPartyMerkletree().getHexRoot();
  const uri = "foodz://";
  const factory = new FoodzParty__factory(deployer);
  const tx = await factory.deploy(
    goldenPass,
    uri,
    merkleRoot,
    await deployer.getAddress()
  );
  await tx.deployed();
  return tx.address;
};

export const deployFoodzParty = async (
  staking: string,
  goldenPass: string,
  foodzLegacy: string,
  genzee: string
) => {
  const baseUri = "foodzv2://";
  const factory = new FoodzPartyV2__factory(deployer);
  const tx = await factory.deploy(
    staking,
    goldenPass,
    foodzLegacy,
    genzee,
    baseUri
  );
  await tx.deployed();
  return tx.address;
};

export const deployAll = async () => {
  const genzee = await deployGenzee();
  console.log("Genzee deployed at", genzee);
  const oddworx = await deployOddworx(genzee);
  console.log("Oddworx deployed at", oddworx);
  const staking = await deployOddworxStaking(oddworx);
  console.log("OddworxStaking deployed at", staking);
  const golden = await deployGoldenPass(staking, genzee);
  console.log("GoldenPass deployed at", golden);
  const foodzLegacy = await deployFoodzPartyLegacy(golden);
  console.log("FoodzParty (Legacy) deployed at", foodzLegacy);
  const foodz = await deployFoodzParty(staking, golden, foodzLegacy, genzee);
  console.log("FoodzParty (V2) deployed at", foodz);
};
