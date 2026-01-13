import { useWallet as useWalletAdapter } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function useWallet() {
  const wallet = useWalletAdapter();
  const { connection } = useConnection();

  // Fetch SOL balance
  const { data: balance, ...balanceQuery } = useQuery({
    queryKey: ["wallet-balance", wallet.publicKey?.toString()],
    queryFn: async () => {
      if (!wallet.publicKey) return 0;
      const balance = await connection.getBalance(wallet.publicKey);
      return balance / LAMPORTS_PER_SOL;
    },
    enabled: !!wallet.publicKey,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return "...";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return {
    walletAddress: wallet.publicKey?.toString() ?? null,
    isConnecting: wallet.connecting,
    balance: balance ?? 0,
    isLoadingBalance: balanceQuery.isLoading,
    formatAddress,
    isConnected: !!wallet.publicKey && wallet.connected,
    connect: async () => {
      try {
        await wallet.connect();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    },
    disconnect: async () => {
      try {
        await wallet.disconnect();
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    },
    // Expose stakedBalance for compatibility (will be calculated in useStaking)
    stakedBalance: 0,
  };
}
