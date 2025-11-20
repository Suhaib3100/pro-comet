import { Settings } from 'lucide-react';
import { useState } from 'react';
import SettingsDialogue from './SettingsDialogue';
import { AnimatePresence } from 'framer-motion';

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="p-2.5 rounded-2xl glass liquid-border hover:bg-white/10 smooth-transition cursor-pointer active:scale-95"
        onClick={() => setIsOpen(true)}
      >
        <Settings size={19} className="cursor-pointer text-white/90" />
      </div>
      <AnimatePresence>
        {isOpen && <SettingsDialogue isOpen={isOpen} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};

export default SettingsButton;
