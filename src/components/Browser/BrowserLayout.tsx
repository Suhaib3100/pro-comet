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
            'h-full overflow-y-auto transition-opacity duration-200',
            mobileView === 'chat' ? 'block' : 'hidden'
          )}
        >
          {children}
        </div>

        {/* Search View */}
        <div
          className={cn(
            'h-full overflow-y-auto transition-opacity duration-200',
            mobileView === 'search' ? 'block' : 'hidden'
          )}
        >
          <div className="flex flex-col h-full">
            <MobileBrowserSearch />
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <Search size={64} className="text-black/20 dark:text-white/20 mb-4 mx-auto" />
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">
                  Quick Browser Access
                </h3>
                <p className="text-sm text-black/50 dark:text-white/50 max-w-md">
                  Enter a URL or search term above to browse the web
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Browser View */}
        {isBrowserOpen && (
          <div
            className={cn(
              'h-full transition-opacity duration-200',
              mobileView === 'browser' ? 'block' : 'hidden'
            )}
          >
            <BrowserView />
          </div>
        )}
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="flex border-t border-light-200 dark:border-dark-200 bg-light-secondary dark:bg-dark-secondary">
        <button
          onClick={() => setMobileView('chat')}
          className={cn(
            'flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors',
            mobileView === 'chat'
              ? 'text-black dark:text-white bg-light-primary dark:bg-dark-primary'
              : 'text-black/50 dark:text-white/50'
          )}
        >
          <MessageSquare size={20} />
          <span className="text-xs font-medium">Chat</span>
        </button>

        <button
          onClick={() => setMobileView('search')}
          className={cn(
            'flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors',
            mobileView === 'search'
              ? 'text-black dark:text-white bg-light-primary dark:bg-dark-primary'
              : 'text-black/50 dark:text-white/50'
          )}
        >
          <Search size={20} />
          <span className="text-xs font-medium">Search</span>
        </button>

        {isBrowserOpen && (
          <button
            onClick={() => setMobileView('browser')}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors',
              mobileView === 'browser'
                ? 'text-black dark:text-white bg-light-primary dark:bg-dark-primary'
                : 'text-black/50 dark:text-white/50'
            )}
          >
            <Globe size={20} />
            <span className="text-xs font-medium">Browser</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowserLayout;
