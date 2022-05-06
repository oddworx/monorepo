import axios from "axios";
import { execSync } from "child_process";
import { ethers } from "ethers";

const sleep = async (ms: number) => new Promise((res) => setTimeout(res, ms));

const restartDocker = () => {
  console.log(execSync("docker compose down", { encoding: "utf-8" }));
  console.log(execSync("rm -fr docker-data", { encoding: "utf-8" }));
  console.log(execSync("docker compose up -d", { encoding: "utf-8" }));
};

const deployContracts = () => {
  console.log("Deploying contracts...");
  console.log(execSync("cd contracts && yarn setup", { encoding: "utf-8" }));
};

const deploySubgraph = async () => {
  console.log("Creating subgraph...");
  try {
    console.log(
      execSync("cd subgraph && yarn create:local", { encoding: "utf-8" })
    );
  } catch (err) {
    console.log("Error when creating subgraph", err);
  }
  await sleep(5000);
  try {
    console.log("Deploying subgraph...");
    console.log(
      execSync("cd subgraph && yarn deploy:local", { encoding: "utf-8" })
    );
  } catch (err) {
    console.log("Error when deploying subgraph", err);
  }
};

const waitUntilLocalChainIsReady = async () => {
  let chainOn = false;
  while (!chainOn) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );
      const balance = await provider.getBalance(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        "latest"
      );
      const eth = parseInt(ethers.utils.formatEther(balance));
      if (eth === 10000) {
        console.log("Chain ready");
        chainOn = true;
      } else {
        console.log("Almost there", eth);
        await sleep(1500);
      }
    } catch {
      console.log("Chain not connected");
      await sleep(5000);
    }
  }
};

const waitUntilGraphNodeIsReady = async () => {
  let nodeOn = false;
  while (!nodeOn) {
    try {
      const res = await axios.options("http://localhost:8020");
      console.log("Graph node ready");
      nodeOn = true;
    } catch {
      console.log("Graph Node not ready");
      await sleep(5000);
    }
  }
};

const main = async () => {
  restartDocker();
  await waitUntilLocalChainIsReady();
  deployContracts();
  await waitUntilGraphNodeIsReady();
  await deploySubgraph();
};

main();
