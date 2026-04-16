import { motion } from 'motion/react';
import { Compass, Clock, CloudRain, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1f1c] relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80"
            alt="Urban sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f1c]/70 via-[#1a2f2a]/80 to-[#1a2f2a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full mb-8 shadow-lg shadow-[#FFA500]/30"
            >
              <Compass className="w-10 h-10 text-[#0f1f1c]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl mb-6 text-white tracking-tight leading-tight"
            >
              Your city has secrets.<br />
              Let's find one that fits your schedule.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-[#b8d4ce] max-w-3xl mx-auto mb-10"
            >
              The first recommender that looks at the clock, the weather, and your mood before suggesting a single thing.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-[#0f1f1c] px-12 py-4 rounded-xl text-lg font-medium shadow-lg shadow-[#FFA500]/30 hover:shadow-[#FFA500]/50 transition-all inline-flex items-center gap-3"
            >
              <span>Find My Next Adventure</span>
              <Compass className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Context Trio Section */}
      <div className="relative bg-gradient-to-b from-[#1a2f2a] to-[#0f1f1c] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-[#00ff9d] mb-4">Context is everything</h2>
            <p className="text-[#8fb8ac] text-lg">We analyze three critical factors before making a single suggestion</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Your Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-[#243a34]/40 backdrop-blur-sm border-2 border-[#00ff9d]/20 rounded-2xl p-8 text-center hover:border-[#00ff9d]/40 transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ff9d]/20 to-[#00ff9d]/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10 text-[#00ff9d]" />
              </div>
              <div className="text-4xl mb-2">🕒</div>
              <h3 className="text-xl text-white mb-3">Your Time</h3>
              <p className="text-[#8fb8ac]">
                Whether you have 15 minutes or 3 hours
              </p>
            </motion.div>

            {/* Your Mood */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-[#243a34]/40 backdrop-blur-sm border-2 border-[#FFA500]/20 rounded-2xl p-8 text-center hover:border-[#FFA500]/40 transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFA500]/20 to-[#FFA500]/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-[#FFA500]" />
              </div>
              <div className="text-4xl mb-2">🎭</div>
              <h3 className="text-xl text-white mb-3">Your Mood</h3>
              <p className="text-[#8fb8ac]">
                From "Social Butterfly" to "Zen Seeker"
              </p>
            </motion.div>

            {/* Your World */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-[#243a34]/40 backdrop-blur-sm border-2 border-[#00ff9d]/20 rounded-2xl p-8 text-center hover:border-[#00ff9d]/40 transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ff9d]/20 to-[#00ff9d]/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CloudRain className="w-10 h-10 text-[#00ff9d]" />
              </div>
              <div className="text-4xl mb-2">🌦️</div>
              <h3 className="text-xl text-white mb-3">Your World</h3>
              <p className="text-[#8fb8ac]">
                Real-time weather and local crowd levels
              </p>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center mt-16"
          >
            <p className="text-[#8fb8ac] text-sm">
              No login required • Your data stays local • Free forever
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}