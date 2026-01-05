import { motion } from "framer-motion";
import { WalletButton } from "./WalletButton";

interface HeaderProps {
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

export function Header({ walletAddress, onConnect, onDisconnect, isConnecting }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center gap-2" data-testid="logo">
        <div className="w-10 h-10 relative">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3366" />
                <stop offset="50%" stopColor="#FF6B8A" />
                <stop offset="100%" stopColor="#FFB366" />
              </linearGradient>
            </defs>
            <path
              d="M20 4L4 12V28L20 36L36 28V12L20 4Z"
              fill="url(#logoGradient)"
            />
            <path
              d="M20 8L32 14V26L20 32V8Z"
              fill="rgba(0,0,0,0.3)"
            />
            <path
              d="M20 14L12 18V26L20 30L28 26V18L20 14Z"
              fill="white"
              fillOpacity="0.2"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-xl tracking-[0.3em] leading-none">
            NEBULA
          </span>
          <span className="text-white/60 text-xs tracking-[0.2em] uppercase">
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
