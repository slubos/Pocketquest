import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, Star, Wand2, Shield } from 'lucide-react';
import { Quest } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AlternativeCardsProps {
  quests: Quest[];
  onSelect: (questId: string) => void;
}

const getCardLabel = (index: number) => {
  const labels = [
    { text: 'The Wildcard', icon: Wand2, description: 'Something different' },
    { text: 'The Safe Bet', icon: Shield, description: 'Highly rated' },
    { text: 'The Local Secret', icon: Star, description: 'Hidden gem' },
  ];
  return labels[index] || labels[0];
};

const getCostDisplay = (cost: Quest['cost']) => {
  if (cost === 'free') return 'Free';
  if (cost === 'moderate') return '$10-30';
  return '$30+';
};

export function AlternativeCards({ quests, onSelect }: AlternativeCardsProps) {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex gap-4 min-w-min">
        {quests.map((quest, index) => {
          const label = getCardLabel(index);
          const Icon = label.icon;

          return (
            <motion.button
              key={quest.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(quest.id)}
              className="flex-shrink-0 w-72 bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-xl overflow-hidden hover:border-[#00ff9d] transition-all group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={quest.imageUrl}
                  alt={quest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Label Badge */}
                <div className="absolute top-3 left-3 bg-[#0f1f1c]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#00ff9d]" />
                  <div className="text-left">
                    <div className="text-[#00ff9d] text-xs leading-tight">{label.text}</div>
                    <div className="text-[#8fb8ac] text-[10px] leading-tight">{label.description}</div>
                  </div>
                </div>

                {/* Match Percentage */}
                <div className="absolute top-3 right-3 bg-[#00ff9d]/90 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-[#0f1f1c] text-xs">{quest.vibeMatch}%</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                <h3 className="text-white mb-1 line-clamp-1">{quest.name}</h3>
                <p className="text-sm text-[#8fb8ac] mb-3 line-clamp-2">{quest.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-[#8fb8ac]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00ff9d]" />
                    <span>{quest.distance}km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00ff9d]" />
                    <span>{quest.estimatedTime}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#00ff9d]" />
                    <span>{getCostDisplay(quest.cost)}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}