import React from 'react';

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="flex min-h-[50vh] w-full flex-col items-center justify-center px-4 py-16"
    >
      <div className="flex flex-col items-center gap-3.5">
        {/* Minimalist Branded Spinner */}
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Track ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
          {/* Active brand blue rotating arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-blue motion-reduce:animate-none" />
          {/* Subtle anchor node in brand navy */}
          <div className="h-2 w-2 rounded-full bg-brand-navy opacity-60" />
        </div>

        {/* Clean, calm status label */}
        <span className="text-xs font-medium tracking-wider text-slate-500 font-sans">
          Loading...
        </span>
      </div>
    </div>
  );
}
