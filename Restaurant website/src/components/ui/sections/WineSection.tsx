'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../Section';
import Image from 'next/image';

interface WineDetail {
  name: string;
  region: string;
  year: string;
  price: string;
  type: string;
  image: string;
  notes: string;
  score: string;
  profile: {
    body: number;
    tannins: number;
    acidity: number;
    sweetness: number;
  };
}

const wines: WineDetail[] = [
  {
    name: 'Château Margaux',
    region: 'Bordeaux, France',
    year: '2015',
    price: '€420',
    type: 'Red',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop',
    notes: 'Incredible depth and elegance. Intense aromas of blackcurrant, violets, and sweet spices, leading to a silky, full-bodied, majestic finish.',
    score: '98 pts · Robert Parker',
    profile: { body: 90, tannins: 85, acidity: 70, sweetness: 5 },
  },
  {
    name: 'Dom Pérignon',
    region: 'Champagne, France',
    year: '2012',
    price: '€380',
    type: 'Champagne',
    image: 'https://images.unsplash.com/photo-1594498653385-d52725a30827?q=80&w=400&auto=format&fit=crop',
    notes: 'A complex bouquet of white flowers, stone fruits, and toasted brioche. Vibrant acidity with a long, saline, mineral-driven finish.',
    score: '97 pts · Wine Spectator',
    profile: { body: 45, tannins: 0, acidity: 90, sweetness: 10 },
  },
  {
    name: 'Cloudy Bay',
    region: 'Marlborough, NZ',
    year: '2021',
    price: '€85',
    type: 'White',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&auto=format&fit=crop',
    notes: 'Zesty aromas of fresh grapefruit, lime, and passionfruit, backed by vibrant herbal notes and a crisp, refreshing mineral acidity.',
    score: '92 pts · Decanter',
    profile: { body: 40, tannins: 0, acidity: 85, sweetness: 8 },
  },
  {
    name: 'Sassicaia',
    region: 'Tuscany, Italy',
    year: '2018',
    price: '€350',
    type: 'Red',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=400&auto=format&fit=crop',
    notes: 'Rich aromas of wild cherries, leather, and sweet tobacco. Perfectly balanced and structured, with firm, polished tannins and a long finish.',
    score: '99 pts · Wine Enthusiast',
    profile: { body: 95, tannins: 90, acidity: 75, sweetness: 3 },
  },
];

export function WineSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeWine = hoveredIndex !== null ? wines[hoveredIndex] : null;

  return (
    <Section id="wine">
      <div className="w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content & Dynamic Spotlight */}
          <div className="space-y-8 flex flex-col justify-between h-full min-h-[460px]">
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

            {/* Dynamic Quote or Wine Spotlight */}
            <div className="relative min-h-[220px] w-full">
              <AnimatePresence mode="wait">
                {activeWine === null ? (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-[#121218]/30 border border-[#d4a853]/10 rounded-sm backdrop-blur-md w-full"
                  >
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
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeWine.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 bg-[#121218]/60 border border-[#d4a853]/25 rounded-sm backdrop-blur-md flex gap-5 items-center w-full"
                  >
                    {/* Wine Image Preview */}
                    <div className="w-20 h-28 relative rounded-sm overflow-hidden shrink-0 border border-white/5 shadow-inner">
                      <Image
                        src={activeWine.image}
                        alt={activeWine.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-40" />
                    </div>

                    {/* Wine Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-light tracking-widest text-[#f0ece4] font-serif">
                            {activeWine.name}
                          </h4>
                          <span className="text-[7px] uppercase tracking-wider text-[#d4a853] border border-[#d4a853]/20 px-1.5 py-0.5 rounded-sm bg-[#d4a853]/5">
                            {activeWine.score}
                          </span>
                        </div>
                        <p className="text-[8px] tracking-widest uppercase text-[#8a8694] mt-0.5">
                          {activeWine.region} · {activeWine.year}
                        </p>
                      </div>

                      <p className="text-[10px] font-light text-[#8a8694] leading-relaxed italic">
                        &ldquo;{activeWine.notes}&rdquo;
                      </p>

                      {/* Sensory Profile Bars */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1.5 border-t border-[#d4a853]/10">
                        {Object.entries(activeWine.profile).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between gap-2">
                            <span className="text-[7px] uppercase tracking-[0.2em] text-[#8a8694] shrink-0">
                              {key}
                            </span>
                            <div className="h-1 bg-[#1a1a24] rounded-full w-full max-w-[50px] overflow-hidden">
                              <div
                                className="h-full bg-[#d4a853] rounded-full"
                                style={{ width: `${val}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Interactive Wine List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-0"
          >
            {wines.map((wine, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-center gap-4 py-6 border-b border-[#d4a853]/10 last:border-b-0 cursor-default hover:bg-[#121218]/20 px-4 -mx-4 rounded-sm transition-all duration-300"
              >
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#d4a853] bg-[#d4a853]/5 border border-[#d4a853]/15 px-2.5 py-1 rounded-sm shrink-0 w-20 text-center group-hover:bg-[#d4a853]/15 group-hover:border-[#d4a853]/30 transition-all duration-300">
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
              </div>
            ))}

            <div className="pt-6">
              <button className="text-[10px] uppercase tracking-[0.3em] text-[#d4a853] border border-[#d4a853]/20 bg-transparent hover:bg-[#d4a853]/10 px-6 py-2.5 rounded-sm transition-all duration-300 cursor-pointer">
                View Full Wine List
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
