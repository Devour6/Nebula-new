import { motion } from "framer-motion";
import { WalletButton } from "./WalletButton";
import logoImage from "@assets/NEBULA_NODE_PFP_1767654488471.png";

interface HeaderProps {
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

export function Header({ walletAddress, onConnect, onDisconnect, isConnecting }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center gap-3" data-testid="logo">
        <img 
          src={logoImage} 
          alt="Nebula Node" 
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg sm:text-xl tracking-[0.3em] leading-none">
            NEBULA
          </span>
          <span className="text-white/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            Node
          </span>
        </div>
      </div>

      <WalletButton
        address={walletAddress}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        isConnecting={isConnecting}
      />
    </motion.header>
  );
}
