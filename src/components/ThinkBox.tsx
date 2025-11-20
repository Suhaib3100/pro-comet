'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, BrainCircuit } from 'lucide-react';

interface ThinkBoxProps {
  content: string;
  thinkingEnded: boolean;
}

const ThinkBox = ({ content, thinkingEnded }: ThinkBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (thinkingEnded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [thinkingEnded]);

  return (
    <div className="my-4 glass rounded-2xl liquid-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-1 text-white/90 hover:bg-white/5 smooth-transition"
      >
        <div className="flex items-center space-x-2">
          <BrainCircuit
            size={20}
            className="text-purple-400"
          />
          <p className="font-medium text-sm">Thinking Process</p>
        </div>
        {isExpanded ? (
          <ChevronUp size={18} className="text-white/70" />
        ) : (
          <ChevronDown size={18} className="text-white/70" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 py-3 text-white/80 text-sm border-t border-white/10 bg-white/5 whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  );
};

export default ThinkBox;
