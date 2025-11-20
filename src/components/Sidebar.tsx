'use client';

import { cn } from '@/lib/utils';
import {
  BookOpenText,
  Home,
  Search,
  SquarePen,
  Settings,
  Plus,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import SettingsButton from './Settings/SettingsButton';
import { useBrowserStore } from '@/lib/stores/useBrowserStore';

const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center w-full">{children}</div>;
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { isBrowserOpen, openBrowser, closeBrowser } = useBrowserStore();

  const navLinks = [
    {
      icon: Home,
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: 'Home',
    },
    {
      icon: Search,
      href: '/discover',
      active: segments.includes('discover'),
      label: 'Discover',
    },
    {
      icon: BookOpenText,
      href: '/library',
      active: segments.includes('library'),
      label: 'Library',
    },
  ];

  const handleBrowserToggle = () => {
    if (isBrowserOpen) {
      closeBrowser();
    } else {
      openBrowser();
    }
  };

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[72px] lg:flex-col border-r border-white/5">
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto glass-strong px-2 py-8">
          <a
            className="p-2.5 rounded-2xl glass liquid-border hover:bg-white/10 smooth-transition"
            href="/"
          >
            <Plus size={19} className="cursor-pointer text-white/90" />
          </a>
          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'relative flex flex-col items-center justify-center space-y-0.5 cursor-pointer w-full py-2 rounded-xl smooth-transition',
                  link.active
                    ? 'text-white/90'
                    : 'text-white/50',
                )}
              >
                <div
                  className={cn(
                    link.active && 'glass',
                    'group rounded-2xl hover:glass hover:bg-white/5 smooth-transition',
                  )}
                >
                  <link.icon
                    size={25}
                    className={cn(
                      !link.active && 'group-hover:scale-105',
                      'smooth-transition m-1.5',
                    )}
                  />
                </div>
                <p
                  className={cn(
                    link.active
                      ? 'text-white/90'
                      : 'text-white/60',
                    'text-[10px]',
                  )}
                >
                  {link.label}
                </p>
              </Link>
            ))}
            
            {/* Browser Toggle Button */}
            <button
              onClick={handleBrowserToggle}
              className={cn(
                'relative flex flex-col items-center justify-center space-y-0.5 cursor-pointer w-full py-2 rounded-xl smooth-transition',
                isBrowserOpen
                  ? 'text-white/90'
                  : 'text-white/50',
              )}
            >
              <div
                className={cn(
                  isBrowserOpen && 'glass',
                  'group rounded-2xl hover:glass hover:bg-white/5 smooth-transition',
                )}
              >
                <Globe
                  size={25}
                  className={cn(
                    !isBrowserOpen && 'group-hover:scale-105',
                    'smooth-transition m-1.5',
                  )}
                />
              </div>
              <p
                className={cn(
                  isBrowserOpen
                    ? 'text-white/90'
                    : 'text-white/60',
                  'text-[10px]',
                )}
              >
                Browser
              </p>
            </button>
          </VerticalIconContainer>

          <SettingsButton />
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 flex flex-row items-center justify-around glass-strong px-3 py-3 border-t border-white/10 lg:hidden backdrop-blur-2xl">
        {navLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className={cn(
              'relative flex flex-col items-center space-y-1 text-center px-4 py-2 rounded-2xl smooth-transition min-w-[70px]',
              link.active
                ? 'text-white bg-white/10'
                : 'text-white/50',
            )}
          >
            <link.icon size={22} strokeWidth={link.active ? 2.5 : 2} />
            <p className="text-[10px] font-medium">{link.label}</p>
          </Link>
        ))}
        <button
          onClick={handleBrowserToggle}
          className={cn(
            'relative flex flex-col items-center space-y-1 text-center px-4 py-2 rounded-2xl smooth-transition min-w-[70px]',
            isBrowserOpen
              ? 'text-white bg-white/10'
              : 'text-white/50',
          )}
        >
          <Globe size={22} strokeWidth={isBrowserOpen ? 2.5 : 2} />
          <p className="text-[10px] font-medium">Browser</p>
        </button>
      </div>

      <Layout>{children}</Layout>
    </div>
  );
};

export default Sidebar;
