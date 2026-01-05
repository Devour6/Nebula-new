import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface WalletButtonProps {
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

export function WalletButton({ address, onConnect, onDisconnect, isConnecting }: WalletButtonProps) {
  if (address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="gradient-primary text-white font-semibold px-6 rounded-md border-0"
            data-testid="button-wallet-connected"
          >
            {truncateAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={onDisconnect}
            className="cursor-pointer"
            data-testid="button-disconnect"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={onConnect}
      disabled={isConnecting}
      className="gradient-primary text-white font-semibold px-6 rounded-md border-0"
      data-testid="button-connect"
    >
      {isConnecting ? "Connecting..." : "Connect"}
    </Button>
  );
}
