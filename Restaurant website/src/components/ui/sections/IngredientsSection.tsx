'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '../Section';

export function IngredientsSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h3 className="text-xs tracking-[0.4em] text-[#d4a853] uppercase">Purity</h3>
          <h2 className="text-5xl font-light tracking-wide text-[#f0ece4] font-serif leading-tight">
            Hand-selected. <br />
            Local. Rare.
          </h2>
          <p className="text-sm font-light text-[#8a8694] leading-loose max-w-sm">
            We partner with small-scale farmers and foragers to bring you ingredients that
            tell a story of terroir and season.
          </p>
          <div className="flex gap-4 pt-4">
            {['Organic', 'Sustainable', 'Seasonal'].map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-[0.25em] text-[#d4a853] border border-[#d4a853]/20 bg-[#d4a853]/5 px-3 py-1.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="aspect-[4/5] bg-[#121218]/40 backdrop-blur-md border border-[#d4a853]/15 shadow-2xl shadow-black/80 flex items-center justify-center relative group overflow-hidden rounded-sm"
        >
          <Image
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop"
            alt="Macro photography of ingredients"
            fill
            className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <span className="relative text-[9px] tracking-[0.4em] uppercase text-[#d4a853] bg-[#0a0a0f]/80 border border-[#d4a853]/20 backdrop-blur-md px-5 py-2.5 rounded-sm">
            Macro Photography
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
