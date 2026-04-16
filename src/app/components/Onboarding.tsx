import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Compass, Clock, DollarSign } from 'lucide-react';
import { useQuest } from '../contexts/QuestContext';
import * as Slider from '@radix-ui/react-slider';

export function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = useQuest();
  
  const [mood, setMood] = useState(50);
  const [timeWindow, setTimeWindow] = useState(60);
  const [budget, setBudget] = useState<'free' | 'moderate' | 'treat'>('moderate');

  const handleStart = () => {
    setProfile({ mood, timeWindow, budget });
    navigate('/recommendations');
  };

  const getMoodLabel = (value: number) => {
    if (value < 33) return 'Quiet / Reflective';
    if (value < 66) return 'Moderate';
    return 'High-Energy / Social';
  };

  const getTimeLabel = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full mb-6"
          >
            <Compass className="w-10 h-10 text-[#0f1f1c]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl mb-4 text-[#FFA500] tracking-tight"
          >
            Tune your quest.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[#b8d4ce] max-w-xl mx-auto"
          >
            Help us narrow down the neighborhood to match your current vibe.
          </motion.p>
        </div>

        {/* Quick-Sync Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#243a34]/50 backdrop-blur-sm border border-[#00ff9d]/20 rounded-2xl p-8 space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl text-[#00ff9d] mb-2">Quick-Sync Your Vibe</h2>
            <p className="text-[#8fb8ac]">Tell us how you're feeling right now</p>
          </div>

          {/* Mood Slider */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#00ff9d]" />
              </div>
              <div className="flex-1">
                <label className="text-white">Your Mood</label>
                <p className="text-sm text-[#8fb8ac]">{getMoodLabel(mood)}</p>
              </div>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[mood]}
              onValueChange={(values) => setMood(values[0])}
              max={100}
              step={1}
            >
              <Slider.Track className="bg-[#2d4a43] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-gradient-to-r from-[#4a9d7f] to-[#00ff9d] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-6 h-6 bg-[#00ff9d] shadow-lg shadow-[#00ff9d]/50 rounded-full hover:bg-[#00ffaa] focus:outline-none focus:ring-2 focus:ring-[#00ff9d] transition-colors"
                aria-label="Mood"
              />
            </Slider.Root>
          </div>

          {/* Time Window Dial */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#00ff9d]" />
              </div>
              <div className="flex-1">
                <label className="text-white">How much time do you have?</label>
                <p className="text-sm text-[#8fb8ac]">{getTimeLabel(timeWindow)}</p>
              </div>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[timeWindow]}
              onValueChange={(values) => setTimeWindow(values[0])}
              min={15}
              max={240}
              step={15}
            >
              <Slider.Track className="bg-[#2d4a43] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-gradient-to-r from-[#4a9d7f] to-[#00ff9d] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-6 h-6 bg-[#00ff9d] shadow-lg shadow-[#00ff9d]/50 rounded-full hover:bg-[#00ffaa] focus:outline-none focus:ring-2 focus:ring-[#00ff9d] transition-colors"
                aria-label="Time Window"
              />
            </Slider.Root>
            <div className="flex justify-between text-xs text-[#8fb8ac] px-1">
              <span>15m</span>
              <span>1h</span>
              <span>2h</span>
              <span>3h</span>
              <span>4h</span>
            </div>
          </div>

          {/* Budget Toggle */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#00ff9d]" />
              </div>
              <div className="flex-1">
                <label className="text-white">Budget</label>
                <p className="text-sm text-[#8fb8ac]">What feels right today?</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['free', 'moderate', 'treat'] as const).map((level) => {
                const labels = {
                  free: 'Free',
                  moderate: 'Cheap Eats',
                  treat: 'Splurge'
                };
                const prices = {
                  free: '$0',
                  moderate: '$10-30',
                  treat: '$30+'
                };
                return (
                  <button
                    key={level}
                    onClick={() => setBudget(level)}
                    className={`py-4 px-4 rounded-xl border-2 transition-all ${
                      budget === level
                        ? 'bg-[#00ff9d]/20 border-[#00ff9d] text-[#00ff9d]'
                        : 'bg-[#2d4a43]/30 border-[#2d4a43] text-[#8fb8ac] hover:border-[#4a9d7f]'
                    }`}
                  >
                    <div>{labels[level]}</div>
                    <div className="text-xs mt-1 opacity-70">{prices[level]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-[#0f1f1c] py-4 rounded-xl shadow-lg shadow-[#00ff9d]/30 hover:shadow-[#00ff9d]/50 transition-all"
          >
            Start My Quest
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-[#8fb8ac] text-sm mt-8"
        >
          Consulting the map and the clouds...
        </motion.p>
      </motion.div>
    </div>
  );
}