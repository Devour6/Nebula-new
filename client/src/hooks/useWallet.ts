import { useState, useCallback, useEffect } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);

  const getProvider = (): PhantomProvider | null => {
    if (typeof window !== "undefined" && window.solana?.isPhantom) {
      return window.solana;
    }
    return null;
  };

  const fetchBalance = useCallback(async (address: string) => {
    try {
      const connection = new Connection(SOLANA_RPC);
      const publicKey = new PublicKey(address);
      const balanceLamports = await connection.getBalance(publicKey);
      setBalance(balanceLamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance(0);
    }
  }, []);

  const connect = useCallback(async () => {
    const provider = getProvider();
    
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const response = await provider.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);
      await fetchBalance(address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance]);

  const disconnect = useCallback(async () => {
    const provider = getProvider();
    
    if (provider) {
      try {
        await provider.disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    }
    
    setWalletAddress(null);
    setBalance(0);
    setStakedBalance(0);
  }, []);

  useEffect(() => {
    const provider = getProvider();
    if (provider && provider.isConnected && provider.publicKey) {
      const address = provider.publicKey.toString();
      setWalletAddress(address);
      fetchBalance(address);
    }
  }, [fetchBalance]);

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    const handleConnect = (publicKey: PublicKey) => {
      const address = publicKey.toString();
      setWalletAddress(address);
      fetchBalance(address);
    };

    const handleDisconnect = () => {
      setWalletAddress(null);
      setBalance(0);
      setStakedBalance(0);
    };

    provider.on("connect", handleConnect as unknown as (...args: unknown[]) => void);
    provider.on("disconnect", handleDisconnect);

    return () => {
      provider.off("connect", handleConnect as unknown as (...args: unknown[]) => void);
      provider.off("disconnect", handleDisconnect);
    };
  }, [fetchBalance]);

  return {
    walletAddress,
    isConnecting,
    balance,
    stakedBalance,
    connect,
    disconnect,
    isConnected: !!walletAddress,
  };
}
