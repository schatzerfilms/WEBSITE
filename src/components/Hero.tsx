import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/IMAGE.mov"
        onLoadedMetadata={(e) => {
          (e.target as HTMLVideoElement).currentTime = 2;
        }}
        onCanPlay={() => setVideoReady(true)}
      />

      {/* Black fade-in overlay */}
      <div
        className={`absolute inset-0 bg-black z-[5] transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${videoReady ? 'opacity-0' : 'opacity-100'
          }`}
      />

      {/* Dark Overlay – gradient for better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/100" />

      {/* Centered Logo + Tagline */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.img
          src="/Zeichenflache_2_Kopie_2-2.png"
          alt="SCHATZERFilms Logo"
          className="w-64 md:w-96 lg:w-[28rem] h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isScrolled ? 0 : 1,
            scale: isScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-6 text-xs md:text-sm tracking-[0.4em] uppercase text-white/40 font-sans font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isScrolled ? 0 : 1,
            y: isScrolled ? 10 : 0,
          }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Videography · Photography
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}