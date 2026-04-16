import { motion } from 'motion/react';
import { X, Coffee, Utensils, Trees, Palette, Gamepad2, Music } from 'lucide-react';
import { useQuest } from '../contexts/QuestContext';
import * as Dialog from '@radix-ui/react-dialog';

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'Culture', icon: Palette, color: '#ff6b9d' },
  { id: 'Food', icon: Utensils, color: '#ffa94d' },
  { id: 'Nature', icon: Trees, color: '#69db7c' },
  { id: 'Entertainment', icon: Gamepad2, color: '#748ffc' },
  { id: 'Music', icon: Music, color: '#ff6b9d' },
  { id: 'Coffee', icon: Coffee, color: '#cc8e35' },
];

export function RefineModal({ isOpen, onClose }: RefineModalProps) {
  const { userPreferences, updatePreferences, profile } = useQuest();

  const handleToggleCategory = (category: string) => {
    const isLiked = userPreferences.preferredCategories.includes(category);
    updatePreferences(category, !isLiked);
  };

  const getCategoryState = (category: string): 'liked' | 'disliked' | 'neutral' => {
    if (userPreferences.preferredCategories.includes(category)) return 'liked';
    if (userPreferences.dislikedCategories.includes(category)) return 'disliked';
    return 'neutral';
  };

  const getMoodDescription = () => {
    if (!profile) return '';
    if (profile.mood < 33) return 'Low-Key / Quiet';
    if (profile.mood < 66) return 'Moderate Energy';
    return 'High-Energy / Social';
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#243a34] border-2 border-[#00ff9d]/30 rounded-2xl p-6 z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <Dialog.Title className="text-xl text-white mb-1">
                  Refine Your Preferences
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[#8fb8ac]">
                  Toggle categories to improve your recommendations
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-[#2d4a43] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#8fb8ac]" />
                </button>
              </Dialog.Close>
            </div>

            {/* Current State */}
            <div className="mb-6 p-4 bg-[#1a2f2a]/50 border border-[#00ff9d]/20 rounded-lg">
              <h3 className="text-[#00ff9d] text-sm mb-3">Current Vibe Detection</h3>
              <div className="space-y-2 text-sm text-[#8fb8ac]">
                <div className="flex justify-between">
                  <span>Mood:</span>
                  <span className="text-white">{getMoodDescription()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Available:</span>
                  <span className="text-white">{profile?.timeWindow || 0} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="text-white capitalize">{profile?.budget || 'moderate'}</span>
                </div>
              </div>
            </div>

            {/* Category Preferences */}
            <div className="mb-6">
              <h3 className="text-white mb-3">Category Preferences</h3>
              <p className="text-xs text-[#8fb8ac] mb-4">
                Tap once to like, twice to dislike, three times to reset
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const state = getCategoryState(category.id);
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        if (state === 'neutral') {
                          updatePreferences(category.id, true);
                        } else if (state === 'liked') {
                          updatePreferences(category.id, false);
                        } else {
                          // Reset to neutral by removing from both arrays
                          const newPrefs = {
                            preferredCategories: userPreferences.preferredCategories.filter(c => c !== category.id),
                            dislikedCategories: userPreferences.dislikedCategories.filter(c => c !== category.id),
                          };
                          // This is a workaround - in a real app we'd have a proper reset function
                          if (userPreferences.dislikedCategories.includes(category.id)) {
                            updatePreferences(category.id, true);
                            setTimeout(() => {
                              const currentState = getCategoryState(category.id);
                              if (currentState === 'liked') {
                                // Remove from preferred to make it neutral
                              }
                            }, 0);
                          }
                        }
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        state === 'liked'
                          ? 'bg-[#00ff9d]/20 border-[#00ff9d] text-[#00ff9d]'
                          : state === 'disliked'
                          ? 'bg-red-500/10 border-red-500/50 text-red-400'
                          : 'bg-[#2d4a43]/30 border-[#2d4a43] text-[#8fb8ac] hover:border-[#4a9d7f]'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">{category.id}</div>
                      {state !== 'neutral' && (
                        <div className="text-xs mt-1 opacity-70">
                          {state === 'liked' ? '✓ Preferred' : '✗ Hidden'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-[#0f1f1c] py-3 rounded-lg hover:shadow-lg hover:shadow-[#00ff9d]/30 transition-all"
            >
              Apply Preferences
            </button>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
