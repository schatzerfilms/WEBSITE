import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isPhotography = location.pathname === '/photography';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';
  const isProjectPage = location.pathname.startsWith('/project/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVisible = isScrolled || isPhotography || isAbout || isContact || isProjectPage;

  const isSubPage = isPhotography || isAbout || isContact || isProjectPage;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        } ${isScrolled
          ? 'bg-background/95 backdrop-blur-md py-4 border-b border-white/5'
          : isSubPage
            ? 'bg-black/70 backdrop-blur-sm py-5 border-b border-white/5'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden lg:flex items-center space-x-8 lg:space-x-12 xl:space-x-16 text-xs lg:text-sm font-semibold tracking-widest text-[#595959] uppercase flex-1 justify-start">
          <Link
            to="/#work"
            className="hover:text-white transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/photography"
            className="hover:text-white transition-colors duration-300"
          >
            Photography
          </Link>
        </div>

        {/* Center Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="block w-32 md:w-36 shrink-0 flex justify-center"
        >
          <img
            src="/Zeichenflache_2_Kopie_2-2.png"
            alt="SCHATZERFilms Logo"
            className="w-full h-auto"
          />
        </Link>

        {/* Right Links */}
        <div className="hidden lg:flex items-center space-x-8 lg:space-x-12 xl:space-x-16 text-xs lg:text-sm font-semibold tracking-widest text-[#595959] uppercase flex-1 justify-end">
          <Link
            to="/about"
            className="hover:text-white transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Links */}
        <div className="flex lg:hidden items-center space-x-4 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#595959]">
          <Link to="/photography" className="hover:text-white transition-colors duration-300">
            Photo
          </Link>
          <Link to="/#contact" className="hover:text-white transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}