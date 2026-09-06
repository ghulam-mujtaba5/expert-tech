'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // When route changes, trigger a quick, elegant top bar animation
    setNavigating(true);
    setProgress(30);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 120);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 280);

    const timer3 = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 550);

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
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9998] h-[2.5px] overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#2f80ed] via-[#38bdf8] to-white nav-progress-glow transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity',
        }}
      />
    </div>
  );
}
