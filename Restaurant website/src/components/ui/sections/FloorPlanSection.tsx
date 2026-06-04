'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../Section';
import Image from 'next/image';
import { useToast } from '../Toast';
import { useStore } from '../../../store/useStore';

interface TableDetails {
  id: string;
  name: string;
  capacity: string;
  ambiance: string;
  description: string;
  image: string;
}

const tablesData: Record<string, TableDetails> = {
  chefs: {
    id: 'chefs',
    name: "The Chef's Table",
    capacity: '4 Guests',
    ambiance: 'Immersive & Energetic',
    description: 'An exclusive front-row view of our open-concept kitchen. Watch our master culinary artisans construct each course with precision and performance.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
  },
  window: {
    id: 'window',
    name: 'Seine Window View',
    capacity: '2 Guests',
    ambiance: 'Romantic & Scenic',
    description: 'Intimate candlelit seating adjacent to our floor-to-ceiling glass windows, offering a breathtaking view of the Paris skyline and the Seine river.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
  },
  alcove: {
    id: 'alcove',
    name: 'La Grande Alcove',
    capacity: '6 Guests',
    ambiance: 'Private & Luxurious',
    description: 'A velvet-curtained semi-private booth offering absolute privacy. Perfect for intimate family gatherings, celebrations, or corporate discussions.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop',
  },
  terrace: {
    id: 'terrace',
    name: 'The Terroir Terrace',
    capacity: '2–4 Guests',
    ambiance: 'Al Fresco & Botanical',
    description: 'Seating in our climate-controlled heated winter garden. Surrounded by organic aromatic herbs, olive trees, and soft fairy lighting.',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop',
  },
};

export function FloorPlanSection() {
  const { selectedTableId, setSelectedTableId, bookedTableIds } = useStore();
  const { showToast } = useToast();

  const handleSelectTable = useCallback((id: string) => {
    if (bookedTableIds.includes(id)) {
      showToast('This table is already reserved for the chosen date and time.', 'info');
      return;
    }
    setSelectedTableId(id);
  }, [bookedTableIds, setSelectedTableId, showToast]);

  const handleReserveTable = useCallback((table: TableDetails) => {
    if (bookedTableIds.includes(table.id)) {
      showToast('This table is already reserved.', 'info');
      return;
    }

    // 1. Find reservation form fields
    const requestsTextarea = document.getElementById('res-requests') as HTMLTextAreaElement | null;
    const nameInput = document.getElementById('res-name') as HTMLInputElement | null;

    if (requestsTextarea) {
      // Set the value including the table preference
      const currentVal = requestsTextarea.value;
      const prefPrefix = `[Preferred Table: ${table.name}]`;
      if (!currentVal.includes(prefPrefix)) {
        requestsTextarea.value = `${prefPrefix} ${currentVal.replace(/\[Preferred Table: [^\]]+\]/g, '')}`.trim();
      }
    }

    // 2. Scroll smoothly to reservation section
    const reservationSection = document.getElementById('reservation');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 3. Focus name input to prompt user
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 800);
    }

    // 4. Show success toast notification
    showToast(`Selected ${table.name}! Preference added to your request.`, 'success');
  }, [showToast, bookedTableIds]);

  const getTableClass = useCallback((id: string) => {
    if (bookedTableIds.includes(id)) {
      return 'booked-table';
    }
    return selectedTableId === id ? 'active-table' : '';
  }, [bookedTableIds, selectedTableId]);

  const activeTable = tablesData[selectedTableId] || tablesData.chefs;
  const isBooked = bookedTableIds.includes(activeTable.id);

  return (
    <Section id="floorplan">
      <div className="w-full max-w-6xl space-y-12 px-6">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
          >
            Select Your Table
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
            className="text-xs tracking-[0.3em] uppercase text-[#8a8694] max-w-md mx-auto leading-relaxed"
          >
            Browse our layout and click on a table to reserve your preferred dining environment
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* SVG Layout - 7 columns on desktop */}
          <div className="lg:col-span-7 flex justify-center floor-plan-container">
            <svg
              viewBox="0 0 500 400"
              className="w-full max-w-[480px] h-auto bg-[#121218]/40 border border-[#d4a853]/15 rounded-sm p-6 backdrop-blur-sm"
            >
              {/* Outer Room Walls */}
              <rect x="10" y="10" width="480" height="380" rx="4" fill="none" stroke="rgba(212, 168, 83, 0.1)" strokeWidth="1" />
              <path d="M 10 10 L 490 10 L 490 390 L 10 390 Z" fill="none" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="2" strokeDasharray="6 4" />

              {/* Kitchen Counter / Open Stage at the top */}
              <rect x="120" y="20" width="260" height="40" rx="2" fill="rgba(18, 18, 24, 0.9)" stroke="rgba(212, 168, 83, 0.2)" strokeWidth="1" />
              <text x="250" y="44" fill="#8a8694" fontSize="9" letterSpacing="0.3em" textAnchor="middle" className="uppercase select-none">
                Open Kitchen Stage
              </text>

              {/* Bar Counter on the left */}
              <rect x="25" y="100" width="40" height="200" rx="4" fill="rgba(18, 18, 24, 0.9)" stroke="rgba(212, 168, 83, 0.2)" strokeWidth="1" />
              <text x="45" y="205" fill="#8a8694" fontSize="8" letterSpacing="0.25em" textAnchor="middle" transform="rotate(-90 45 200)" className="uppercase select-none">
                Cocktail Bar
              </text>

              {/* The Chef's Table (Close to kitchen, center top) */}
              <g
                className={`floor-table ${getTableClass('chefs')}`}
                onClick={() => handleSelectTable('chefs')}
              >
                {/* Outer seating rings */}
                <circle cx="250" cy="110" r="28" fill="rgba(212, 168, 83, 0.03)" stroke="rgba(212, 168, 83, 0.15)" strokeWidth="1" strokeDasharray="3 2" />
                {/* 4 guest seats */}
                <circle cx="250" cy="74" r="5" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="250" cy="146" r="5" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="214" cy="110" r="5" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="286" cy="110" r="5" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                {/* Table center */}
                <circle cx="250" cy="110" r="20" fill="#1a1a24" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="1.5" />
                <text x="250" y="113" fill="#d4a853" fontSize="8" textAnchor="middle" className="select-none font-serif">C</text>
              </g>

              {/* Seine Window Tables (Left side by the wall) */}
              <g
                className={`floor-table ${getTableClass('window')}`}
                onClick={() => handleSelectTable('window')}
              >
                {/* Chairs */}
                <circle cx="105" cy="190" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="105" cy="230" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                {/* Table */}
                <rect x="90" y="200" width="30" height="20" rx="2" fill="#1a1a24" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="1.5" />
                <text x="105" y="213" fill="#d4a853" fontSize="8" textAnchor="middle" className="select-none font-serif">W</text>
              </g>

              {/* La Grande Alcove (Private booths at the bottom right) */}
              <g
                className={`floor-table ${getTableClass('alcove')}`}
                onClick={() => handleSelectTable('alcove')}
              >
                {/* Curved Booth wall */}
                <path d="M 380 250 A 35 35 0 0 1 450 250" fill="none" stroke="rgba(212, 168, 83, 0.15)" strokeWidth="2" strokeDasharray="4 2" />
                {/* Seating dots */}
                <circle cx="390" cy="230" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="415" cy="220" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="440" cy="230" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="380" cy="255" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="450" cy="255" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                {/* Main Table */}
                <rect x="390" y="240" width="50" height="24" rx="3" fill="#1a1a24" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="1.5" />
                <text x="415" y="255" fill="#d4a853" fontSize="8" textAnchor="middle" className="select-none font-serif">A</text>
              </g>

              {/* The Terroir Terrace (Garden area at the bottom center/left) */}
              <g
                className={`floor-table ${getTableClass('terrace')}`}
                onClick={() => handleSelectTable('terrace')}
              >
                {/* Greenery / Foliage bounds */}
                <rect x="180" y="325" width="140" height="50" rx="8" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <text x="250" y="370" fill="rgba(16, 185, 129, 0.5)" fontSize="6" letterSpacing="0.2em" textAnchor="middle" className="uppercase select-none">
                  Outdoor Garden
                </text>
                {/* Chairs */}
                <circle cx="215" cy="345" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                <circle cx="245" cy="345" r="4" fill="#121218" stroke="#d4a853" strokeWidth="1" />
                {/* Table */}
                <rect x="220" y="335" width="20" height="20" rx="2" fill="#1a1a24" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="1.5" />
                <text x="230" y="348" fill="#d4a853" fontSize="8" textAnchor="middle" className="select-none font-serif">T</text>
              </g>

              {/* Labels overlay */}
              <text x="250" y="152" fill="#d4a853" opacity="0.6" fontSize="6" letterSpacing="0.1em" textAnchor="middle" className="uppercase select-none">
                Chef's
              </text>
              <text x="105" y="240" fill="#d4a853" opacity="0.6" fontSize="6" letterSpacing="0.1em" textAnchor="middle" className="uppercase select-none">
                Seine Window
              </text>
              <text x="415" y="280" fill="#d4a853" opacity="0.6" fontSize="6" letterSpacing="0.1em" textAnchor="middle" className="uppercase select-none">
                Alcove
              </text>
              <text x="230" y="362" fill="#d4a853" opacity="0.6" fontSize="6" letterSpacing="0.1em" textAnchor="middle" className="uppercase select-none">
                Terrace
              </text>
            </svg>
          </div>

          {/* Details Preview Card - 5 columns on desktop */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTable.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-sm space-y-6 relative overflow-hidden"
              >
                {/* Preview Image */}
                <div className="aspect-[16/10] relative rounded-sm overflow-hidden border border-white/5 shadow-inner">
                  <Image
                    src={activeTable.image}
                    alt={activeTable.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 35vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                </div>

                {/* Information content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-light tracking-wide text-[#f0ece4] font-serif">
                        {activeTable.name}
                      </h3>
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4a853] block mt-1">
                        {activeTable.ambiance}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.15em] border border-[#d4a853]/20 px-2 py-1 text-[#d4a853] rounded-sm bg-[#d4a853]/5 font-light">
                      {activeTable.capacity}
                    </span>
                  </div>

                  <p className="text-xs font-light text-[#8a8694] leading-relaxed">
                    {activeTable.description}
                  </p>

                  <button
                    disabled={isBooked}
                    onClick={() => handleReserveTable(activeTable)}
                    className="w-full py-3 bg-[#d4a853] text-[#0a0a0f] uppercase tracking-[0.25em] text-[9px] font-semibold hover:bg-[#e8c97a] hover:shadow-[0_0_15px_rgba(212,168,83,0.3)] transition-all duration-300 rounded-sm cursor-pointer disabled:bg-[#1a1a24] disabled:text-[#8a8694]/40 disabled:border disabled:border-white/5 disabled:cursor-not-allowed"
                  >
                    {isBooked ? 'Table Already Booked' : 'Select Table & Book'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
