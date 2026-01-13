import { useState, useEffect, useCallback, useMemo } from "react";
import { StarField } from "@/components/StarField";
import { Planet } from "@/components/Planet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StakeModal } from "@/components/StakeModal";
import { UnstakeModal } from "@/components/UnstakeModal";
import { SecurityModal } from "@/components/SecurityModal";
import { ToolsDropdown } from "@/components/ToolsDropdown";
import { useWallet } from "@/hooks/useWallet";
import { useStaking } from "@/hooks/useStaking";
import { useToast } from "@/hooks/use-toast";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type ModalType = "stake" | "unstake" | "security" | "tools" | null;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { width } = useWindowSize();
  
  const { walletAddress, isConnecting, balance, connect, disconnect, isConnected } = useWallet();
  const { 
    stake, 
    unstake, 
    isStaking, 
    isUnstaking, 
    totalStaked,
    stakeAccounts,
    refetchStakeAccounts 
  } = useStaking();
  const { toast } = useToast();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handlePlanetClick = (type: "stake" | "unstake" | "security" | "tools") => {
    setActiveModal(type);
  };

  // Calculate available balance (wallet balance - rent if no stake accounts)
  const availableBalance = useMemo(() => {
    if (!isConnected) return 0;
    // If user has no stake accounts, reserve rent for new account (~2.28 SOL)
    const rentReserve = stakeAccounts.length === 0 ? 2.28 : 0;
    return Math.max(0, balance - rentReserve);
  }, [balance, isConnected, stakeAccounts.length]);

  const handleStake = async (amount: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to stake.",
      });
      return;
    }
    const signature = await stake(amount);
    if (signature) {
      refetchStakeAccounts();
    }
  };

  const handleUnstake = async (amount: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to unstake.",
      });
      return;
    }

    const amountNum = parseFloat(amount.toString());
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to unstake.",
        variant: "destructive",
      });
      return;
    }

    // Find a stake account to unstake from
    const amountLamports = amountNum * LAMPORTS_PER_SOL;
    const accountToUnstake = stakeAccounts.find(
      (acc) => acc.lamports >= amountLamports && acc.isActive
    );

    if (!accountToUnstake) {
      // If no single account has enough, unstake from the largest active one
      const largestAccount = stakeAccounts
        .filter((acc) => acc.isActive)
        .sort((a, b) => b.lamports - a.lamports)[0];

      if (largestAccount) {
        const signature = await unstake(largestAccount.pubkey);
        if (signature) {
          refetchStakeAccounts();
        }
      } else {
        toast({
          title: "No active stake accounts",
          description: "You don't have any active stake accounts to unstake from.",
          variant: "destructive",
        });
      }
    } else {
      const signature = await unstake(accountToUnstake.pubkey);
      if (signature) {
        refetchStakeAccounts();
      }
    }
  };

  const closeModal = () => setActiveModal(null);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const getPlanetSize = (baseSize: number) => {
    if (isMobile) return Math.round(baseSize * 0.5);
    if (isTablet) return Math.round(baseSize * 0.7);
    return baseSize;
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <StarField mousePosition={mousePosition} />
      
      <Header
        walletAddress={walletAddress}
        onConnect={connect}
        onDisconnect={disconnect}
        isConnecting={isConnecting}
      />

      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8">
        {isMobile ? (
          <div className="grid grid-cols-2 gap-6 py-20">
            <div className="flex justify-center">
              <Planet
                type="stake"
                label="Stake"
                size={getPlanetSize(280)}
                onClick={() => handlePlanetClick("stake")}
                mousePosition={mousePosition}
                delay={0}
              />
            </div>
            <div className="flex justify-center">
              <Planet
                type="unstake"
                label="Unstake"
                size={getPlanetSize(200)}
                onClick={() => handlePlanetClick("unstake")}
                mousePosition={mousePosition}
                delay={0.1}
              />
            </div>
            <div className="flex justify-center">
              <Planet
                type="security"
                label="Security"
                size={getPlanetSize(140)}
                onClick={() => handlePlanetClick("security")}
                mousePosition={mousePosition}
                delay={0.2}
              />
            </div>
            <div className="flex justify-center">
              <Planet
                type="tools"
                label="Tools"
                size={getPlanetSize(110)}
                onClick={() => handlePlanetClick("tools")}
                mousePosition={mousePosition}
                delay={0.3}
              />
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl mx-auto" style={{ height: "80vh" }}>
            <div className="absolute left-[2%] top-[55%] -translate-y-1/2">
              <Planet
                type="stake"
                label="Stake"
                size={getPlanetSize(260)}
                onClick={() => handlePlanetClick("stake")}
                mousePosition={mousePosition}
                delay={0}
              />
            </div>

            <div className="absolute left-[35%] top-[15%]">
              <Planet
                type="unstake"
                label="Unstake"
                size={getPlanetSize(180)}
                onClick={() => handlePlanetClick("unstake")}
                mousePosition={mousePosition}
                delay={0.1}
              />
            </div>

            <div className="absolute right-[5%] bottom-[25%]">
              <Planet
                type="security"
                label="Security"
                size={getPlanetSize(130)}
                onClick={() => handlePlanetClick("security")}
                mousePosition={mousePosition}
                delay={0.2}
              />
            </div>

            <div className="absolute right-[30%] top-[8%]">
              <Planet
                type="tools"
                label="Tools"
                size={getPlanetSize(100)}
                onClick={() => handlePlanetClick("tools")}
                mousePosition={mousePosition}
                delay={0.3}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />

      <StakeModal
        isOpen={activeModal === "stake"}
        onClose={closeModal}
        availableBalance={availableBalance}
        onStake={handleStake}
        isStaking={isStaking}
        isConnected={isConnected}
        onConnect={connect}
      />

      <UnstakeModal
        isOpen={activeModal === "unstake"}
        onClose={closeModal}
        stakedBalance={totalStaked}
        onUnstake={handleUnstake}
        isUnstaking={isUnstaking}
        isConnected={isConnected}
        onConnect={connect}
      />

      <SecurityModal
        isOpen={activeModal === "security"}
        onClose={closeModal}
      />

      <ToolsDropdown
        isOpen={activeModal === "tools"}
        onClose={closeModal}
      />
    </div>
  );
}
