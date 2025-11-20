import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';
import Attach from './MessageInputActions/Attach';
import { useChat } from '@/lib/hooks/useChat';
import ModelSelector from './MessageInputActions/ChatModelSelector';

const EmptyChatMessageInput = () => {
  const { sendMessage } = useChat();

  /* const [copilotEnabled, setCopilotEnabled] = useState(false); */
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(message);
          setMessage('');
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col glass-strong px-4 sm:px-5 pt-4 sm:pt-5 pb-3 rounded-3xl w-full liquid-border shadow-xl shadow-black/50 focus-within:shadow-purple-500/20 smooth-transition">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={1}
          maxRows={4}
          className="px-2 bg-transparent placeholder:text-sm sm:placeholder:text-[15px] placeholder:text-white/40 text-sm sm:text-base text-white resize-none focus:outline-none w-full"
          placeholder="Ask anything..."
        />
        <div className="flex flex-row items-center justify-between mt-3 sm:mt-4">
          <div className="hidden sm:block">
            <Optimization />
          </div>
          <div className="flex flex-row items-center space-x-1.5 sm:space-x-2 ml-auto">
            <div className="hidden sm:flex flex-row items-center space-x-1">
              <ModelSelector />
              <Focus />
              <Attach />
            </div>
            <button
              disabled={message.trim().length === 0}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:text-white/30 disabled:from-white/10 disabled:to-white/10 hover:from-purple-600 hover:to-blue-600 smooth-transition rounded-full p-3 sm:p-2.5"
            >
              <ArrowRight className="w-5 h-5 sm:w-[17px] sm:h-[17px]" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;
