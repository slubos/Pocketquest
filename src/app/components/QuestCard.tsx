import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, CheckCircle2, X, Sparkles, Compass } from 'lucide-react';
import { Quest } from '../types';
import { useQuest } from '../contexts/QuestContext';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuestCardProps {
  quest: Quest;
  onDismiss: () => void;
  onArchive: () => void;
}

export function QuestCard({ quest, onDismiss, onArchive }: QuestCardProps) {
  const { archiveQuest } = useQuest();
  const navigate = useNavigate();

  const handleArchive = () => {
    archiveQuest(quest.id);
    onArchive();
  };

  const getCostDisplay = (cost: Quest['cost']) => {
    if (cost === 'free') return 'Free';
    if (cost === 'moderate') return '$10-30';
    return '$30+';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className="bg-[#243a34] border-2 border-[#00ff9d]/30 rounded-2xl overflow-hidden shadow-2xl shadow-[#00ff9d]/10"
    >
      {/* Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <ImageWithFallback
          src={quest.imageUrl}
          alt={quest.name}
          className="w-full h-full object-cover"
        />
        
        {/* Vibe Match Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#0f1f1c]" />
          <span className="text-[#0f1f1c]">{quest.vibeMatch}% Match</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-[#0f1f1c]/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-[#00ff9d] text-sm">{quest.category}</span>
        </div>

        {/* Hidden Badge */}
        {quest.isHidden && (
          <div className="absolute bottom-4 left-4 bg-[#00ff9d]/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-[#0f1f1c] text-xs">Local Secret</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Description */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl text-white mb-2">{quest.name}</h2>
          <p className="text-[#b8d4ce] leading-relaxed">{quest.description}</p>
        </div>

        {/* Match Reason - "Why Now?" */}
        <div className="mb-6 p-4 bg-[#1a2f2a]/50 border border-[#00ff9d]/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#00ff9d] mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-[#00ff9d] text-sm mb-1">Why now?</h3>
              <p className="text-[#8fb8ac] text-sm">{quest.matchReason}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex items-center gap-2 text-[#8fb8ac]">
            <MapPin className="w-4 h-4 text-[#00ff9d]" />
            <span className="text-sm">{quest.distance}km</span>
          </div>
          <div className="flex items-center gap-2 text-[#8fb8ac]">
            <Clock className="w-4 h-4 text-[#00ff9d]" />
            <span className="text-sm">{quest.estimatedTime}min</span>
          </div>
          <div className="flex items-center gap-2 text-[#8fb8ac]">
            <DollarSign className="w-4 h-4 text-[#00ff9d]" />
            <span className="text-sm">{getCostDisplay(quest.cost)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quest.vibe.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#1a2f2a]/50 border border-[#4a9d7f]/30 rounded-full text-[#8fb8ac] text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <button
            onClick={() => navigate(`/quest/${quest.id}`)}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-[#0f1f1c] rounded-xl font-medium shadow-lg shadow-[#FFA500]/30 hover:shadow-[#FFA500]/50 hover:scale-105 transition-all group"
          >
            <Compass className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-lg">Choose This Adventure</span>
          </button>
          
          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onDismiss}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#2d4a43]/50 border border-[#4a9d7f]/30 text-[#8fb8ac] rounded-lg hover:bg-[#2d4a43] hover:border-[#4a9d7f] transition-all"
            >
              <X className="w-4 h-4" />
              <span>Not Today</span>
            </button>
            <button
              onClick={handleArchive}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1a2f2a]/50 border border-[#00ff9d]/20 text-[#00ff9d] rounded-lg hover:bg-[#1a2f2a] hover:border-[#00ff9d]/40 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Did This!</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}