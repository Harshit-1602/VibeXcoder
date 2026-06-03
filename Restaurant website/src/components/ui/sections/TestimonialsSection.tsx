'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';

const testimonials = [
  {
    quote: 'ÉLAN redefines what a dining experience can be. Each course is a revelation — precise, soulful, and utterly unforgettable.',
    author: 'Isabelle Fournier',
    title: 'Le Monde Gastronomique',
    rating: 5,
  },
  {
    quote: 'Chef Marchand has an uncanny ability to coax extraordinary depth from the simplest ingredients. Three Michelin stars feel insufficient.',
    author: 'James Whitmore',
    title: 'The Culinary Review',
    rating: 5,
  },
  {
    quote: 'From the moment you step inside, every detail whispers perfection. This is not a meal — it is a journey.',
    author: 'Yuki Tanaka',
    title: 'Asia Dining Collective',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <Section>
      <div className="w-full max-w-6xl space-y-16 px-6">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light tracking-[0.25em] uppercase text-[#f0ece4] font-serif"
          >
            Voices
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[1px] bg-[#d4a853] mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="p-10 bg-[#121218]/40 backdrop-blur-md border border-[#d4a853]/15 shadow-2xl shadow-black/85 rounded-sm space-y-6 hover:border-[#d4a853]/35 hover:shadow-[0_0_20px_rgba(212,168,83,0.05)] transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#d4a853] text-xs drop-shadow-[0_0_5px_rgba(212,168,83,0.5)]">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm font-light text-[#8a8694] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-[#d4a853]/15">
                <p className="text-xs font-light tracking-wide text-[#f0ece4] font-serif">{t.author}</p>
                <p className="text-[8px] uppercase tracking-[0.25em] text-[#d4a853] mt-1">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
