import {
  StakedNft,
  UnstakedNft,
  UserClaimedRewards,
} from "../generated/OddworxStaking/OddworxStaking";
import {
  loadOrCreateContractStats,
  loadOrCreateNft,
  loadOrCreateUser,
} from "./common";

export function handleStake(event: StakedNft): void {
  const contractAddress = event.params.nftContract.toHexString().toLowerCase();
  let token = loadOrCreateNft(
    event.params.nftId,
    contractAddress,
    event.params.user.toHexString()
  );

  token.stakedAt = event.block.timestamp;
  token.rewardFrom = event.block.timestamp;
  token.save();

  let stats = loadOrCreateContractStats(contractAddress);
  stats.totalStaked++;
  stats.save();
}

export function handleUnstake(event: UnstakedNft): void {
  let token = loadOrCreateNft(
    event.params.nftId,
    event.params.nftContract.toHexString().toLowerCase(),
    event.params.user.toHexString()
  );

  token.stakedAt = null;
  token.latestUnstakedClaim = event.block.timestamp;
  token.rewardFrom = event.block.timestamp;
  token.save();

  let stats = loadOrCreateContractStats(
    event.params.nftContract.toHexString().toLowerCase()
  );
  stats.totalStaked--;
  stats.save();
}

export function handleClaim(event: UserClaimedRewards): void {
  let stats = loadOrCreateContractStats(
    event.params.nftContract.toHexString().toLowerCase()
  );
  stats.totalOddxClaimed = stats.totalOddxClaimed.plus(event.params.amount);
  stats.save();

  let user = loadOrCreateUser(event.params.user.toHexString());
  user.oddxClaimed = user.oddxClaimed.plus(event.params.amount);
  user.save();

  let token = loadOrCreateNft(
    event.params.nftId,
    event.params.nftContract.toHexString().toLowerCase(),
    event.params.user.toHexString()
  );
  token.oddxClaimed = token.oddxClaimed.plus(event.params.amount);
  if (!token.stakedAt) {
    token.latestUnstakedClaim = event.block.timestamp;
  } else {
    token.stakedAt = event.block.timestamp;
  }
  token.rewardFrom = event.block.timestamp;
  token.save();
}
