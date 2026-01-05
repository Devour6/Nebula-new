export const VALIDATOR_CONFIG = {
  name: "Nebula Node",
  identityPubkey: "nebu15XQKGpxzhhckADBX9PgvGN5qk9RRJCFLKc118w",
  votePubkey: "nebu1WnZBrFZz5X7sfPWuEqyb8LBSsrXpxaesnK9CRE",
  website: "https://nebulanode.io",
};

export const SOLANA_NETWORK = "mainnet-beta";

export function truncateAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatSOL(lamports: number): string {
  return (lamports / 1e9).toFixed(2);
}

export function getNextEpochDate(): Date {
  const now = new Date();
  const nextEpoch = new Date(now);
  nextEpoch.setDate(nextEpoch.getDate() + 1);
  nextEpoch.setHours(18, 26, 16, 0);
  return nextEpoch;
}

export function formatEpochDate(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
