'use client';

import { User, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { UIConfigField } from '@/lib/config/types';

const Account = ({
  fields,
  values,
}: {
  fields?: UIConfigField[];
  values?: Record<string, any>;
} = {}) => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('isGuest');
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem('hasSeenOnboarding');
    toast.success('Onboarding reset');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const userName = localStorage.getItem('userName');
  const isGuest = localStorage.getItem('isGuest') === 'true';

  return (
    <div className="px-6 py-4 space-y-4">
      {/* User Info */}
      <div className="glass liquid-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full glass">
            <User size={24} className="text-white/70" />
          </div>
          <div>
            <p className="text-white font-medium">
              {isGuest ? 'Guest User' : userName || 'User'}
            </p>
            <p className="text-white/50 text-sm">
              {isGuest ? 'Browse without an account' : 'Premium Member'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleResetOnboarding}
          className="w-full glass liquid-border hover:bg-white/5 smooth-transition rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98]"
        >
          <RefreshCw size={20} className="text-purple-400" />
          <div className="text-left flex-1">
            <p className="text-white font-medium text-sm">View Onboarding</p>
            <p className="text-white/50 text-xs">See welcome screens again</p>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full glass liquid-border hover:bg-red-500/10 smooth-transition rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98]"
        >
          <LogOut size={20} className="text-red-400" />
          <div className="text-left flex-1">
            <p className="text-white font-medium text-sm">Logout</p>
            <p className="text-white/50 text-xs">Sign out of your account</p>
          </div>
        </button>
      </div>

      {/* Info */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-white/40 text-xs text-center">
          Pro Comet AI Search Engine
          <br />
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Account;
