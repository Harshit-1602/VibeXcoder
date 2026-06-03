'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';

const wines = [
  { name: 'Château Margaux', region: 'Bordeaux, France', year: '2015', price: '€420', type: 'Red' },
  { name: 'Dom Pérignon', region: 'Champagne, France', year: '2012', price: '€380', type: 'Champagne' },
  { name: 'Cloudy Bay', region: 'Marlborough, NZ', year: '2021', price: '€85', type: 'White' },
  { name: 'Sassicaia', region: 'Tuscany, Italy', year: '2018', price: '€350', type: 'Red' },
];

export function WineSection() {
  return (
    <Section id="wine">
      <div className="w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.4em] text-[#d4a853] uppercase">The Cellar</h3>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-[#f0ece4] font-serif leading-tight">
                Curated<br />Wines
              </h2>
              <p className="text-sm font-light text-[#8a8694] leading-loose max-w-md">
                Our sommelier has hand-selected over 200 wines from the world&rsquo;s most
                prestigious vineyards, each chosen to complement our seasonal menus.
              </p>
            </div>

            {/* Sommelier quote */}
            <div className="p-6 bg-[#121218]/30 border border-[#d4a853]/10 rounded-sm backdrop-blur-md">
              <blockquote className="border-l border-[#d4a853] pl-4">
                <p className="text-sm italic font-light text-[#8a8694] leading-relaxed">
                  &ldquo;A great wine doesn&rsquo;t overpower the dish — it enters into a
                  conversation with it.&rdquo;
                </p>
                <footer className="mt-3">
                  <span className="text-xs font-light text-[#f0ece4] font-serif">Marie-Claire Dubois</span>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-[#d4a853] block mt-0.5">Head Sommelier</span>
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Right: Wine list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-0"
          >
            {wines.map((wine, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 py-6 border-b border-[#d4a853]/10 last:border-b-0"
              >
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#d4a853] bg-[#d4a853]/5 border border-[#d4a853]/15 px-2.5 py-1 rounded-sm shrink-0 w-20 text-center">
                  {wine.type}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-light tracking-widest text-[#f0ece4] group-hover:text-[#d4a853] transition-colors duration-300 font-serif">
                    {wine.name}
                  </h4>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8694] mt-0.5">
                    {wine.region} · {wine.year}
                  </p>
                </div>
                <span className="text-sm font-light text-[#d4a853] shrink-0">{wine.price}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <button className="text-[10px] uppercase tracking-[0.3em] text-[#d4a853] border border-[#d4a853]/20 bg-transparent hover:bg-[#d4a853]/10 px-6 py-2.5 rounded-sm transition-all duration-300 cursor-pointer">
                View Full Wine List
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
