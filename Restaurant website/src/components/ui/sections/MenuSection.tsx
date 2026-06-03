'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../Section';
import { useState, useCallback } from 'react';
import { MenuBook } from '../MenuBook';

const menus: Record<string, { course: string; name: string; desc: string; price: string }[]> = {
  'Tasting Menu': [
    { course: 'Amuse-Bouche', name: 'The Gold Leaf', desc: 'Aged wagyu, 24k gold, truffle essence', price: '€48' },
    { course: 'First Course', name: "Ocean\u0027s Whisper", desc: 'Bluefin tuna, sea foam, kelp oil', price: '€62' },
    { course: 'Fish', name: 'Arctic Silk', desc: 'Halibut, champagne beurre blanc, caviar', price: '€78' },
    { course: 'Meat', name: 'Forest Soul', desc: 'Wild mushrooms, venison, pine needle jus', price: '€92' },
    { course: 'Cheese', name: 'The Meadow', desc: 'Aged comté, fig, walnut, honeycomb', price: '€38' },
    { course: 'Dessert', name: 'Eclipse', desc: 'Dark chocolate sphere, raspberry, gold dust', price: '€44' },
  ],
  'À La Carte': [
    { course: 'Starter', name: 'Velouté of Truffle', desc: 'Black truffle, crème fraîche, brioche crouton', price: '€36' },
    { course: 'Starter', name: 'Foie Gras Terrine', desc: 'Sauternes jelly, toasted pain de campagne', price: '€42' },
    { course: 'Main', name: 'Roasted Lobster', desc: 'Vanilla butter, heritage carrots, bisque', price: '€88' },
    { course: 'Main', name: 'Rack of Lamb', desc: 'Herb crust, provençal ratatouille, jus', price: '€76' },
    { course: 'Dessert', name: 'Tarte Tatin', desc: 'Caramelized apple, vanilla bean ice cream', price: '€28' },
    { course: 'Dessert', name: 'Crème Brûlée', desc: 'Madagascan vanilla, lavender shortbread', price: '€24' },
  ],
  'Wine Pairing': [
    { course: 'Aperitif', name: 'Krug Grande Cuvée', desc: 'Reims, Champagne · NV', price: '€45' },
    { course: 'White', name: 'Puligny-Montrachet', desc: 'Domaine Leflaive · 2019', price: '€55' },
    { course: 'Red', name: 'Châteauneuf-du-Pape', desc: 'Château Rayas · 2017', price: '€65' },
    { course: 'Red', name: 'Barolo Riserva', desc: 'Giacomo Conterno · 2015', price: '€75' },
    { course: 'Sweet', name: 'Sauternes', desc: 'Château d\'Yquem · 2016', price: '€55' },
    { course: 'Digestif', name: 'Cognac XO', desc: 'Rémy Martin · Louis XIII', price: '€85' },
  ],
};

const tabNames = Object.keys(menus);

export function MenuSection() {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [menuBookOpen, setMenuBookOpen] = useState(false);

  const openMenuBook = useCallback(() => setMenuBookOpen(true), []);
  const closeMenuBook = useCallback(() => setMenuBookOpen(false), []);

  return (
    <>
      <Section id="menu">
        <div className="w-full max-w-5xl space-y-12 px-6">
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
            >
              The Menu
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-[1px] bg-[#d4a853] mx-auto"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            {tabNames.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`menu-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="menu-tab-indicator"
                    className="menu-tab-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-0"
            >
              {menus[activeTab].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-6 md:gap-10 py-7 border-b border-[#d4a853]/10 last:border-b-0 cursor-default hover:bg-[#121218]/40 hover:shadow-[0_0_15px_rgba(212,168,83,0.05)] px-6 -mx-6 transition-all duration-300 rounded-sm"
                >
                  {/* Course label */}
                  <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-[#d4a853] w-28 shrink-0">
                    {item.course}
                  </span>

                  {/* Dish name */}
                  <h3 className="text-lg md:text-xl font-light tracking-widest uppercase text-[#f0ece4] group-hover:text-[#d4a853] transition-colors duration-300 w-44 md:w-48 shrink-0 font-serif">
                    {item.name}
                  </h3>

                  {/* Dotted line */}
                  <div className="flex-1 border-b border-dotted border-[#d4a853]/20 hidden md:block" />

                  {/* Description */}
                  <p className="text-[10px] text-[#8a8694] uppercase tracking-widest hidden md:block max-w-[200px] text-right">
                    {item.desc}
                  </p>

                  {/* Price */}
                  <span className="text-sm font-light text-[#d4a853] ml-auto md:ml-0 shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#8a8694]/60">
              {activeTab === 'Tasting Menu' && 'Full tasting menu · €320 per person'}
              {activeTab === 'À La Carte' && 'Prices per dish · Service included'}
              {activeTab === 'Wine Pairing' && 'Full pairing · €380 · 6 glasses'}
            </p>
            <button
              onClick={openMenuBook}
              className="group relative text-[10px] uppercase tracking-[0.3em] text-[#d4a853] border border-[#d4a853]/20 bg-transparent hover:bg-[#d4a853]/10 px-6 py-2.5 rounded-sm transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                View Full Menu
              </span>
            </button>
          </div>
        </div>
      </Section>

      {/* Full Menu Book Overlay */}
      <MenuBook isOpen={menuBookOpen} onClose={closeMenuBook} />
    </>
  );
}

