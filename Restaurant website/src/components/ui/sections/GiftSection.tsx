'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';
import { useCallback } from 'react';

const gifts = [
  {
    tier: 'Silver',
    price: '€150',
    includes: ['3-Course Lunch', 'Glass of Champagne', 'Complimentary Amuse-Bouche'],
  },
  {
    tier: 'Gold',
    price: '€320',
    includes: ['Full Tasting Menu', 'Wine Pairing', 'Chef\'s Special Surprise'],
    featured: true,
  },
  {
    tier: 'Platinum',
    price: '€500',
    includes: ['Chef\'s Table Experience', 'Premium Wine Pairing', 'Kitchen Tour', 'Signed Recipe Book'],
  },
];

export function GiftSection() {
  const scrollToReservation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('reservation');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Section id="gifts">
      <div className="w-full max-w-5xl space-y-16 px-6">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
          >
            Gift an Experience
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
            The perfect present for those who appreciate the extraordinary
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {gifts.map((gift, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className={`gift-card p-8 md:p-10 bg-[#121218]/40 backdrop-blur-md flex flex-col items-center text-center ${
                gift.featured
                  ? 'border border-[#d4a853]/30 shadow-[0_0_30px_rgba(212,168,83,0.08)]'
                  : 'border border-[#d4a853]/10'
              }`}
            >
              {gift.featured && (
                <span className="text-[8px] tracking-[0.4em] uppercase text-[#0a0a0f] bg-[#d4a853] px-3 py-1 rounded-sm mb-6 font-medium">
                  Most Popular
                </span>
              )}
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4a853] mb-2">{gift.tier}</span>
              <span className="text-4xl md:text-5xl font-light text-[#f0ece4] font-serif mb-6">{gift.price}</span>
              <div className="w-8 h-[1px] bg-[#d4a853]/30 mb-6" />
              <ul className="space-y-3 mb-8 flex-1">
                {gift.includes.map((item, j) => (
                  <li key={j} className="text-xs font-light text-[#8a8694] flex items-center gap-2">
                    <span className="text-[#d4a853] text-[8px]">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToReservation}
                className={`w-full py-3 text-[10px] uppercase tracking-[0.3em] font-medium rounded-sm transition-all duration-300 cursor-pointer ${
                  gift.featured
                    ? 'bg-[#d4a853] text-[#0a0a0f] hover:bg-[#e8c97a] hover:shadow-[0_0_15px_rgba(212,168,83,0.35)]'
                    : 'bg-transparent border border-[#d4a853]/20 text-[#d4a853] hover:bg-[#d4a853]/10'
                }`}
              >
                Purchase
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
