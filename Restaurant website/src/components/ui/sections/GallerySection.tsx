'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../Section';
import { useState, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop', alt: 'Elegant dining room with candlelight', aspect: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop', alt: 'Chef plating a fine dining dish', aspect: 'aspect-[3/4]' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', alt: 'Wine cellar with vintage bottles', aspect: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop', alt: 'Artfully plated wagyu steak', aspect: 'aspect-[3/4]' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop', alt: 'Bar area with ambient lighting', aspect: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop', alt: 'Macro shot of dessert with gold dust', aspect: 'aspect-[3/4]' },
];

export function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
  }, []);

  const navigate = useCallback((dir: number) => {
    setLightboxIdx((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  }, []);

  return (
    <>
      <Section id="gallery">
        <div className="w-full max-w-6xl space-y-12 px-6">
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
            >
              The Ambiance
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
              A feast for every sense
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`${img.aspect} relative overflow-hidden rounded-sm cursor-pointer group border border-transparent hover:border-[#d4a853]/30 transition-all duration-500`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0a0a0f]/30 group-hover:bg-[#0a0a0f]/10 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#f0ece4] bg-[#0a0a0f]/60 backdrop-blur-sm px-4 py-2 rounded-sm border border-[#d4a853]/20">
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#f0ece4]/60 hover:text-[#d4a853] text-2xl cursor-pointer bg-transparent border-none z-10 p-2"
              aria-label="Previous image"
            >
              ‹
            </button>
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[85vw] md:w-[70vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIdx].src}
                alt={galleryImages[lightboxIdx].alt}
                fill
                className="object-contain rounded-sm"
                sizes="85vw"
                priority
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#f0ece4]/60 hover:text-[#d4a853] text-2xl cursor-pointer bg-transparent border-none z-10 p-2"
              aria-label="Next image"
            >
              ›
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-[#f0ece4]/60 hover:text-[#d4a853] text-xl cursor-pointer bg-transparent border-none z-10"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-[#8a8694]">
              {lightboxIdx + 1} / {galleryImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
