'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Section } from '../Section';

function CountUp({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, count, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(String(v)));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 3, suffix: '', label: 'Michelin Stars' },
  { value: 200, suffix: '+', label: 'Wine Selections' },
  { value: 50, suffix: 'K+', label: 'Guests Welcomed' },
];

export function StatsSection() {
  return (
    <Section>
      <div className="w-full max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex flex-col items-center text-center p-6 md:p-8 bg-[#121218]/40 backdrop-blur-md border border-[#d4a853]/10 hover:border-[#d4a853]/25 transition-all duration-500 rounded-sm"
            >
              <span className="text-4xl md:text-5xl font-light text-[#f0ece4] mb-4 tabular-nums font-serif">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <div className="w-6 h-[1px] bg-[#d4a853] mb-4" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8a8694]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
