import { Transfer } from "../generated/Genzee/Genzee";
import {
  blackhole,
  contractAddresses,
  loadOrCreateContractStats,
  loadOrCreateNft,
  loadOrCreateUser,
} from "./common";

const ignoreTransfer: (event: Transfer) => bool = (event) => {
  const addresses = contractAddresses();
  return (
    event.params.from.toHexString() == addresses.oddx ||
    event.params.from.toHexString() == addresses.staking ||
    event.params.to.toHexString() == addresses.oddx ||
    event.params.to.toHexString() == addresses.staking
  );
};

export function handleTransfer(event: Transfer): void {
  // Skip this fn if transfering from or to ODDX.
  // This means it's unstaking or staking which is handled on oddworx.ts
  if (ignoreTransfer(event)) {
    return;
  }
  const addresses = contractAddresses();
  let token = loadOrCreateNft(
    event.params.tokenId,
    addresses.genzee,
    event.params.to.toHexString()
  );
  token.owner = event.params.to.toHexString();
  token.save();
  let stats = loadOrCreateContractStats(addresses.genzee);
  let userTo = loadOrCreateUser(event.params.to.toHexString());
  if (userTo.genzeeBalance == 0) {
    stats.totalOwners++;
    stats.save();
  }
  userTo.genzeeBalance++;
  userTo.save();
  if (event.params.from.toHexString() == blackhole) {
    return;
  }
  let userFrom = loadOrCreateUser(event.params.from.toHexString());
  userFrom.genzeeBalance--;
  if (userFrom.genzeeBalance == 0) {
    stats.totalOwners--;
    stats.save();
  }
  userFrom.save();
}
