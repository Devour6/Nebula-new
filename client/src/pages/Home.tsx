import { useState, useEffect, useCallback } from "react";
import { StarField } from "@/components/StarField";
import { Planet3D } from "@/components/Planet3D";
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

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
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

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarField mousePosition={mousePosition} />
      
      <Header
        walletAddress={walletAddress}
        onConnect={connect}
        onDisconnect={disconnect}
        isConnecting={isConnecting}
      />

      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-6xl mx-auto px-8">
          <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
            <Planet3D
              type="stake"
              label="Stake"
              size={280}
              onClick={() => handlePlanetClick("stake")}
              mousePosition={mousePosition}
              delay={0}
            />
          </div>

          <div className="absolute left-[45%] top-[30%] -translate-x-1/2">
            <Planet3D
              type="unstake"
              label="Unstake"
              size={200}
              onClick={() => handlePlanetClick("unstake")}
              mousePosition={mousePosition}
              delay={0.1}
            />
          </div>

          <div className="absolute right-[10%] bottom-[15%]">
            <Planet3D
              type="security"
              label="Security"
              size={120}
              onClick={() => handlePlanetClick("security")}
              mousePosition={mousePosition}
              delay={0.2}
            />
          </div>

          <div className="absolute right-[25%] top-[20%]">
            <Planet3D
              type="tools"
              label="Tools"
              size={100}
              onClick={() => handlePlanetClick("tools")}
              mousePosition={mousePosition}
              delay={0.3}
            />
          </div>
        </div>
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
