import { execSync } from "child_process";

const stopDocker = () => {
  console.log(execSync("docker compose down", { encoding: "utf-8" }));
  console.log(execSync("rm -fr docker-data", { encoding: "utf-8" }));
};

const main = async () => {
  stopDocker();
};

main();
