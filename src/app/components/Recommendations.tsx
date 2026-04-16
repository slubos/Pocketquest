import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useQuest } from '../contexts/QuestContext';
import { useRealTime } from '../contexts/RealTimeContext';
import { mockQuests } from '../data/mockQuests';
import { QuestCard } from './QuestCard';
import { AlternativeCards } from './AlternativeCards';
import { DismissModal } from './DismissModal';
import { RefineModal } from './RefineModal';
import { Settings, Sparkles, Clock, Calendar, CloudRain, Sun, Cloud, Moon } from 'lucide-react';

export function Recommendations() {
  const navigate = useNavigate();
  const { profile, archivedQuests, dismissedQuests, userPreferences } = useQuest();
  const { dayOfWeek, timeLabel, contextLabel, timeOfDay, weather, weatherLabel } = useRealTime();
  const [showDismissModal, setShowDismissModal] = useState(false);
  const [showRefineModal, setShowRefineModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Redirect if no profile
  if (!profile) {
    navigate('/onboarding');
    return null;
  }

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType) {
      case 'sunny':
        return <Sun className="w-4 h-4 text-[#FFA500]" />;
      case 'cloudy':
        return <Cloud className="w-4 h-4 text-[#8fb8ac]" />;
      case 'rainy':
        return <CloudRain className="w-4 h-4 text-[#00ff9d]" />;
      case 'clear-night':
        return <Moon className="w-4 h-4 text-[#8fb8ac]" />;
      default:
        return <Sun className="w-4 h-4 text-[#FFA500]" />;
    }
  };

  // Filter and rank quests based on profile
  const availableQuests = useMemo(() => {
    return mockQuests
      .filter(quest => !archivedQuests.includes(quest.id) && !dismissedQuests.includes(quest.id))
      .map(quest => {
        // Calculate match score based on user profile
        let matchScore = quest.vibeMatch;
        
        // Adjust based on energy level and mood
        const energyDiff = Math.abs(quest.energyLevel - profile.mood);
        if (energyDiff <= 20) matchScore += 5;
        
        // Time matching
        const timeDiff = Math.abs(quest.estimatedTime - profile.timeWindow);
        if (timeDiff <= 15) matchScore = Math.min(matchScore + 10, 99);
        
        // Budget matching
        if (quest.cost === profile.budget) matchScore = Math.min(matchScore + 5, 99);
        
        // Category preferences
        if (userPreferences.preferredCategories.includes(quest.category)) {
          matchScore = Math.min(matchScore + 15, 99);
        }
        if (userPreferences.dislikedCategories.includes(quest.category)) {
          matchScore = Math.max(matchScore - 30, 30);
        }

        // Real-time context matching - boost quests that match time of day
        if (timeOfDay === 'morning' && quest.vibe.includes('morning')) {
          matchScore = Math.min(matchScore + 8, 99);
        }
        if (timeOfDay === 'evening' && quest.vibe.includes('evening')) {
          matchScore = Math.min(matchScore + 8, 99);
        }
        if (timeOfDay === 'night' && quest.vibe.includes('late-night')) {
          matchScore = Math.min(matchScore + 8, 99);
        }
        // Afternoon is flexible, small boost for outdoor activities
        if (timeOfDay === 'afternoon' && quest.vibe.includes('outdoor')) {
          matchScore = Math.min(matchScore + 5, 99);
        }

        return { ...quest, vibeMatch: matchScore };
      })
      .sort((a, b) => b.vibeMatch - a.vibeMatch);
  }, [profile, archivedQuests, dismissedQuests, userPreferences, timeOfDay]);

  const heroQuest = availableQuests[currentIndex];
  const alternatives = availableQuests.slice(currentIndex + 1, currentIndex + 4);

  const handleDismiss = () => {
    setSelectedQuest(heroQuest?.id || null);
    setShowDismissModal(true);
  };

  const handleDismissConfirm = () => {
    setShowDismissModal(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleArchive = () => {
    if (currentIndex < availableQuests.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSelectAlternative = (questId: string) => {
    const newIndex = availableQuests.findIndex(q => q.id === questId);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  };

  if (!heroQuest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c] flex items-center justify-center px-4">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-[#00ff9d] mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">You've explored everything!</h2>
          <p className="text-[#8fb8ac] mb-6">Time to reset and discover more.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-[#0f1f1c] px-6 py-3 rounded-lg"
          >
            Start Fresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c] px-4 py-6 pb-24">
      {/* Header with Real-Time Context */}
      <div className="max-w-4xl mx-auto mb-6">
        {/* Real-Time Context Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#243a34]/60 to-[#2d4a43]/40 backdrop-blur-sm border border-[#00ff9d]/20 rounded-xl p-4 mb-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00ff9d]" />
                <span className="text-[#b8d4ce] text-sm">{dayOfWeek}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00ff9d]" />
                <span className="text-[#b8d4ce] text-sm">{timeLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                {getWeatherIcon(weather)}
                <span className="text-[#b8d4ce] text-sm">{weatherLabel}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#FFA500]/10 px-3 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 text-[#FFA500]" />
              <span className="text-[#FFA500] text-sm font-medium">{contextLabel}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#00ff9d] mb-1">Your Quest Awaits</h1>
            <p className="text-[#8fb8ac] text-sm">
              {availableQuests.length} adventures matched to your vibe
            </p>
          </div>
          <button
            onClick={() => setShowRefineModal(true)}
            className="p-3 bg-[#243a34]/50 border border-[#00ff9d]/20 rounded-lg hover:bg-[#243a34] transition-colors"
          >
            <Settings className="w-5 h-5 text-[#00ff9d]" />
          </button>
        </div>
      </div>

      {/* Hero Quest Card */}
      <div className="max-w-4xl mx-auto mb-8">
        <AnimatePresence mode="wait">
          <QuestCard
            key={heroQuest.id}
            quest={heroQuest}
            onDismiss={handleDismiss}
            onArchive={handleArchive}
          />
        </AnimatePresence>
      </div>

      {/* Alternative Cards */}
      {alternatives.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h2 className="text-lg text-white">More Options</h2>
            <p className="text-sm text-[#8fb8ac]">Swipe to explore alternatives</p>
          </div>
          <AlternativeCards
            quests={alternatives}
            onSelect={handleSelectAlternative}
          />
        </div>
      )}

      {/* Modals */}
      <DismissModal
        isOpen={showDismissModal}
        onClose={() => setShowDismissModal(false)}
        onConfirm={handleDismissConfirm}
        questId={selectedQuest}
      />

      <RefineModal
        isOpen={showRefineModal}
        onClose={() => setShowRefineModal(false)}
      />
    </div>
  );
}