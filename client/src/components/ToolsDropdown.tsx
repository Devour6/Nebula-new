import { Modal } from "./Modal";
import { Wrench } from "lucide-react";

interface ToolsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ToolsDropdown({ isOpen, onClose }: ToolsDropdownProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div 
        className="bg-card border border-card-border rounded-lg p-6 w-full max-w-sm"
        data-testid="modal-tools"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
            <Wrench className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            TOOLS
          </h2>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="text-center py-8">
            <p className="text-white/60 text-sm">
              No tools available yet.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Check back soon!
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
