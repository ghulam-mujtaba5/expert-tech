'use client';

import React, { useEffect, useState } from 'react';

const TELEMETRY_PHASES = [
  'INITIALIZING SECURE NEXUS',
  'CALIBRATING CLOUD MESH',
  'SYNCHRONIZING ENTERPRISE NODES',
  'SYSTEMS OPTIMAL',
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
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

    // High-precision non-linear progression
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth duration

    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Designer quartic ease-out curve: fast ramp-up, organic deceleration
      const ease = 1 - Math.pow(1 - t, 4);
      const currentProgress = Math.min(Math.round(ease * 100), 100);

      setProgress(currentProgress);

      if (currentProgress < 30) {
        setPhaseIndex(0);
      } else if (currentProgress < 65) {
        setPhaseIndex(1);
      } else if (currentProgress < 95) {
        setPhaseIndex(2);
      } else {
        setPhaseIndex(3);
      }

      if (t < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Complete state hold before cinematic curtain lift
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setIsDismissed(true);
          }, 800); // matches the curtain transition duration
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Escape key listener to skip immediately
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
    <aside
      aria-label="Loading Expert Tech application"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071228] text-white transition-all duration-700 select-none ${
        isFinished
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] rounded-full bg-gradient-to-tr from-brand-blue/20 via-[#38bdf8]/15 to-transparent blur-[90px] animate-ambient-aura"
        aria-hidden="true"
      />

      {/* Subtle architectural grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Central Content Column */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Animated Brand Emblem */}
        <div className="relative mb-7 flex items-center justify-center">
          <svg
            className="h-28 w-28 drop-shadow-[0_0_24px_rgba(56,189,248,0.25)]"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preloader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2f80ed" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="preloader-grad-t" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <filter id="preloader-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Squircle Ambient Border */}
            <rect
              x="2"
              y="2"
              width="116"
              height="116"
              rx="26"
              stroke="#38bdf8"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />

            {/* Hexagonal Outer Nexus Boundary */}
            <g transform="translate(60, 60)">
              <path
                d="M0 -42 L36 -21 L36 21 L0 42 L-36 21 L-36 -21 Z"
                fill="#071228"
                stroke="url(#preloader-grad)"
                strokeWidth="3"
                className="animate-shield-draw"
              />

              {/* Shield Facet Sheen */}
              <path
                d="M0 -36 L30 -18 L30 18 L0 36 L-30 18 L-30 -18 Z"
                fill="url(#preloader-grad)"
                opacity="0.15"
              />

              {/* Interlocking 'E' and 'T' Monogram */}
              <g className="animate-monogram-fill">
                {/* Stylized 'E' */}
                <path
                  d="M-18 -16 L4 -16 L4 -11 L-10 -11 L-10 -3 L-2 -3 L-2 2 L-10 2 L-10 10 L4 10 L4 15 L-18 15 Z"
                  fill="#ffffff"
                />
                {/* Stylized 'T' */}
                <path
                  d="M-4 -16 L20 -16 L20 -11 L10 -11 L10 15 L5 15 L5 -11 L-4 -11 Z"
                  fill="url(#preloader-grad-t)"
                />
              </g>

              {/* Active Pulsing Nexus Nodes */}
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#38bdf8"
                filter="url(#preloader-glow)"
                className="animate-node-pulse"
              />
              <circle cx="0" cy="-42" r="2.5" fill="#38bdf8" />
              <circle cx="36" cy="0" r="2.5" fill="#38bdf8" />
              <circle cx="-36" cy="0" r="2.5" fill="#60a5fa" />
              <circle cx="0" cy="42" r="2.5" fill="#38bdf8" />
            </g>
          </svg>
        </div>

        {/* Brand Wordmark */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 font-heading text-xl font-bold tracking-[0.25em] text-white sm:text-2xl">
            <span>EXPERT</span>
            <span className="text-[#38bdf8]">TECH</span>
          </div>
          <span className="mt-1 text-[10px] font-medium tracking-[0.3em] text-[#a1c5f6] uppercase">
            Managed IT &amp; Cloud Solutions
          </span>
        </div>

        {/* Progress Bar & Numerical Readout */}
        <div className="mt-8 flex w-64 max-w-full flex-col items-center">
          {/* Track */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#2f80ed] via-[#38bdf8] to-white transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px #38bdf8',
              }}
            />
          </div>

          {/* Micro Telemetry & Counter */}
          <div className="mt-3 flex w-full items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="transition-all duration-300 tracking-wider">
              {TELEMETRY_PHASES[phaseIndex]}
            </span>
            <span className="font-semibold text-white tabular-nums">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Infrastructure Metadata Badge */}
      <div className="absolute bottom-7 left-0 right-0 flex items-center justify-center px-4">
        <div className="flex items-center space-x-3 text-[10px] font-mono tracking-wider text-slate-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FIFE, SCOTLAND // UK RESILIENCE NODE</span>
          <span className="hidden sm:inline text-slate-600">&bull;</span>
          <span className="hidden sm:inline text-slate-400">99.99% RESILIENT</span>
        </div>
      </div>

      {/* Skip cue */}
      <button
        type="button"
        onClick={() => {
          setIsFinished(true);
          setIsDismissed(true);
        }}
        className="absolute top-6 right-6 text-[10px] font-mono tracking-widest text-slate-400 hover:text-white transition-colors duration-200 border border-white/10 rounded px-2.5 py-1 backdrop-blur-sm cursor-pointer"
      >
        SKIP [ESC]
      </button>

      {/* Curtain Bottom Edge Glow (during reveal) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent transition-opacity duration-300 ${
          isFinished ? 'opacity-100 shadow-[0_0_15px_#38bdf8]' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </aside>
  );
}
