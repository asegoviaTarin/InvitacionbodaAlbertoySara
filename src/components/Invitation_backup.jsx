import { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MapPin, 
  Music, 
  Navigation, 
  Gift, 
  Camera, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Utensils,
  Wine,
  PartyPopper,
  Home,
  MessageCircle,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RSVPForm from './RSVPForm';

const Invitation = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2026-09-26T12:30:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Audio auto-play attempt on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            // Note: Browsers often block autoplay without interaction. 
            // The user interaction of opening the envelope might count if passed down, 
            // but for now we'll defaults to manual or try autostart if allowed.
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => setIsPlaying(true))
                .catch(error => console.log("Autoplay blocked:", error));
            }
        }
    }, []);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

  return (
    <div className="min-h-screen bg-wedding-cream text-stone-800 pb-24 font-sans selection:bg-wedding-gold selection:text-white">
        {/* Hidden Audio Element - employing a placeholder generic wedding track or asking user to provide */}
        <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-wedding-bells-colors-558.mp3" />

        {/* Floating Music Control */}
        <button 
            onClick={toggleAudio}
            className="fixed bottom-24 right-4 z-50 w-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center border border-wedding-gold/20 text-wedding-gold animate-bounce-slow"
        >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
        </button>

        {/* Scroll Progress / Back to Top (optional enhancement) */}
        

        {/* Hero Section */}
        <header id="home" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
             {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img 
                    src="/hero-main.jpg" 
                    alt="Boda Alberto & Sara - 26 Sep 2026" 
                    className="w-full h-full object-cover object-center"
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Text Overlay Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center text-center space-y-2 h-full pb-20 px-4"
            >
                <div className="space-y-4 md:space-y-6">
                    <p className="text-white text-xs md:text-sm uppercase tracking-[0.4em] font-medium shadow-black/20 drop-shadow-sm">
                        NOS CASAMOS
                    </p>
                    
                    <div className="flex flex-col items-center -space-y-2 drop-shadow-md">
                        <h1 className="font-serif text-6xl md:text-8xl text-white">Alberto</h1>
                        <span className="font-serif text-4xl md:text-5xl text-wedding-gold italic py-1">&</span>
                        <h1 className="font-serif text-6xl md:text-8xl text-white">Sara</h1>
                    </div>

                    {/* Decorative Divider */}
                    <div className="flex items-center gap-4 w-40 md:w-48 mx-auto opacity-80 pt-2">
                        <div className="h-[1px] bg-white/60 flex-1"></div>
                        <div className="text-wedding-gold text-lg md:text-xl">✦</div>
                        <div className="h-[1px] bg-white/60 flex-1"></div>
                    </div>

                    <p className="font-serif italic text-white/90 text-lg md:text-xl drop-shadow-sm">
                        26 de septiembre de 2026
                    </p>
                </div>

                <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3">
                    <p className="text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium animate-pulse drop-shadow-md">
                        CONFIRMA TU ASISTENCIA
                    </p>
                    <ChevronUp className="w-6 h-6 animate-bounce text-white" />
                </div>
            </motion.div>
        </header>

        {/* Content Container */}
        <div className="relative z-10 bg-wedding-cream shadow-[0_-20px_40px_rgba(0,0,0,0.1)] rounded-t-3xl -mt-6 pt-12">
        {/* Quote / Intro Section */}
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="py-20 px-6 max-w-2xl mx-auto text-center"
        >
            <p className="font-serif text-2xl italic text-stone-600 leading-relaxed">
                "Y así comienza la aventura..."
            </p>
        </motion.section>

        {/* Location Section */}
        <section className="py-20 px-6 bg-white/50">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-4xl mx-auto text-center space-y-12"
            >
                {/* Header Group */}
                <motion.div variants={fadeInUp} className="flex flex-col items-center space-y-6">
                    <div className="w-16 h-16 bg-[#e3e3dc] rounded-full flex items-center justify-center mb-2">
                         <MapPin className="w-8 h-8 text-[#6b705c]" strokeWidth={1.5} />
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="font-serif text-4xl text-stone-800">Localización</h2>
                        <h3 className="font-serif text-2xl text-stone-600">Finca Loma de Doña Valle</h3>
                        
                        <div className="flex items-center justify-center gap-2 text-stone-500 font-sans tracking-wide text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Desde las 12:30h</span>
                        </div>
                    </div>
                </motion.div>

                {/* Venue Image */}
                <motion.div 
                    variants={fadeInUp}
                    className="w-full relative rounded-lg overflow-hidden shadow-lg aspect-[16/9]"
                >
                    <img 
                        src="/location-venue.png" 
                        alt="Vista aérea de la Finca" 
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <a 
                        href="https://goo.gl/maps/YOUR_LINK_HERE" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-wedding-olive text-white rounded-full hover:bg-stone-700 transition-colors uppercase tracking-widest text-xs font-medium"
                    >
                        Ver en Mapa
                    </a>
                </motion.div>
            </motion.div>
        </section>


        {/* Countdown Section */}
        <section className="py-12 px-6 flex justify-center bg-transparent -mt-10 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#7e8c6e] p-6 md:p-10 rounded-xl shadow-xl text-center w-full max-w-4xl mx-auto"
            >
                <div className="space-y-2 mb-8 text-white">
                    <h3 className="font-serif text-3xl md:text-4xl italic">Cuenta atrás</h3>
                    <p className="text-white/80 text-sm tracking-wide font-sans">Para el día más especial de nuestras vidas</p>
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-lg mx-auto">
                     {[
                        { val: timeLeft.days, label: "DÍAS" },
                        { val: timeLeft.hours, label: "HORAS" },
                        { val: timeLeft.minutes, label: "MINUTOS" },
                        { val: timeLeft.seconds, label: "SEGUNDOS" }
                     ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center border border-white/30 bg-white/5 rounded-lg py-3 md:py-6 aspect-[3/4] md:aspect-square">
                            <span className="text-3xl md:text-5xl font-serif mb-1 md:mb-2 text-white">
                                {item.val}
                            </span>
                            <span className="text-[7px] md:text-[10px] uppercase tracking-widest text-white/70 w-full overflow-hidden text-ellipsis px-0.5">
                                {item.label}
                            </span>
                        </div>
                     ))}
                </div>
            </motion.div>
        </section>

        {/* Timeline / Programa del día */}
        <section id="timeline" className="py-20 bg-[#f5f0e6] overflow-hidden">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-6xl mx-auto px-6"
            >
                <div className="text-center mb-16 space-y-4">
                     <motion.h2 variants={fadeInUp} className="font-serif text-5xl text-[#3a4030] italic">
                        Programa del día
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-[#6b705c] uppercase tracking-widest text-sm">
                        Lo que tenemos preparado para vosotros
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Desktop Horizontal Line */}
                    <div className="hidden md:block absolute top-[24px] left-0 w-full h-[1px] bg-[#3a4030]/20 z-0"></div>
                    
                    {/* Mobile Vertical Line */}
                    <div className="md:hidden absolute top-0 left-[23px] w-[1px] h-full bg-[#3a4030]/20 z-0"></div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                        {[
                            { time: "12:00", title: "Llegada", subtitle: "Bienvenida", icon: <Heart className="w-5 h-5" /> },
                            { time: "12:30", title: "Ceremonia", subtitle: "¡Sí, quiero!", icon: <MapPin className="w-5 h-5" /> },
                            { time: "13:30", title: "Cóctel", subtitle: "Aperitivos", icon: <Wine className="w-5 h-5" /> },
                            { time: "15:00", title: "Banquete", subtitle: "Celebración", icon: <Utensils className="w-5 h-5" /> },
                            { time: "19:00", title: "Fiesta", subtitle: "¡A bailar!", icon: <PartyPopper className="w-5 h-5" /> },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeInUp}
                                className="flex md:flex-col items-center md:flex-1 relative z-10 gap-6 md:gap-4"
                            >
                                {/* Icon Circle */}
                                <div className="w-12 h-12 rounded-full border border-[#3a4030]/30 bg-[#f5f0e6] flex items-center justify-center text-[#3a4030] shrink-0">
                                    {item.icon}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col md:items-center text-left md:text-center space-y-1 md:space-y-4">
                                     <span className="inline-block px-3 py-1 bg-[#3a4030] text-white rounded text-xs font-medium tracking-wider w-fit md:mx-auto">
                                        {item.time}
                                    </span>
                                    <div>
                                        <h4 className="font-serif text-xl text-[#3a4030]">{item.title}</h4>
                                        <p className="text-xs text-[#6b705c] uppercase tracking-wide">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>

        {/* Gallery / Story Stub */}
        <section id="gallery" className="py-20 bg-stone-100/50">
             <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-3xl mb-12"
                >
                    Nuestros Momentos
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                        "/gallery-1.jpg",
                        "/gallery-2.jpg",
                        "/gallery-3.jpg"
                     ].map((src, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3]"
                        >
                            <img 
                                src={src} 
                                alt={`Momento ${i + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                     ))}
                </div>
             </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="py-24 px-6 relative">
             <div className="max-w-xl mx-auto text-center space-y-12 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="space-y-4"
                >
                    <h3 className="font-serif text-4xl text-stone-800">Confirma tu Asistencia</h3>
                    <p className="text-stone-600">Nos haría mucha ilusión que nos acompañaras.</p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100"
                >
                    <RSVPForm />
                </motion.div>
             </div>
        </section>

        <footer className="text-center py-12 text-stone-400 text-sm pb-32">
            <p>Hecho con ❤️ para Alberto & Sara</p>
        </footer>
        </div> {/* End Content Container */}

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-full px-6 py-3 border border-stone-200/50 flex items-center gap-8">
            <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-stone-400 hover:text-wedding-gold transition-colors">
                <Home className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider">Inicio</span>
            </button>
            <button onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-stone-400 hover:text-wedding-gold transition-colors">
                <MapPin className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider">Lugar</span>
            </button>
            <div className="w-12 h-12 bg-wedding-gold rounded-full -mt-8 border-4 border-wedding-cream flex items-center justify-center text-white shadow-lg shrink-0">
                <Heart className="w-6 h-6 fill-current" />
            </div>
            <button onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-stone-400 hover:text-wedding-gold transition-colors">
                <ImageIcon className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider">Fotos</span>
            </button>
            <button onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-stone-400 hover:text-wedding-gold transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider">RSVP</span>
            </button>
        </div>
    </div>
  );
};

export default Invitation;
