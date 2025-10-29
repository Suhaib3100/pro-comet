import { create } from 'zustand';

interface BrowserState {
  // Current URL being displayed in the browser
  currentUrl: string | null;
  
  // History stack for back/forward navigation
  history: string[];
  historyIndex: number;
  
  // Browser panel visibility
  isBrowserOpen: boolean;
  
  // Mobile view mode: 'chat' | 'search' | 'browser'
  mobileView: 'chat' | 'search' | 'browser';
  
  // Actions
  navigateTo: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  closeBrowser: () => void;
  openBrowser: (url?: string) => void;
  setMobileView: (view: 'chat' | 'search' | 'browser') => void;
}

export const useBrowserStore = create<BrowserState>((set, get) => ({
  currentUrl: null,
  history: [],
  historyIndex: -1,
  isBrowserOpen: false,
  mobileView: 'chat',

  navigateTo: (url: string) => {
    const { history, historyIndex } = get();
    
    // Remove any forward history when navigating to a new URL
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    
    set({
      currentUrl: url,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      isBrowserOpen: true,
    });
  },

  goBack: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        currentUrl: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  goForward: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        currentUrl: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  reload: () => {
    const { currentUrl } = get();
    if (currentUrl) {
      // Force reload by setting to null then back to current URL
      set({ currentUrl: null });
      setTimeout(() => set({ currentUrl }), 10);
    }
  },

  closeBrowser: () => {
    set({ isBrowserOpen: false });
  },

  openBrowser: (url?: string) => {
    if (url) {
      get().navigateTo(url);
    } else {
      set({ isBrowserOpen: true });
    }
  },

  setMobileView: (view: 'chat' | 'search' | 'browser') => {
    set({ mobileView: view });
  },
}));
