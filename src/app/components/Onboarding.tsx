import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useQuest } from '../contexts/QuestContext';
import { Compass, ChevronRight, ChevronLeft } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

export function Onboarding() {
  const navigate = useNavigate();
  const { setUserProfile } = useQuest();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Mood/Energy
  const [mood, setMood] = useState(50);

  // Step 2: Social Preference
  const [socialPreference, setSocialPreference] = useState<'solo' | 'small-group' | 'any-size'>('solo');

  // Step 3: Time Available
  const [timeWindow, setTimeWindow] = useState(60);

  // Step 4: Budget
  const [budget, setBudget] = useState<'free' | 'moderate' | 'treat'>('moderate');

  // Step 5: Activity Types
  const [activityTypes, setActivityTypes] = useState<string[]>([]);

  const activityOptions = [
    { id: 'culture', label: 'Culture & Arts', emoji: '🎭' },
    { id: 'food', label: 'Food & Drink', emoji: '🍜' },
    { id: 'nature', label: 'Nature & Outdoors', emoji: '🌿' },
    { id: 'fitness', label: 'Active & Fitness', emoji: '💪' },
    { id: 'entertainment', label: 'Fun & Games', emoji: '🎮' },
    { id: 'wellness', label: 'Wellness & Rest', emoji: '🧘' },
  ];

  const toggleActivityType = (id: string) => {
    setActivityTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const getMoodLabel = (value: number) => {
    if (value < 33) return 'Quiet / Reflective';
    if (value < 66) return 'Moderate';
    return 'High-Energy / Social';
  };

  const getTimeLabel = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleComplete = () => {
    setUserProfile({
      mood,
      timeWindow,
      budget,
      socialPreference,
      activityTypes: activityTypes.length > 0 ? activityTypes : ['culture', 'food', 'nature'],
      preferences: [],
    });
    navigate('/recommendations');
  };

  const canProceed = () => {
    if (currentStep === 4) {
      return activityTypes.length > 0;
    }
    return true;
  };

  const steps = [
    {
      title: 'What\'s your vibe right now?',
      subtitle: 'How much energy are you bringing to this adventure?',
      content: (
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#8fb8ac] text-sm">Quiet / Reflective</span>
              <span className="text-[#00ff9d] text-2xl font-medium">{getMoodLabel(mood)}</span>
              <span className="text-[#8fb8ac] text-sm">High-Energy / Social</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[mood]}
              onValueChange={(values) => setMood(values[0])}
              min={0}
              max={100}
              step={1}
            >
              <Slider.Track className="bg-[#2d4a43] relative grow rounded-full h-3">
                <Slider.Range className="absolute bg-gradient-to-r from-[#4a9d7f] to-[#00ff9d] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-7 h-7 bg-[#00ff9d] shadow-lg shadow-[#00ff9d]/50 rounded-full hover:bg-[#00ffaa] focus:outline-none focus:ring-2 focus:ring-[#00ff9d] transition-colors cursor-grab active:cursor-grabbing"
                aria-label="Mood"
              />
            </Slider.Root>
          </div>
        </div>
      ),
    },
    {
      title: 'Flying solo or with company?',
      subtitle: 'Tell us about your ideal social setting.',
      content: (
        <div className="grid gap-4 max-w-md mx-auto">
          {[
            { value: 'solo' as const, label: 'Solo Adventure', emoji: '🧑', desc: 'Just me, myself, and I' },
            { value: 'small-group' as const, label: 'Small Group', emoji: '👥', desc: '2-4 people max' },
            { value: 'any-size' as const, label: 'The More the Merrier', emoji: '🎉', desc: 'Crowds welcome' },
          ].map(({ value, label, emoji, desc }) => (
            <button
              key={value}
              onClick={() => setSocialPreference(value)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                socialPreference === value
                  ? 'bg-[#00ff9d]/20 border-[#00ff9d] scale-105'
                  : 'bg-[#2d4a43]/30 border-[#2d4a43] hover:border-[#4a9d7f]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{emoji}</div>
                <div className="flex-1">
                  <div className={`text-lg mb-1 ${socialPreference === value ? 'text-[#00ff9d]' : 'text-white'}`}>
                    {label}
                  </div>
                  <div className="text-[#8fb8ac] text-sm">{desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'How much time do you have?',
      subtitle: 'We\'ll match adventures to your schedule.',
      content: (
        <div className="space-y-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-6xl text-[#FFA500] mb-4 font-light">
              {getTimeLabel(timeWindow)}
            </div>
            <div className="text-[#8fb8ac] text-sm">Available time window</div>
          </div>
          <div>
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
                className="block w-6 h-6 bg-[#00ff9d] shadow-lg shadow-[#00ff9d]/50 rounded-full hover:bg-[#00ffaa] focus:outline-none focus:ring-2 focus:ring-[#00ff9d] transition-colors cursor-grab active:cursor-grabbing"
                aria-label="Time Window"
              />
            </Slider.Root>
            <div className="flex justify-between text-xs text-[#8fb8ac] px-1 mt-2">
              <span>15m</span>
              <span>1h</span>
              <span>2h</span>
              <span>3h</span>
              <span>4h</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'What\'s your budget vibe?',
      subtitle: 'No judgment – we\'ve got options for everyone.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { value: 'free' as const, label: 'Free', price: '$0', emoji: '🎁', desc: 'Zero dollars, infinite vibes' },
            { value: 'moderate' as const, label: 'Cheap Eats', price: '$10-30', emoji: '🍔', desc: 'Worth every penny' },
            { value: 'treat' as const, label: 'Splurge', price: '$30+', emoji: '✨', desc: 'Treat yourself today' },
          ].map(({ value, label, price, emoji, desc }) => (
            <button
              key={value}
              onClick={() => setBudget(value)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                budget === value
                  ? 'bg-[#FFA500]/20 border-[#FFA500] scale-105'
                  : 'bg-[#2d4a43]/30 border-[#2d4a43] hover:border-[#4a9d7f]'
              }`}
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <div className={`text-xl mb-1 ${budget === value ? 'text-[#FFA500]' : 'text-white'}`}>
                {label}
              </div>
              <div className="text-[#8fb8ac] text-sm mb-2">{price}</div>
              <div className="text-[#8fb8ac] text-xs">{desc}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'What kind of adventures call to you?',
      subtitle: 'Pick at least one – or grab them all.',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {activityOptions.map(({ id, label, emoji }) => (
            <button
              key={id}
              onClick={() => toggleActivityType(id)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                activityTypes.includes(id)
                  ? 'bg-[#00ff9d]/20 border-[#00ff9d] scale-105'
                  : 'bg-[#2d4a43]/30 border-[#2d4a43] hover:border-[#4a9d7f]'
              }`}
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <div className={`text-sm ${activityTypes.includes(id) ? 'text-[#00ff9d]' : 'text-white'}`}>
                {label}
              </div>
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f1c] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f2a] via-[#0f1f1c] to-[#0a1512] opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full mb-4"
          >
            <Compass className="w-8 h-8 text-[#0f1f1c]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#FFA500] text-sm tracking-wider mb-2"
          >
            STEP {currentStep + 1} OF {steps.length}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto w-full px-4 mb-8">
          <div className="h-1 bg-[#2d4a43] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00]"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Question */}
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-5xl text-white mb-4 leading-tight">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-xl text-[#b8d4ce] max-w-2xl mx-auto">
                    {steps[currentStep].subtitle}
                  </p>
                </div>

                {/* Step Content */}
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-[#8fb8ac] hover:text-[#00ff9d] border border-[#2d4a43] hover:border-[#4a9d7f]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleComplete();
                } else {
                  setCurrentStep(prev => prev + 1);
                }
              }}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-[#0f1f1c] shadow-lg shadow-[#FFA500]/30 hover:shadow-[#FFA500]/50 hover:scale-105'
                  : 'bg-[#2d4a43] text-[#8fb8ac] cursor-not-allowed'
              }`}
            >
              <span className="font-medium">
                {currentStep === steps.length - 1 ? 'Find My Adventures' : 'Next'}
              </span>
              {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
              {currentStep === steps.length - 1 && <Compass className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-[#8fb8ac] text-sm pb-8"
        >
          {currentStep === steps.length - 1 ? 'Consulting the map and the clouds...' : 'Your preferences stay private and local'}
        </motion.p>
      </div>
    </div>
  );
}