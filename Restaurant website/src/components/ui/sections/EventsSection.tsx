'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';
import { useCallback } from 'react';

const events = [
  {
    title: 'Intimate Dining',
    subtitle: 'For 2 — 8 Guests',
    description: 'A private room adorned with candlelight, curated artwork, and a bespoke tasting menu crafted exclusively for your table.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Corporate Events',
    subtitle: 'For 10 — 40 Guests',
    description: 'Impress clients and colleagues with an unforgettable evening of world-class cuisine, fine wines, and impeccable service.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    title: 'Celebrations',
    subtitle: 'For 2 — 60 Guests',
    description: 'Weddings, anniversaries, milestones — let us craft a celebration as extraordinary as the occasion itself.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function EventsSection() {
  const scrollToReservation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('reservation');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Section id="events">
      <div className="w-full max-w-6xl space-y-16 px-6">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
          >
            Private Events
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[1px] bg-[#d4a853] mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-[#8a8694]"
          >
            Bespoke experiences for every occasion
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="p-8 md:p-10 bg-[#121218]/40 backdrop-blur-md border border-[#d4a853]/10 rounded-sm hover:border-[#d4a853]/30 hover:shadow-[0_0_25px_rgba(212,168,83,0.06)] transition-all duration-500 flex flex-col"
            >
              <div className="mb-6">{event.icon}</div>
              <h3 className="text-lg font-light tracking-[0.15em] uppercase text-[#f0ece4] font-serif mb-1">{event.title}</h3>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#d4a853] mb-4">{event.subtitle}</span>
              <p className="text-xs font-light text-[#8a8694] leading-relaxed flex-1">{event.description}</p>
              <button
                onClick={scrollToReservation}
                className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#d4a853] border border-[#d4a853]/20 bg-transparent hover:bg-[#d4a853]/10 px-5 py-2.5 rounded-sm transition-all duration-300 cursor-pointer self-start"
              >
                Enquire
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
