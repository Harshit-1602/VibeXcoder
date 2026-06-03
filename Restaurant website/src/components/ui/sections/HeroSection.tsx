'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';
import { useCallback } from 'react';

export function HeroSection() {
  const scrollToReservation = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center"
      >
        <p className="text-xs md:text-sm font-light tracking-[0.6em] text-[#d4a853] uppercase mb-6">
          A Culinary Experience
        </p>
        <h1 className="text-8xl md:text-9xl font-light tracking-[0.25em] mb-6 text-[#f0ece4] font-serif select-none drop-shadow-[0_0_30px_rgba(212,168,83,0.08)]">
          ÉLAN
        </h1>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mb-8" />
        <p className="text-sm md:text-base font-light tracking-[0.3em] text-[#8a8694] uppercase mb-12">
          Dining beyond expectation
        </p>
        <a
          href="#reservation"
          onClick={scrollToReservation}
          className="inline-block px-10 py-4 bg-[#d4a853] text-[#0a0a0f] font-medium uppercase tracking-[0.3em] text-[10px] hover:bg-[#e8c97a] hover:shadow-[0_0_20px_rgba(212,168,83,0.35)] transition-all duration-300 rounded-sm cursor-pointer"
        >
          Reserve a Table
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#8a8694]/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-[1px] h-6 bg-gradient-to-b from-[#d4a853] to-transparent"
        />
      </motion.div>
    </Section>
  );
}
