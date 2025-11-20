'use client';

import { useBrowserStore } from '@/lib/stores/useBrowserStore';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  X,
  ExternalLink,
  Globe,
  MessageSquare,
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
  const [useProxy, setUseProxy] = useState(false);

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
    <div className="flex flex-col h-full glass-strong border-l border-white/10">
      {/* Browser Controls */}
      <div className="flex flex-col border-b border-white/10 glass backdrop-blur-2xl">
        {/* Top bar with navigation controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3">
          {/* Mobile Back to Chat Button */}
          {isMobile && (
            <button
              onClick={() => setMobileView('chat')}
              className="p-2 sm:p-2.5 rounded-xl glass liquid-border hover:bg-white/10 text-white smooth-transition active:scale-95 lg:hidden"
              title="Back to chat"
            >
              <MessageSquare size={18} />
            </button>
          )}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={cn(
              'p-2 sm:p-2.5 rounded-xl smooth-transition',
              canGoBack
                ? 'glass liquid-border hover:bg-white/10 text-white active:scale-95'
                : 'text-white/30 cursor-not-allowed'
            )}
            title="Go back"
          >
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={cn(
              'p-2 sm:p-2.5 rounded-xl smooth-transition',
              canGoForward
                ? 'glass liquid-border hover:bg-white/10 text-white active:scale-95'
                : 'text-white/30 cursor-not-allowed'
            )}
            title="Go forward"
          >
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          <button
            onClick={reload}
            disabled={!currentUrl}
            className={cn(
              'p-2 sm:p-2.5 rounded-xl smooth-transition',
              currentUrl
                ? 'glass liquid-border hover:bg-white/10 text-white active:scale-95'
                : 'text-white/30 cursor-not-allowed',
              isLoading && 'animate-spin'
            )}
            title="Reload"
          >
            <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 glass-strong rounded-2xl px-3 py-2 liquid-border">
            <Globe size={14} className="text-white/50 hidden sm:block" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="URL or search..."
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-white placeholder:text-white/40"
            />
          </div>

          <button
            onClick={openInNewTab}
            disabled={!currentUrl}
            className={cn(
              'p-2 sm:p-2.5 rounded-xl smooth-transition hidden sm:block',
              currentUrl
                ? 'glass liquid-border hover:bg-white/10 text-white active:scale-95'
                : 'text-white/30 cursor-not-allowed'
            )}
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </button>

          <button
            onClick={closeBrowser}
            className="p-2 sm:p-2.5 rounded-xl glass liquid-border hover:bg-white/10 text-white smooth-transition active:scale-95 hidden lg:block"
            title="Close browser"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {currentUrl ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center glass-strong z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="animate-spin text-white" size={32} />
                  <p className="text-sm text-white/70">Loading page...</p>
                </div>
              </div>
            )}
            <iframe
              key={currentUrl}
              src={useProxy ? `/api/proxy?url=${encodeURIComponent(currentUrl)}` : currentUrl}
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
            
            {/* Proxy Toggle */}
            <div className="absolute top-4 right-4 z-30">
              <button
                onClick={() => setUseProxy(!useProxy)}
                className={cn(
                  'glass-strong liquid-border rounded-2xl px-4 py-2 text-xs font-medium smooth-transition active:scale-95 shadow-xl',
                  useProxy ? 'bg-purple-500/20 text-purple-300' : 'text-white/70'
                )}
                title="Toggle proxy to bypass frame restrictions"
              >
                {useProxy ? '🔓 Proxy ON' : '🔒 Proxy OFF'}
              </button>
            </div>
            
            {/* CORS Blocked Message Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-strong liquid-border rounded-3xl p-6 max-w-sm mx-4 text-center pointer-events-none z-20" style={{display: 'none'}} id="cors-message">
              <ExternalLink className="text-purple-400 mx-auto mb-3" size={48} />
              <h3 className="text-white font-semibold text-lg mb-2">Site Blocked</h3>
              <p className="text-white/70 text-sm mb-4">
                This site cannot be displayed in a frame due to security restrictions.
              </p>
              <button
                onClick={openInNewTab}
                className="glass liquid-border px-6 py-3 rounded-2xl text-white hover:bg-white/10 smooth-transition pointer-events-auto"
              >
                Open in New Tab
              </button>
            </div>
            
            {/* Mobile Floating Back Button */}
            {isMobile && (
              <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 lg:hidden">
                <button
                  onClick={openInNewTab}
                  className="p-3.5 rounded-full glass-strong liquid-border shadow-2xl shadow-blue-500/20 hover:bg-white/10 text-white smooth-transition active:scale-95"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={() => setMobileView('chat')}
                  className="p-3.5 rounded-full glass-strong liquid-border shadow-2xl shadow-purple-500/20 hover:bg-white/10 text-white smooth-transition active:scale-95"
                  title="Back to chat"
                >
                  <MessageSquare size={18} />
                </button>
              </div>
            )}
            
            {/* Quick tip for blocked sites */}
            <div className="absolute bottom-20 sm:bottom-4 left-1/2 transform -translate-x-1/2 glass-strong liquid-border rounded-2xl px-4 py-2.5 shadow-xl pointer-events-none max-w-[90%] sm:max-w-none">
              <p className="text-xs text-white/70 text-center">
                💡 Toggle Proxy ON if site won't load • Some sites may still block
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Globe size={64} className="text-white/20 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No page loaded
            </h3>
            <p className="text-sm text-white/50 max-w-md">
              Tap a link from search results or enter a URL above
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserView;
