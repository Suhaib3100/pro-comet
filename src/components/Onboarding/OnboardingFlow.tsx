'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './WelcomeScreen';
import AuthScreen from './AuthScreen';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<'welcome' | 'auth' | 'complete'>('welcome');

  const handleWelcomeComplete = () => {
    setStep('auth');
  };

  const handleAuthComplete = () => {
    setStep('complete');
    onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      {step === 'welcome' && (
        <WelcomeScreen key="welcome" onComplete={handleWelcomeComplete} />
      )}
      {step === 'auth' && (
        <AuthScreen key="auth" onComplete={handleAuthComplete} />
      )}
    </AnimatePresence>
  );
};

export default OnboardingFlow;
