# AI-Powered Browser Feature

## Overview
Perplexica now includes an integrated browser interface that allows users to browse websites directly within the app, alongside the AI chat and search functionality.

## Features

### 🌐 In-App Browser
- **Embedded browsing**: Click any search result link to open it inside the app
- **Browser controls**: Back, Forward, Reload buttons
- **Editable URL bar**: Type URLs or search queries directly
- **Open in new tab**: External link button for sites that block iframes

### 📱 Responsive Design
- **Desktop**: Side-by-side layout with chat/search on left, browser on right
- **Mobile**: Tab-based navigation with:
  - **Chat tab**: AI conversation interface
  - **Search tab**: Quick browser access with URL/search input
  - **Browser tab**: Active webpage view (appears when a page is loaded)

### 🔒 Security
- Proper iframe sandboxing with restricted permissions
- CORS-aware with fallback to external browser for blocked sites
- Secure referrer policy

### 🎨 Design
- Clean, minimal interface inspired by Arc Browser and Brave AI
- Smooth transitions and animations
- Dark mode support
- Responsive layout adapts to screen size

## Usage

### Desktop
1. Click the **Globe icon** in the sidebar to toggle browser panel
2. Click any search result to open it in the browser
3. Use browser controls to navigate
4. Browser panel appears alongside chat (50/50 split)

### Mobile
1. Use bottom tabs to switch between **Chat**, **Search**, and **Browser**
2. **Search tab**: Enter URLs or search queries
3. Quick access buttons for popular sites (Google, YouTube, Wikipedia, GitHub)
4. When a page loads, **Browser tab** appears automatically

## Components

### Core Files
- `src/lib/stores/useBrowserStore.ts` - Zustand state management
- `src/components/Browser/BrowserView.tsx` - Main browser component with iframe
- `src/components/Browser/BrowserLayout.tsx` - Responsive layout wrapper
- `src/components/Browser/MobileBrowserSearch.tsx` - Mobile search interface
- `src/components/Layout.tsx` - Updated to integrate browser
- `src/components/MessageSources.tsx` - Updated to intercept link clicks
- `src/components/Sidebar.tsx` - Added browser toggle button

### State Management
Uses Zustand for:
- Current URL tracking
- Navigation history (back/forward)
- Browser panel visibility
- Mobile view mode switching

## Known Limitations

### CORS/X-Frame-Options
Many websites block iframe embedding for security reasons. When this happens:
- The iframe will show a blank page or error
- Use the "Open in new tab" button (↗) to view the site externally
- Common blocked sites: Twitter/X, Facebook, Instagram, banking sites

### Workarounds
- Sites like Google, Wikipedia, YouTube, GitHub generally work
- For blocked sites, the external link button opens them in a new browser tab
- Consider implementing a proxy service for better compatibility (future enhancement)

## Future Enhancements
- [ ] Browser history panel
- [ ] Bookmarks/favorites
- [ ] Multiple tabs support
- [ ] Proxy service for CORS-blocked sites
- [ ] Reader mode for articles
- [ ] Screenshot/save page functionality
- [ ] Browser extension support

## Dependencies
- `zustand` - State management library (added)
- Existing: `lucide-react`, `framer-motion`, `tailwindcss`
