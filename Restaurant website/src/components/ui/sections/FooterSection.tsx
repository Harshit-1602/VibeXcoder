'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Experience: [
    { label: 'Tasting Menu', href: '#menu' },
    { label: 'Wine Pairing', href: '#menu' },
    { label: 'Private Dining', href: '#reservation' },
    { label: "Chef's Table", href: '#chef' },
  ],
  Information: [
    { label: 'Our Story', href: '#philosophy' },
    { label: 'The Team', href: '#chef' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Connect: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Newsletter', href: '#reservation' },
  ],
};

export function FooterSection() {
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // External links (https://) will open normally
  }, []);

  return (
    <footer className="w-screen px-6 md:px-16 py-20 border-t border-[#d4a853]/10 bg-[#0a0a0f] relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-[0.25em] text-[#f0ece4] font-serif">ÉLAN</h3>
            <p className="text-xs font-light text-[#8a8694] leading-relaxed max-w-[200px]">
              Where culinary artistry meets the extraordinary. Three Michelin stars since 2019.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#d4a853] font-medium">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      target={link.href.startsWith('https') ? '_blank' : undefined}
                      rel={link.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                      className="text-xs font-light text-[#8a8694] hover:text-[#d4a853] transition-colors duration-300 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-[#d4a853]/10 mb-10">
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#8a8694]/50 block">Location</span>
            <span className="text-xs font-light text-[#f0ece4]">24 Rue de Rivoli, 75004 Paris, France</span>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#8a8694]/50 block">Hours</span>
            <span className="text-xs font-light text-[#f0ece4]">Tue — Sat · 18:30 — 23:00</span>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#8a8694]/50 block">Reservations</span>
            <a href="tel:+33142868788" className="text-xs font-light text-[#f0ece4] hover:text-[#d4a853] transition-colors cursor-pointer">
              +33 1 42 86 87 88
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#d4a853]/10">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-[8px] tracking-[0.4em] uppercase text-[#8a8694]/40">
              © MMXXVI ÉLAN · All rights reserved
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#8a8694]/40">
              Developed by <span className="text-[#d4a853] font-medium">Harshit Uppal</span>
            </span>
          </div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[8px] tracking-[0.25em] uppercase text-[#8a8694]/40 hover:text-[#d4a853] transition-colors cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
