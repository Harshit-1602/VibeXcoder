'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Menu Data ─── */
interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

const starters: MenuItem[] = [
  { name: 'The Gold Leaf', desc: 'Aged A5 wagyu tartare, 24k gold, truffle essence, micro herbs', price: '€48' },
  { name: "Ocean's Whisper", desc: 'Bluefin tuna, yuzu sea foam, kelp oil, shiso', price: '€62' },
  { name: 'Velouté of Truffle', desc: 'Black Périgord truffle, crème fraîche, brioche crouton', price: '€36' },
  { name: 'Foie Gras Terrine', desc: 'Sauternes jelly, toasted pain de campagne, fig compote', price: '€42' },
  { name: 'Langoustine Carpaccio', desc: 'Norwegian langoustine, passion fruit, vanilla oil', price: '€56' },
];

const fishCourses: MenuItem[] = [
  { name: 'Arctic Silk', desc: 'Halibut, champagne beurre blanc, Oscietra caviar', price: '€78' },
  { name: 'Roasted Lobster', desc: 'Brittany blue lobster, vanilla butter, heritage carrots', price: '€88' },
  { name: 'Dover Sole Meunière', desc: 'Whole sole, brown butter, capers, lemon, parsley', price: '€82' },
  { name: 'Sea Bass en Croûte', desc: 'Line-caught bass, puff pastry, sauce Choron', price: '€74' },
  { name: 'Scallop Rosette', desc: 'Hand-dived scallops, black truffle, cauliflower purée', price: '€68' },
];

const meatMains: MenuItem[] = [
  { name: 'Forest Soul', desc: 'Wild mushrooms, roasted venison loin, pine needle jus', price: '€92' },
  { name: 'Rack of Lamb', desc: 'Herb-crusted, provençal ratatouille, rosemary jus', price: '€76' },
  { name: 'Wagyu Tenderloin', desc: 'Japanese A5, bone marrow glaze, black garlic purée', price: '€120' },
  { name: 'Duck Confit Royale', desc: 'Rohan duck, cherry gastrique, dauphinoise potatoes', price: '€68' },
  { name: 'Pigeon en Cocotte', desc: 'Bresse pigeon, foie gras, sauce Périgueux', price: '€84' },
];

const cheeseAndDesserts: MenuItem[] = [
  { name: 'The Meadow', desc: 'Aged Comté, Époisses, fig, walnut, honeycomb', price: '€38' },
  { name: 'Artisan Selection', desc: 'Five rare French cheeses, quince paste, grape must', price: '€44' },
  { name: 'Eclipse', desc: 'Dark Valrhona chocolate sphere, raspberry, gold dust', price: '€44' },
  { name: 'Tarte Tatin', desc: 'Caramelized Normandy apple, vanilla bean ice cream', price: '€28' },
  { name: 'Crème Brûlée', desc: 'Madagascan vanilla, lavender shortbread', price: '€24' },
  { name: 'Soufflé Grand Marnier', desc: 'Twice-risen soufflé, candied orange, crème anglaise', price: '€32' },
];

const winePairings: MenuItem[] = [
  { name: 'Krug Grande Cuvée', desc: 'Reims, Champagne · NV · Aperitif', price: '€45' },
  { name: 'Puligny-Montrachet', desc: 'Domaine Leflaive · 2019 · White', price: '€55' },
  { name: 'Meursault 1er Cru', desc: 'Coche-Dury · 2018 · White', price: '€85' },
  { name: 'Châteauneuf-du-Pape', desc: 'Château Rayas · 2017 · Red', price: '€65' },
  { name: 'Barolo Riserva', desc: 'Giacomo Conterno · 2015 · Red', price: '€75' },
  { name: "Château d'Yquem", desc: 'Sauternes · 2016 · Sweet', price: '€55' },
  { name: 'Cognac Louis XIII', desc: 'Rémy Martin · XO · Digestif', price: '€85' },
];

/* ─── Sub-Components ─── */
function Ornament() {
  return (
    <div className="menu-ornament">
      <span className="menu-ornament-diamond" />
    </div>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="menu-book-item">
      <div className="shrink-0">
        <span className="text-sm md:text-base font-light text-[#f0ece4] font-serif tracking-wide">
          {item.name}
        </span>
        <p className="text-[9px] md:text-[10px] text-[#8a8694] tracking-[0.15em] uppercase mt-0.5 leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="menu-book-item-dots" />
      <span className="text-sm font-light text-[#d4a853] shrink-0 font-serif">
        {item.price}
      </span>
    </div>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-[#f0ece4] font-serif text-center">
      {children}
    </h3>
  );
}

function PageSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[8px] md:text-[9px] tracking-[0.35em] uppercase text-[#8a8694] text-center mt-1">
      {children}
    </p>
  );
}

/* ─── Page Content Renderers ─── */
function CoverPage() {
  return (
    <div className="menu-book-page menu-page-cover">
      <div className="cover-frame">
        <div className="cover-frame-inner" />
      </div>
      <div className="menu-page-inner items-center justify-center gap-4 relative z-10">
        {/* Michelin Stars */}
        <div className="menu-stars">
          <span className="menu-star">★</span>
          <span className="menu-star">★</span>
          <span className="menu-star">★</span>
        </div>

        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-transparent" />

        {/* Logo */}
        <h2 className="text-4xl md:text-5xl font-light tracking-[0.5em] text-[#f0ece4] font-serif">
          ÉLAN
        </h2>

        <p className="text-[8px] tracking-[0.5em] uppercase text-[#d4a853] mt-1">
          Haute Gastronomie
        </p>

        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4a853]/30 to-transparent mt-2" />

        <p className="text-[9px] tracking-[0.25em] text-[#8a8694] text-center leading-loose mt-4 max-w-[200px]">
          24 Rue de Rivoli<br />
          Paris, 75004<br />
          France
        </p>

        <p className="text-[8px] tracking-[0.3em] uppercase text-[#8a8694]/50 mt-6">
          Carte des Mets
        </p>
      </div>
    </div>
  );
}

function ChefWelcomePage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner items-center justify-center gap-3">
        <p className="text-[8px] tracking-[0.4em] uppercase text-[#d4a853]">
          From the Kitchen
        </p>

        <Ornament />

        <p className="text-sm md:text-base font-light text-[#f0ece4]/80 text-center leading-loose font-serif italic max-w-xs">
          &ldquo;Each dish is a canvas, each ingredient a brushstroke. We do not merely cook — we compose. Welcome to our world.&rdquo;
        </p>

        <Ornament />

        <p className="text-[10px] tracking-[0.2em] text-[#d4a853] font-serif mt-2">
          Chef Laurent Deveraux
        </p>
        <p className="text-[8px] tracking-[0.3em] uppercase text-[#8a8694]">
          Executive Chef &middot; Three Michelin Stars
        </p>

        <div className="h-[1px] w-12 bg-[#d4a853]/20 mt-6" />

        <p className="text-[8px] tracking-[0.2em] text-[#8a8694]/60 text-center leading-relaxed mt-2 max-w-[240px]">
          Our menu celebrates the terroir of France, sourcing from 32 artisan producers and 14 biodynamic vineyards across the hexagone.
        </p>
      </div>
    </div>
  );
}

function StartersPage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner">
        <PageTitle>Amuse-Bouche &amp; First Courses</PageTitle>
        <PageSubtitle>To awaken the palate</PageSubtitle>
        <Ornament />
        <div className="flex-1">
          {starters.map((item, i) => (
            <MenuItemRow key={i} item={item} />
          ))}
        </div>
        <p className="text-[8px] tracking-[0.15em] text-[#8a8694]/50 text-center mt-4 italic">
          All dishes prepared with seasonal, locally-sourced ingredients
        </p>
      </div>
    </div>
  );
}

function FishPage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner">
        <PageTitle>Poissons &amp; Fruits de Mer</PageTitle>
        <PageSubtitle>From the Atlantic &amp; Mediterranean</PageSubtitle>
        <Ornament />
        <div className="flex-1">
          {fishCourses.map((item, i) => (
            <MenuItemRow key={i} item={item} />
          ))}
        </div>
        <p className="text-[8px] tracking-[0.15em] text-[#8a8694]/50 text-center mt-4 italic">
          Sustainable sourcing &middot; Daily market selection
        </p>
      </div>
    </div>
  );
}

function MeatsPage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner">
        <PageTitle>Viandes &amp; Gibier</PageTitle>
        <PageSubtitle>Noble cuts &amp; game</PageSubtitle>
        <Ornament />
        <div className="flex-1">
          {meatMains.map((item, i) => (
            <MenuItemRow key={i} item={item} />
          ))}
        </div>
        <p className="text-[8px] tracking-[0.15em] text-[#8a8694]/50 text-center mt-4 italic">
          Dry-aged in our cellar &middot; Heritage breed selections
        </p>
      </div>
    </div>
  );
}

function CheeseDessertPage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner">
        <PageTitle>Fromages &amp; Desserts</PageTitle>
        <PageSubtitle>Sweet finales &amp; artisan selections</PageSubtitle>
        <Ornament />
        <div className="flex-1">
          {cheeseAndDesserts.map((item, i) => (
            <MenuItemRow key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WinePage() {
  return (
    <div className="menu-book-page menu-page-interior">
      <div className="menu-page-inner">
        <PageTitle>La Carte des Vins</PageTitle>
        <PageSubtitle>Sommelier&apos;s curated pairings</PageSubtitle>
        <Ornament />
        <div className="flex-1">
          {winePairings.map((item, i) => (
            <MenuItemRow key={i} item={item} />
          ))}
        </div>
        <div className="mt-auto pt-4 text-center">
          <p className="text-[9px] tracking-[0.2em] text-[#d4a853]/60 uppercase">
            Full Pairing Experience &middot; €380
          </p>
          <p className="text-[8px] tracking-[0.15em] text-[#8a8694]/40 mt-1">
            7 glasses selected by our Head Sommelier
          </p>
        </div>
      </div>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="menu-book-page menu-page-back-cover">
      <div className="menu-page-inner items-center justify-center gap-4">
        <div className="menu-stars">
          <span className="menu-star">★</span>
          <span className="menu-star">★</span>
          <span className="menu-star">★</span>
        </div>

        <Ornament />

        <p className="text-xl md:text-2xl font-light text-[#f0ece4] font-serif italic">
          Bon Appétit
        </p>

        <Ornament />

        <div className="text-center space-y-2 mt-2">
          <p className="text-[9px] tracking-[0.2em] text-[#8a8694] uppercase">
            Service Hours
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#f0ece4]/70">
            Tuesday – Saturday
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#f0ece4]/70">
            Dinner: 18:30 – 23:00
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#f0ece4]/70">
            Saturday Lunch: 12:00 – 14:30
          </p>
        </div>

        <div className="h-[1px] w-12 bg-[#d4a853]/20 mt-4" />

        <div className="text-center space-y-1 mt-2">
          <p className="text-[9px] tracking-[0.2em] text-[#8a8694] uppercase">
            Reservations
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#d4a853]">
            +33 1 42 86 87 88
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#d4a853]">
            reservations@elan-paris.com
          </p>
        </div>

        <p className="text-[7px] tracking-[0.3em] uppercase text-[#8a8694]/30 mt-6">
          All prices inclusive of tax &middot; Service included
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
const pages = [
  CoverPage,
  ChefWelcomePage,
  StartersPage,
  FishPage,
  MeatsPage,
  CheeseDessertPage,
  WinePage,
  BackCoverPage,
];

interface MenuBookProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuBook({ isOpen, onClose }: MenuBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  // Reset page when opening
  useEffect(() => {
    if (isOpen) setCurrentPage(0);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
      if (e.key === 'ArrowLeft' && currentPage > 0) setCurrentPage((p) => p - 1);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentPage, totalPages, onClose]);

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  }, [currentPage]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="menu-book-overlay"
          onClick={onClose}
        >
          {/* Close Button */}
          <button className="menu-book-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>

          {/* Book Container */}
          <div className="menu-book" onClick={(e) => e.stopPropagation()}>
            {/* Render all pages with flip state */}
            {pages.map((PageComponent, index) => {
              const isFlipped = index < currentPage;
              const isCurrent = index === currentPage;
              const isBehind = index > currentPage + 1;

              return (
                <div
                  key={index}
                  className={`menu-book-page ${isFlipped ? 'flipped' : ''} ${isBehind ? 'behind' : ''}`}
                  style={{
                    zIndex: totalPages - index,
                    transformOrigin: 'left center',
                  }}
                >
                  <PageComponent />
                  {/* Page number */}
                  {index > 0 && index < totalPages - 1 && (
                    <span className="absolute bottom-3 right-4 text-[8px] tracking-[0.2em] text-[#8a8694]/40 select-none z-10">
                      {index}/{totalPages - 2}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Navigation Arrows */}
            <button
              className="menu-book-nav prev"
              onClick={goPrev}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="menu-book-nav next"
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Page Indicators */}
          <div className="menu-book-dots" onClick={(e) => e.stopPropagation()}>
            {pages.map((_, i) => (
              <button
                key={i}
                className={`menu-book-dot ${i === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Keyboard hint */}
          <p className="text-[7px] tracking-[0.25em] uppercase text-[#8a8694]/30 select-none">
            Use ← → keys to flip &middot; Esc to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
