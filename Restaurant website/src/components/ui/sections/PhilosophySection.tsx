'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';

export function PhilosophySection() {
  return (
    <Section id="philosophy">
      <div className="max-w-3xl text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-[1px] bg-[#d4a853] mx-auto overflow-hidden"
        />
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-3xl font-light tracking-[0.25em] uppercase text-[#d4a853] font-serif"
        >
          The Philosophy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="text-xl md:text-2xl font-light leading-relaxed tracking-wide text-[#f0ece4] font-serif italic select-none"
        >
          &ldquo;At ÉLAN, we believe that true luxury lies in the essence of the ingredient.
          Our craft is a dialogue between nature and the plate,
          where every element is transformed but its soul remains untouched.&rdquo;
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 64 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="h-[1px] bg-[#d4a853] mx-auto overflow-hidden"
        />
      </div>
    </Section>
  );
}
