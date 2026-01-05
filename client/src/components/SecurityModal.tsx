import { Modal } from "./Modal";
import { VALIDATOR_CONFIG } from "@/lib/constants";
import { Shield } from "lucide-react";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div 
        className="bg-card border border-card-border rounded-lg p-6 w-full max-w-lg"
        data-testid="modal-security"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Security
          </h2>
        </div>

        <div className="space-y-4 text-white/80 text-sm leading-relaxed">
          <p>
            You can use this website to enhance your native staking experience. If you prefer, you may also stake directly through wallets like Phantom, Solflare, Backpack, or any other supported platform.
          </p>

          <p>
            Rest assured, Solana's staking protocol ensures that validators never have access to your staked SOL. You retain full ownership and control of your Stake Account at all times.
          </p>

          <div className="pt-4 space-y-3">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                Validator Identity Public Key:
              </p>
              <p 
                className="font-mono text-xs text-white bg-muted rounded px-3 py-2 break-all"
                data-testid="text-identity-key"
              >
                {VALIDATOR_CONFIG.identityPubkey}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                Validator Vote Public Key:
              </p>
              <p 
                className="font-mono text-xs text-white bg-muted rounded px-3 py-2 break-all"
                data-testid="text-vote-key"
              >
                {VALIDATOR_CONFIG.votePubkey}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
