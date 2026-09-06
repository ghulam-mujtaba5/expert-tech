import React from 'react';

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-16"
    >
      <div className="relative flex flex-col items-center">
        {/* Ambient Subtle Glow */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-full bg-brand-blue/10 blur-2xl animate-pulse"
          aria-hidden="true"
        />

        {/* Hexagonal Shield Vector */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center">
          <svg
            className="h-16 w-16"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="route-loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2f80ed" />
              </linearGradient>
            </defs>

            {/* Squircle Base Frame */}
            <rect
              x="3"
              y="3"
              width="114"
              height="114"
              rx="24"
              fill="#071228"
              stroke="#2f80ed"
              strokeOpacity="0.3"
              strokeWidth="2"
            />

            {/* Hexagon Boundary */}
            <g transform="translate(60, 60)">
              <path
                d="M0 -36 L30 -18 L30 18 L0 36 L-30 18 L-30 -18 Z"
                stroke="url(#route-loader-grad)"
                strokeWidth="2.5"
                fill="none"
                className="animate-shield-draw"
              />

              {/* Monogram Monochrome */}
              <path
                d="M-14 -12 L2 -12 L2 -8 L-8 -8 L-8 -2 L-2 -2 L-2 2 L-8 2 L-8 8 L2 8 L2 12 L-14 12 Z"
                fill="#ffffff"
                className="animate-monogram-fill"
              />
              <path
                d="M-2 -12 L16 -12 L16 -8 L8 -8 L8 12 L4 12 L4 -8 L-2 -8 Z"
                fill="#38bdf8"
                className="animate-monogram-fill"
              />

              {/* Glowing Center Node */}
              <circle
                cx="0"
                cy="0"
                r="3.5"
                fill="#38bdf8"
                className="animate-node-pulse"
              />
            </g>
          </svg>
        </div>

        {/* Micro-Typography Status */}
        <div className="mt-5 flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-brand-navy-accent font-semibold uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2f80ed] animate-ping" />
            <span>Loading Expert Tech</span>
          </div>
          <p className="mt-1 text-[10px] font-mono text-slate-500 tracking-wider">
            SYNCHRONIZING ENTERPRISE BUFFER
          </p>
        </div>
      </div>
    </div>
  );
}
