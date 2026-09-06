'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-4 sm:left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1c3d]/90 text-white backdrop-blur-md shadow-xl border border-white/20 transition-all hover:bg-[#174076] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
          aria-label="Back to top of page"
          title="Back to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="h-5 w-5 text-[#38bdf8]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
