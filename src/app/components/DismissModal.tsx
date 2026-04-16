import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, DollarSign, Frown } from 'lucide-react';
import { useQuest } from '../contexts/QuestContext';
import * as Dialog from '@radix-ui/react-dialog';

interface DismissModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questId: string | null;
}

export function DismissModal({ isOpen, onClose, onConfirm, questId }: DismissModalProps) {
  const { dismissQuest } = useQuest();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const reasons = [
    { id: 'distance', label: 'Too far', icon: MapPin },
    { id: 'cost', label: 'Too expensive', icon: DollarSign },
    { id: 'vibe', label: 'Just not the vibe', icon: Frown },
  ];

  const handleConfirm = () => {
    if (questId && selectedReason) {
      dismissQuest(questId, selectedReason);
      onConfirm();
      setSelectedReason(null);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedReason(null);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#243a34] border-2 border-[#00ff9d]/30 rounded-2xl p-6 z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <Dialog.Title className="text-xl text-white mb-1">
                  Why not today?
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[#8fb8ac]">
                  This helps us recommend better adventures
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-[#2d4a43] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#8fb8ac]" />
                </button>
              </Dialog.Close>
            </div>

            {/* Reason Options */}
            <div className="space-y-3 mb-6">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      selectedReason === reason.id
                        ? 'bg-[#00ff9d]/20 border-[#00ff9d] text-[#00ff9d]'
                        : 'bg-[#2d4a43]/30 border-[#2d4a43] text-[#8fb8ac] hover:border-[#4a9d7f]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{reason.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 bg-[#2d4a43]/50 border border-[#4a9d7f]/30 text-[#8fb8ac] rounded-lg hover:bg-[#2d4a43] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedReason}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  selectedReason
                    ? 'bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-[#0f1f1c] hover:shadow-lg hover:shadow-[#00ff9d]/30'
                    : 'bg-[#2d4a43]/30 text-[#4a9d7f] cursor-not-allowed'
                }`}
              >
                Dismiss Quest
              </button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
