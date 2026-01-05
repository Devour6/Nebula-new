import { useState, useEffect, useCallback } from "react";
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
  
  const { walletAddress, isConnecting, balance, stakedBalance, connect, disconnect, isConnected } = useWallet();
  const { stake, unstake, isStaking, isUnstaking } = useStaking();
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

  const handleStake = async (amount: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to stake.",
      });
      return;
    }
    await stake(amount);
  };

  const handleUnstake = async (amount: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to unstake.",
      });
      return;
    }
    await unstake(amount);
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
          <div className="relative w-full max-w-6xl mx-auto" style={{ height: "70vh" }}>
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
              <Planet
                type="stake"
                label="Stake"
                size={getPlanetSize(280)}
                onClick={() => handlePlanetClick("stake")}
                mousePosition={mousePosition}
                delay={0}
              />
            </div>

            <div className="absolute left-[40%] top-[25%] -translate-x-1/2">
              <Planet
                type="unstake"
                label="Unstake"
                size={getPlanetSize(200)}
                onClick={() => handlePlanetClick("unstake")}
                mousePosition={mousePosition}
                delay={0.1}
              />
            </div>

            <div className="absolute right-[8%] bottom-[20%]">
              <Planet
                type="security"
                label="Security"
                size={getPlanetSize(140)}
                onClick={() => handlePlanetClick("security")}
                mousePosition={mousePosition}
                delay={0.2}
              />
            </div>

            <div className="absolute right-[20%] top-[15%]">
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
        )}
      </main>

      <Footer />

      <StakeModal
        isOpen={activeModal === "stake"}
        onClose={closeModal}
        availableBalance={isConnected ? balance : 0}
        onStake={handleStake}
        isStaking={isStaking}
        isConnected={isConnected}
        onConnect={connect}
      />

      <UnstakeModal
        isOpen={activeModal === "unstake"}
        onClose={closeModal}
        stakedBalance={isConnected ? stakedBalance : 0}
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
