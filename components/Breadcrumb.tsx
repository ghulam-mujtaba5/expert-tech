import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Breadcrumb({
  items,
  variant = 'light',
  className = '',
}: BreadcrumbProps) {
  const isDark = variant === 'dark';

  const textColor = isDark ? 'text-white/70' : 'text-[#1d1e20]/70';
  const hoverColor = isDark ? 'hover:text-white' : 'hover:text-[#2f80ed]';
  const activeColor = isDark ? 'text-white font-medium' : 'text-[#0b1c3d] font-semibold';
  const separatorColor = isDark ? 'text-white/40' : 'text-black/30';
  const homeBgColor = isDark ? 'hover:bg-white/10' : 'hover:bg-[#ebecef]';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 sm:py-4 ${className}`}
    >
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs sm:text-sm ${textColor}`}>
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors ${hoverColor} ${homeBgColor}`}
            title="Home"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              <ChevronRight
                className={`h-3.5 w-3.5 shrink-0 ${separatorColor}`}
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`px-1.5 py-0.5 rounded-md ${activeColor}`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-md px-1.5 py-1 transition-colors ${hoverColor} ${homeBgColor}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
