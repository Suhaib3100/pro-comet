'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Search, Zap, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: Sparkles,
    title: 'AI-Powered Search',
    description: 'Get instant answers powered by advanced AI technology',
    gradient: 'from-purple-500/20 to-blue-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Search,
    title: 'Deep Research',
    description: 'Search the web and get comprehensive results in seconds',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'Built-in Browser',
    description: 'Browse any website directly within the app',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for mobile with smooth, native-like performance',
    gradient: 'from-teal-500/20 to-green-500/20',
    iconColor: 'text-teal-400',
  },
];

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-white/60 hover:text-white smooth-transition text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon with gradient background */}
            <div className={cn('relative mb-8')}>
              <div
                className={cn(
                  'absolute inset-0 blur-3xl rounded-full',
                  `bg-gradient-to-br ${slide.gradient}`
                )}
              />
              <div className="relative glass-strong p-8 rounded-full">
                <Icon size={64} className={cn('animate-glow', slide.iconColor)} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-lg text-white/70 max-w-sm animate-slide-up">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 px-6">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2 rounded-full smooth-transition',
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 smooth-transition active:scale-[0.98] shadow-xl shadow-purple-500/30"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight size={20} />
            </>
          ) : (
            'Get Started'
          )}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
