'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '../Section';

export function ChefSection() {
  return (
    <Section id="chef">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl w-full px-6">
        {/* Chef Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="aspect-[3/4] relative overflow-hidden rounded-sm shadow-2xl shadow-black/80 group border border-white/5"
        >
          <Image
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
            alt="Chef Olivier Marchand at work"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-90" />
        </motion.div>

        {/* Chef Bio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-xs tracking-[0.4em] text-[#d4a853] uppercase">The Artisan</h3>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-[#f0ece4] font-serif leading-tight">
              Chef Olivier<br />Marchand
            </h2>
          </div>

          <p className="text-sm font-light text-[#8a8694] leading-loose max-w-md">
            With over two decades of culinary mastery, Chef Olivier has helmed kitchens from
            Paris to Tokyo. His approach fuses classical French technique with an obsessive
            reverence for seasonal produce, creating dishes that are as visually striking as
            they are sensorially profound.
          </p>

          <div className="flex gap-8 p-6 bg-[#121218]/30 border border-[#d4a853]/10 rounded-sm backdrop-blur-md max-w-md">
            {[
              { label: 'Trained', value: 'Le Cordon Bleu' },
              { label: 'Awards', value: '3× James Beard' },
              { label: 'Style', value: 'Neo-French' },
            ].map((item) => (
              <div key={item.label} className="space-y-1 flex-1">
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#8a8694] block">{item.label}</span>
                <span className="text-xs font-light tracking-wide text-[#f0ece4]">{item.value}</span>
              </div>
            ))}
          </div>

          <blockquote className="border-l border-[#d4a853] pl-6 py-2">
            <p className="text-sm italic font-light text-[#8a8694] leading-relaxed">
              &ldquo;Cooking is not about complexity. It is about honoring the ingredient
              and letting it speak.&rdquo;
            </p>
          </blockquote>
        </motion.div>
      </div>
    </Section>
  );
}
