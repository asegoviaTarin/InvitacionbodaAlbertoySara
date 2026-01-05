import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const guestNames = new URLSearchParams(window.location.search).get('names');

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Delay showing the full invitation until the animation progress suggests it
    setTimeout(() => {
      setShowInvitation(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!showInvitation && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="z-50"
          >
            <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} guestNames={guestNames} />
          </motion.div>
        )}
      </AnimatePresence>

      {showInvitation && (
        <motion.div
          key="invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full overflow-y-auto"
        >
          <Invitation />
        </motion.div>
      )}
    </div>
  );
}

export default App;
