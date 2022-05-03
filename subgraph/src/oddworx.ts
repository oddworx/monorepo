import {
  Transfer,
  StakedNft,
  UnstakedNft,
  UserClaimedNftRewards,
} from "../generated/Oddworx/Oddworx";
import {
  blackhole,
  contractAddresses,
  loadOrCreateContractStats,
  loadOrCreateNft,
  loadOrCreateUser,
} from "./common";

export function handleTransfer(event: Transfer): void {
  let userTo = loadOrCreateUser(event.params.to.toHexString());
  userTo.oddxBalance = userTo.oddxBalance.plus(event.params.amount);
  userTo.save();

  if (event.params.from.toHexString() == blackhole) {
    return;
  }

  let userFrom = loadOrCreateUser(event.params.from.toHexString());
  userFrom.oddxBalance = userFrom.oddxBalance.minus(event.params.amount);
  userFrom.save();
}

export function handleStake(event: StakedNft): void {
  const addresses = contractAddresses();
  let token = loadOrCreateNft(
    event.params.genzee,
    addresses.genzee,
    event.params.user.toHexString()
  );

  token.legacyStake = true;
  token.stakedAt = event.block.timestamp;
  token.save();

  let stats = loadOrCreateContractStats(addresses.genzee);
  stats.totalStaked++;
  stats.save();
}

export function handleUnstake(event: UnstakedNft): void {
  const addresses = contractAddresses();
  let token = loadOrCreateNft(
    event.params.genzee,
    addresses.genzee,
    event.params.user.toHexString()
  );

  token.stakedAt = null;
  token.legacyStake = false;
  token.latestUnstakedClaim = event.block.timestamp;
  token.save();

  let stats = loadOrCreateContractStats(addresses.genzee);
  stats.totalStaked--;
  stats.save();
}

export function handleClaim(event: UserClaimedNftRewards): void {
  const addresses = contractAddresses();
  let stats = loadOrCreateContractStats(addresses.genzee);
  stats.totalOddxClaimed = stats.totalOddxClaimed.plus(event.params.amount);
  stats.save();

  let user = loadOrCreateUser(event.params.user.toHexString());
  user.oddxClaimed = user.oddxClaimed.plus(event.params.amount);
  user.save();

  let token = loadOrCreateNft(
    event.params.genzee,
    addresses.genzee,
    event.params.user.toHexString()
  );
  token.oddxClaimed = token.oddxClaimed.plus(event.params.amount);
  if (!token.stakedAt) {
    token.latestUnstakedClaim = event.block.timestamp;
  } else {
    token.stakedAt = event.block.timestamp;
  }
  token.save();
}
