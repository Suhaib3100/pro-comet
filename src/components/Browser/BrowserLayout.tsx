'use client';

import { useBrowserStore } from '@/lib/stores/useBrowserStore';
import BrowserView from './BrowserView';
import MobileBrowserSearch from './MobileBrowserSearch';
import { cn } from '@/lib/utils';
import { Globe, MessageSquare, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BrowserLayoutProps {
  children: React.ReactNode;
}

const BrowserLayout = ({ children }: BrowserLayoutProps) => {
  const { isBrowserOpen, mobileView, setMobileView } = useBrowserStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: side-by-side layout
  if (!isMobile) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Chat/Search Panel */}
        <div
          className={cn(
            'transition-all duration-300 overflow-y-auto',
            isBrowserOpen ? 'w-1/2' : 'w-full'
          )}
        >
          {children}
        </div>

        {/* Browser Panel */}
        {isBrowserOpen && (
          <div className="w-1/2 h-full">
            <BrowserView />
          </div>
        )}
      </div>
    );
  }

  // Mobile: tabbed layout
  return (
    <div className="flex flex-col h-screen">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Chat View */}
        <div
          className={cn(
            'h-full overflow-y-auto smooth-transition',
            mobileView === 'chat' ? 'block animate-fade-in' : 'hidden'
          )}
        >
          {children}
        </div>

        {/* Search View - Hidden, not used in new mobile design */}
        <div
          className={cn(
            'h-full overflow-y-auto smooth-transition',
            mobileView === 'search' ? 'block animate-fade-in' : 'hidden'
          )}
        >
          <div className="flex flex-col h-full">
            <MobileBrowserSearch />
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <Search size={64} className="text-white/20 mb-4 mx-auto" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Quick Browser Access
                </h3>
                <p className="text-sm text-white/50 max-w-md">
                  Enter a URL or search term above to browse the web
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Browser View */}
        <div
          className={cn(
            'h-full smooth-transition',
            mobileView === 'browser' ? 'block animate-slide-up' : 'hidden'
          )}
        >
          <BrowserView />
        </div>
      </div>
    </div>
  );
};

export default BrowserLayout;
