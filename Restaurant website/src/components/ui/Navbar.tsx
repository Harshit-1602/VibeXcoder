'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Chef', href: '#chef' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Menu', href: '#menu' },
  { label: 'Tables', href: '#floorplan' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#reservation' },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  }, []);

  // Scroll spy: detect which section is in view
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4"
      >
        {/* Glassmorphic background — opacity increases on scroll */}
        <div
          className="absolute inset-0 border-b border-[#d4a853]/15 transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(10, 10, 15, 0.92)'
              : 'rgba(10, 10, 15, 0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="text-lg md:text-xl font-light tracking-[0.35em] text-[#f0ece4] font-serif cursor-pointer select-none"
          >
            É L A N
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="relative z-10 hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`relative text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 py-1 cursor-pointer ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[#d4a853]'
                  : 'text-[#8a8694] hover:text-[#d4a853]'
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {link.label}
              {(hoveredIndex === idx || activeSection === link.href.replace('#', '')) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#d4a853]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="relative z-10 hidden md:block">
          <a
            href="#reservation"
            onClick={(e) => scrollTo(e, '#reservation')}
            className="text-[10px] uppercase tracking-[0.3em] px-6 py-2.5 bg-[#d4a853] text-[#0a0a0f] font-medium hover:bg-[#e8c97a] hover:shadow-[0_0_15px_rgba(212,168,83,0.4)] transition-all duration-300 rounded-sm cursor-pointer"
          >
            Reserve
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-10 md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 cursor-pointer bg-transparent border-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1px] bg-[#f0ece4] origin-center transition-colors"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[1px] bg-[#f0ece4]"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1px] bg-[#f0ece4] origin-center transition-colors"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08 }}
                className={`text-sm uppercase tracking-[0.4em] transition-colors cursor-pointer ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#d4a853]'
                    : 'text-[#8a8694] hover:text-[#d4a853]'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              className="mt-4"
            >
              <a
                href="#reservation"
                onClick={(e) => scrollTo(e, '#reservation')}
                className="text-[10px] uppercase tracking-[0.3em] px-8 py-3 bg-[#d4a853] text-[#0a0a0f] font-medium rounded-sm cursor-pointer"
              >
                Reserve a Table
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
