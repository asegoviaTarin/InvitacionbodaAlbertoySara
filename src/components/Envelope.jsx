import { motion } from 'framer-motion';

const Envelope = ({ isOpen, onOpen, guestNames }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-wedding-cream overflow-hidden">
      <motion.div
        className="relative z-50 cursor-pointer shadow-2xl rounded-xl overflow-hidden"
        onClick={!isOpen ? onOpen : undefined}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          y: isOpen ? -100 : 0,
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="relative">
             <img 
                src="/envelope-cover.jpg" 
                alt="Sobre de Invitación" 
                className="max-w-sm w-full h-auto object-cover scale-[1.03]"
            />
            {guestNames && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 z-10">
                    <span className="font-serif italic text-2xl md:text-3xl text-stone-700 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm">
                        {guestNames}
                    </span>
                </div>
            )}
        </div>
        
        {/* Pulse Hint */}
        {!isOpen && (
            <motion.div
                className="absolute bottom-10 left-0 right-0 text-center text-stone-600 font-serif tracking-widest text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                (Toca para abrir)
            </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Envelope;
