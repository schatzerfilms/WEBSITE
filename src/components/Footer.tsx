import { motion } from 'framer-motion';
import { InstagramIcon, YoutubeIcon, VideoIcon } from 'lucide-react';
import { ShinyButton } from './ShinyButton';
import { siteConfig } from '../config';

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-surface pt-32 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-12">
            <ShinyButton href="#work">
              More Work
            </ShinyButton>
          </div>

          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-block text-xl md:text-2xl font-sans font-bold text-gray-300 hover:text-white transition-colors duration-300 mb-16 relative group"
          >
            {siteConfig.contactEmail}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/30 group-hover:bg-white transition-colors duration-300" />
          </a>

          <div className="flex items-center justify-center space-x-8 mb-16">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-8 h-8" />
            </a>
            <a
              href={siteConfig.socials.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="Vimeo"
            >
              <VideoIcon className="w-8 h-8" />
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-8 h-8" />
            </a>
          </div>

          <p className="text-sm font-sans text-gray-600 uppercase tracking-widest mb-12">
            © {new Date().getFullYear()} SCHATZERFilms. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Oversized Dimmed Logo at the bottom */}
      <div className="w-full flex justify-center opacity-10 pointer-events-none translate-y-1/4">
        <img
          src="/images/Zeichenfla%CC%88che_2_Kopie_2.png"
          alt="SCHATZERFilms Background"
          className="w-full max-w-[120rem] h-auto object-contain"
        />
      </div>
    </footer>
  );
}