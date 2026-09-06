'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsDismissed(true);
        return;
      }
    }

    // Fast, simple, reliable progression (650ms total)
    const startTime = performance.now();
    const duration = 650;
    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Clean cubic ease-out curve
      const ease = 1 - Math.pow(1 - t, 3);
      const currentProgress = Math.min(Math.round(ease * 100), 100);

      setProgress(currentProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setIsDismissed(true);
          }, 350);
        }, 120);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFinished(true);
        setIsDismissed(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      aria-label="Loading Expert Tech"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071228] transition-opacity duration-300 select-none ${
        isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Simple Clean Brand Wordmark */}
        <div className="flex items-center space-x-2 font-heading text-2xl font-bold tracking-[0.2em] text-white">
          <span>EXPERT</span>
          <span className="text-[#38bdf8]">TECH</span>
        </div>

        {/* Simple, Non-Boxy Loading Line */}
        <div className="mt-6 flex w-48 flex-col items-center">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#2f80ed] to-[#38bdf8] transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
              }}
            />
          </div>

          <div className="mt-3 flex w-full items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="tracking-wider text-slate-500">Loading</span>
            <span className="tabular-nums text-[#38bdf8]">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
