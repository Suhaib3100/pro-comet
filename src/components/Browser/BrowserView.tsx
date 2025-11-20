'use client';

import { useBrowserStore } from '@/lib/stores/useBrowserStore';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  X,
  ExternalLink,
  Globe,
  ChevronLeft,
} from 'lucide-react';
import { useState, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

const BrowserView = () => {
  const {
    currentUrl,
    history,
    historyIndex,
    isBrowserOpen,
    goBack,
    goForward,
    reload,
    closeBrowser,
    navigateTo,
    setMobileView,
  } = useBrowserStore();

  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (currentUrl) {
      setUrlInput(currentUrl);
    }
  }, [currentUrl]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;

    let url = urlInput.trim();
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it looks like a domain (has TLD like .com, .in, .org, etc.)
      const domainPattern = /\.(com|in|org|net|edu|gov|co|io|ai|dev|app|tech|info|biz|me|tv|us|uk|ca|au|de|fr|jp|cn|ru|br|mx|es|it|nl|se|no|dk|fi|pl|cz|gr|tr|za|sg|hk|nz|kr|tw|th|my|id|ph|vn|pk|bd|eg|ng|ke|gh|ug|tz|zw|zm|mw|bw|na|ao|mz|et|sd|dz|ma|tn|ly|so|dj|er|gm|gn|lr|ml|mr|ne|sn|sl|tg|bf|bj|ci|cv|gw|st|ga|cg|cd|cf|cm|gq|td|rw|bi|km|sc|mu|re|yt|mg|mq|gp|bl|mf|pm|wf|pf|nc|vu|fj|sb|pg|ki|nr|tv|to|ws|as|gu|mp|pw|fm|mh)($|\/)/i;
      
      if (domainPattern.test(url) || (url.includes('.') && !url.includes(' '))) {
        url = 'https://' + url;
      } else {
        // Treat as search query
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }

    navigateTo(url);
    setIsLoading(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    if (currentUrl) {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isBrowserOpen) return null;

  return (
    <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-secondary border-l border-light-200 dark:border-dark-200">
      {/* Browser Controls */}
      <div className="flex flex-col border-b border-light-200 dark:border-dark-200 bg-light-primary dark:bg-dark-primary">
        {/* Top bar with navigation controls */}
        <div className="flex items-center gap-2 p-2">
          {/* Mobile Back Button */}
          {isMobile && (
            <button
              onClick={() => setMobileView('search')}
              className="p-2 rounded-lg hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white transition-colors lg:hidden"
              title="Back to search"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={cn(
              'p-2 rounded-lg transition-colors',
              canGoBack
                ? 'hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white'
                : 'text-black/30 dark:text-white/30 cursor-not-allowed'
            )}
            title="Go back"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={cn(
              'p-2 rounded-lg transition-colors',
              canGoForward
                ? 'hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white'
                : 'text-black/30 dark:text-white/30 cursor-not-allowed'
            )}
            title="Go forward"
          >
            <ArrowRight size={18} />
          </button>

          <button
            onClick={reload}
            disabled={!currentUrl}
            className={cn(
              'p-2 rounded-lg transition-colors',
              currentUrl
                ? 'hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white'
                : 'text-black/30 dark:text-white/30 cursor-not-allowed',
              isLoading && 'animate-spin'
            )}
            title="Reload"
          >
            <RefreshCw size={18} />
          </button>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 bg-light-secondary dark:bg-dark-secondary rounded-lg px-3 py-2 border border-light-200 dark:border-dark-200">
            <Globe size={16} className="text-black/50 dark:text-white/50" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL or search..."
              className="flex-1 bg-transparent outline-none text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            />
          </div>

          <button
            onClick={openInNewTab}
            disabled={!currentUrl}
            className={cn(
              'p-2 rounded-lg transition-colors',
              currentUrl
                ? 'hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white'
                : 'text-black/30 dark:text-white/30 cursor-not-allowed'
            )}
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </button>

          <button
            onClick={closeBrowser}
            className="p-2 rounded-lg hover:bg-light-200 dark:hover:bg-dark-200 text-black dark:text-white transition-colors"
            title="Close browser"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white dark:bg-black overflow-hidden">
        {currentUrl ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-light-primary/50 dark:bg-dark-primary/50 z-10">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="animate-spin text-black dark:text-white" size={24} />
                  <p className="text-sm text-black/70 dark:text-white/70">Loading...</p>
                </div>
              </div>
            )}
            <iframe
              key={currentUrl}
              src={currentUrl}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-popups-to-escape-sandbox allow-top-navigation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={handleIframeLoad}
              onError={() => {
                setIsLoading(false);
              }}
              title="Browser View"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Fallback message for blocked sites */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 rounded-lg px-4 py-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <p className="text-xs text-black/70 dark:text-white/70">
                Site blocked by CORS? Click "Open in new tab" ↗ to view externally
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Globe size={64} className="text-black/20 dark:text-white/20 mb-4" />
            <h3 className="text-lg font-medium text-black dark:text-white mb-2">
              No page loaded
            </h3>
            <p className="text-sm text-black/50 dark:text-white/50 max-w-md">
              Click on a link from search results or enter a URL above to browse
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserView;
