import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Wallet } from "lucide-react";
import { formatEpochDate, getNextEpochDate } from "@/lib/constants";

interface UnstakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakedBalance: number;
  onUnstake: (amount: number) => Promise<void>;
  isUnstaking: boolean;
  isConnected: boolean;
  onConnect: () => void;
}

export function UnstakeModal({ isOpen, onClose, stakedBalance, onUnstake, isUnstaking, isConnected, onConnect }: UnstakeModalProps) {
  const [amount, setAmount] = useState("");

  const handleHalf = () => {
    setAmount((stakedBalance / 2).toFixed(2));
  };

  const handleMax = () => {
    setAmount(stakedBalance.toFixed(2));
  };

  const handleUnstake = async () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= stakedBalance) {
      await onUnstake(numAmount);
      setAmount("");
      onClose();
    }
  };

  const isValidAmount = parseFloat(amount) > 0 && parseFloat(amount) <= stakedBalance;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div 
        className="bg-card border border-card-border rounded-lg p-6 w-full max-w-md"
        data-testid="modal-unstake"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 gradient-primary rounded flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            UNSTAKE SOLANA
          </h2>
        </div>

        {!isConnected ? (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 text-sm mb-4">
                Connect your wallet to unstake SOL
              </p>
              <Button
                onClick={onConnect}
                className="gradient-primary text-white font-semibold px-8 py-6 text-lg rounded-lg border-0"
                data-testid="button-connect-unstake"
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Select Amount</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHalf}
                  className="text-xs border-primary/50 text-primary hover:bg-primary/10"
                  data-testid="button-unstake-half"
                >
                  HALF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMax}
                  className="text-xs border-primary/50 text-primary hover:bg-primary/10"
                  data-testid="button-unstake-max"
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-semibold">SOL</span>
              </div>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent border-0 text-right text-xl text-white font-medium focus-visible:ring-0 placeholder:text-white/30"
                data-testid="input-unstake-amount"
              />
            </div>

            <Button
              onClick={handleUnstake}
              disabled={!isValidAmount || isUnstaking || stakedBalance === 0}
              className="w-full gradient-primary-muted text-white font-semibold py-6 text-lg rounded-lg border-0 disabled:opacity-50"
              data-testid="button-unstake"
            >
              {isUnstaking ? "Unstaking..." : "Unstake"}
            </Button>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Available Balance</span>
                <span className="text-white font-medium" data-testid="text-staked-balance">
                  {stakedBalance.toFixed(2)} SOL
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Next Epoch</span>
                <span className="text-white font-medium" data-testid="text-unstake-epoch">
                  {formatEpochDate(getNextEpochDate())}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
