import { Settings } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import { File } from './ChatWindow';
import Link from 'next/link';
import WeatherWidget from './WeatherWidget';
import NewsArticleWidget from './NewsArticleWidget';
import SettingsButtonMobile from '@/components/Settings/SettingsButtonMobile';

const EmptyChat = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-10 lg:hidden">
        <SettingsButtonMobile />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] max-w-screen-sm mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col items-center justify-center w-full space-y-6 lg:space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              AI Search Engine
            </h2>
            <p className="text-white/60 text-sm sm:text-base">Ask anything, get instant answers</p>
          </div>
          <EmptyChatMessageInput />
        </div>
        <div className="flex flex-col w-full gap-3 sm:gap-4 sm:flex-row sm:justify-center animate-slide-up">
          <div className="flex-1 w-full">
            <WeatherWidget />
          </div>
          <div className="flex-1 w-full">
            <NewsArticleWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
