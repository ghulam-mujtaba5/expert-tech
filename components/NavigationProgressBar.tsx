'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Avoid triggering artificial top bar flash on initial page arrival
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
    }

    setNavigating(true);
    setProgress(35);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 100);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 240);

    const timer3 = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  if (!navigating && progress === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9998] h-[2px] overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-brand-blue to-[#38bdf8] transition-all duration-200 ease-out shadow-[0_0_8px_rgba(47,128,237,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity',
        }}
      />
    </div>
  );
}
