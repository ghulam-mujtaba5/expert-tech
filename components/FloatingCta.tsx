'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { company } from '@/data/company';

export default function FloatingCta() {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-4 sm:right-6 z-40">
      <motion.a
        href={company.telLink}
        className="group relative flex h-14 w-14 sm:h-14 sm:w-auto sm:px-4 sm:gap-2.5 items-center justify-center rounded-full bg-[#2f80ed] text-white shadow-2xl transition-all hover:bg-[#5899f0] hover:shadow-cyan-500/20 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#2f80ed]/40 border border-white/20"
        aria-label={`Call ${company.name} at ${company.phone}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Icon */}
        <Phone className="relative h-5 w-5 text-white shrink-0" />

        {/* Text on larger mobile & tablet/desktop */}
        <span className="hidden sm:inline font-semibold text-xs tracking-wide">
          Call {company.phoneFormatted}
        </span>
      </motion.a>
    </aside>
  );
}
