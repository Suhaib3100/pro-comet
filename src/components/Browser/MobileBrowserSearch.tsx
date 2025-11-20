'use client';

import { useState, KeyboardEvent } from 'react';
import { Globe, Search } from 'lucide-react';
import { useBrowserStore } from '@/lib/stores/useBrowserStore';

const MobileBrowserSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const { navigateTo, setMobileView } = useBrowserStore();

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    let url = searchInput.trim();
    
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
    setMobileView('browser');
    setSearchInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 bg-light-primary dark:bg-dark-primary">
      <div className="flex items-center gap-2 bg-light-secondary dark:bg-dark-secondary rounded-lg px-4 py-3 border border-light-200 dark:border-dark-200">
        <Globe size={20} className="text-black/50 dark:text-white/50" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search or enter URL..."
          className="flex-1 bg-transparent outline-none text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
        />
        <button
          onClick={handleSearch}
          className="p-2 rounded-lg bg-light-200 dark:bg-dark-200 hover:bg-light-100 dark:hover:bg-dark-100 transition-colors"
        >
          <Search size={18} className="text-black dark:text-white" />
        </button>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {['Google', 'YouTube', 'Wikipedia', 'GitHub'].map((site) => {
          const urls: Record<string, string> = {
            Google: 'https://www.google.com',
            YouTube: 'https://www.youtube.com',
            Wikipedia: 'https://www.wikipedia.org',
            GitHub: 'https://github.com',
          };
          
          return (
            <button
              key={site}
              onClick={() => {
                navigateTo(urls[site]);
                setMobileView('browser');
              }}
              className="px-3 py-1.5 text-xs rounded-full bg-light-200 dark:bg-dark-200 text-black dark:text-white hover:bg-light-100 dark:hover:bg-dark-100 transition-colors"
            >
              {site}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBrowserSearch;
