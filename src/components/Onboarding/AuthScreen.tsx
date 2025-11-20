'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthScreenProps {
  onComplete: () => void;
}

const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  const [mode, setMode] = useState<'welcome' | 'login' | 'signup'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store auth state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('hasSeenOnboarding', 'true');
    if (mode === 'signup' && name) {
      localStorage.setItem('userName', name);
    }

    setIsLoading(false);
    onComplete();
  };

  const handleGuestMode = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('hasSeenOnboarding', 'true');
    localStorage.setItem('isGuest', 'true');
    onComplete();
  };

  if (mode === 'welcome') {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30" />
              <div className="relative glass-strong p-6 rounded-3xl">
                <Sparkles size={48} className="text-purple-400 animate-glow" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white text-center mb-3">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Search Engine
            </span>
          </h1>

          <p className="text-white/60 text-center mb-12">
            Your intelligent search companion
          </p>

          {/* Auth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setMode('signup')}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg smooth-transition active:scale-[0.98] shadow-xl shadow-purple-500/30"
            >
              Create Account
            </button>

            <button
              onClick={() => setMode('login')}
              className="w-full glass-strong liquid-border hover:bg-white/10 text-white py-4 rounded-2xl font-semibold text-lg smooth-transition active:scale-[0.98]"
            >
              Sign In
            </button>

            <button
              onClick={handleGuestMode}
              className="w-full text-white/60 hover:text-white py-4 rounded-2xl font-medium smooth-transition"
            >
              Continue as Guest
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button
          onClick={() => setMode('welcome')}
          className="text-white/60 hover:text-white smooth-transition"
        >
          ← Back
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-white/60 mb-8">
            {mode === 'login'
              ? 'Sign in to continue your journey'
              : 'Join us and start exploring'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === 'signup' && (
              <div className="glass-strong liquid-border rounded-2xl p-4 flex items-center gap-3">
                <User size={20} className="text-white/50" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                  required
                />
              </div>
            )}

            <div className="glass-strong liquid-border rounded-2xl p-4 flex items-center gap-3">
              <Mail size={20} className="text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                required
              />
            </div>

            <div className="glass-strong liquid-border rounded-2xl p-4 flex items-center gap-3">
              <Lock size={20} className="text-white/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                required
              />
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 text-sm smooth-transition"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-white/10 disabled:to-white/10 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 smooth-transition active:scale-[0.98] shadow-xl shadow-purple-500/30 mt-6"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-purple-400 hover:text-purple-300 font-medium smooth-transition"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;
