import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, DollarSign, Phone, Globe, Star, Sparkles, Compass, CheckCircle2, Calendar } from 'lucide-react';
import { mockQuests } from '../data/mockQuests';
import { useQuest } from '../contexts/QuestContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quest } from '../types';

export function QuestDetail() {
  const { questId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { archiveQuest } = useQuest();

  const quest = mockQuests.find(q => q.id === questId);

  if (!quest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Quest not found</h2>
          <button
            onClick={() => navigate('/recommendations')}
            className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-[#0f1f1c] px-6 py-3 rounded-lg"
          >
            Back to Recommendations
          </button>
        </div>
      </div>
    );
  }

  const getCostDisplay = (cost: Quest['cost']) => {
    if (cost === 'free') return 'Free';
    if (cost === 'moderate') return '$10-30';
    return '$30+';
  };

  const handleMarkComplete = () => {
    archiveQuest(quest.id);
    navigate('/');
  };

  const handleOpenMaps = () => {
    if (quest.address) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(quest.address)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c]">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <ImageWithFallback
          src={quest.imageUrl}
          alt={quest.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f1c] via-[#0f1f1c]/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/recommendations')}
          className="absolute top-6 left-4 flex items-center gap-2 px-4 py-2 bg-[#0f1f1c]/80 backdrop-blur-sm border border-[#00ff9d]/30 rounded-lg text-white hover:bg-[#0f1f1c] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quests</span>
        </button>

        {/* Vibe Match Badge */}
        <div className="absolute top-6 right-4 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#0f1f1c]" />
          <span className="text-[#0f1f1c] font-medium">{quest.vibeMatch}% Match</span>
        </div>

        {/* Category & Hidden Badge */}
        <div className="absolute bottom-6 left-4 flex gap-2">
          <div className="bg-[#0f1f1c]/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-[#00ff9d] text-sm">{quest.category}</span>
          </div>
          {quest.isHidden && (
            <div className="bg-[#00ff9d]/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-[#0f1f1c] text-xs font-medium">Local Secret</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        {/* Title & Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl text-white mb-3">{quest.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-[#FFA500] fill-[#FFA500]" />
            <span className="text-[#00ff9d] text-lg">{quest.rating}</span>
            <span className="text-[#8fb8ac]">/5.0</span>
          </div>
          <p className="text-[#b8d4ce] text-lg leading-relaxed">{quest.description}</p>
        </motion.div>

        {/* Why Now? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-5 bg-gradient-to-r from-[#1a2f2a] to-[#243a34] border border-[#00ff9d]/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#00ff9d] mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-[#00ff9d] text-base font-medium mb-2">Why this quest calls to you now</h3>
              <p className="text-[#b8d4ce]">{quest.matchReason}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#00ff9d] mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <p className="text-white text-lg">{quest.estimatedTime} min</p>
          </div>
          <div className="bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#00ff9d] mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Distance</span>
            </div>
            <p className="text-white text-lg">{quest.distance} km away</p>
          </div>
          <div className="bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#00ff9d] mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm font-medium">Budget</span>
            </div>
            <p className="text-white text-lg">{getCostDisplay(quest.cost)}</p>
          </div>
        </motion.div>

        {/* Contact & Location Info */}
        {(quest.address || quest.phone || quest.website || quest.hours) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-white text-xl mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00ff9d]" />
              Location & Contact
            </h3>
            <div className="space-y-3">
              {quest.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8fb8ac] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#8fb8ac] text-sm mb-1">Address</p>
                    <p className="text-white">{quest.address}</p>
                    <button
                      onClick={handleOpenMaps}
                      className="text-[#FFA500] text-sm hover:text-[#FF8C00] mt-1 underline"
                    >
                      Open in Maps
                    </button>
                  </div>
                </div>
              )}
              {quest.hours && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#8fb8ac] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#8fb8ac] text-sm mb-1">Hours</p>
                    <p className="text-white">{quest.hours}</p>
                  </div>
                </div>
              )}
              {quest.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#8fb8ac] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#8fb8ac] text-sm mb-1">Phone</p>
                    <a href={`tel:${quest.phone}`} className="text-[#FFA500] hover:text-[#FF8C00]">
                      {quest.phone}
                    </a>
                  </div>
                </div>
              )}
              {quest.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#8fb8ac] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#8fb8ac] text-sm mb-1">Website</p>
                    <a
                      href={quest.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFA500] hover:text-[#FF8C00] break-all"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Insider Tips */}
        {quest.tips && quest.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#243a34]/50 border border-[#FFA500]/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-white text-xl mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFA500]" />
              Insider Tips
            </h3>
            <ul className="space-y-2">
              {quest.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#FFA500] mt-1">•</span>
                  <span className="text-[#b8d4ce]">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Vibe Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-white text-lg mb-3">Vibe Tags</h3>
          <div className="flex flex-wrap gap-2">
            {quest.vibe.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#1a2f2a]/50 border border-[#4a9d7f]/30 rounded-full text-[#8fb8ac]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1f1c] via-[#0f1f1c] to-transparent border-t border-[#00ff9d]/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/recommendations')}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-[#2d4a43]/50 border border-[#4a9d7f]/30 text-[#8fb8ac] rounded-xl hover:bg-[#2d4a43] hover:border-[#4a9d7f] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>See Other Quests</span>
            </button>
            <button
              onClick={handleMarkComplete}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-[#0f1f1c] rounded-xl font-medium shadow-lg shadow-[#FFA500]/30 hover:shadow-[#FFA500]/50 hover:scale-105 transition-all group"
            >
              <Compass className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-lg">I'm Going!</span>
            </button>
          </div>
          <button
            onClick={handleMarkComplete}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3 text-[#8fb8ac] hover:text-[#00ff9d] transition-colors text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Already did this? Mark as complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}