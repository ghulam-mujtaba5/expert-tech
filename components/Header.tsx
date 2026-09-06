'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import MobileMenuDrawer from './MobileMenuDrawer';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* WCAG 2.1 AA Skip to Content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-[#2f80ed] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-[#0b1c3d]/95 backdrop-blur-md border-b border-white/10 transition-colors duration-200">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#2f80ed] rounded-lg p-1 shrink-0"
            aria-label={`${company.name} Home`}
          >
            <div className="relative h-9 w-36 sm:h-10 sm:w-44 md:h-11 md:w-48">
              <Image
                src="/logo-white.svg"
                alt={company.name}
                fill
                sizes="(max-width: 640px) 144px, 200px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all rounded-lg ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold shadow-inner'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#38bdf8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Header CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={company.telLink}
              className="flex items-center gap-2 rounded-xl bg-[#2f80ed] px-4.5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#5899f0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0b1c3d]"
            >
              <Phone className="h-4 w-4" />
              <span>{company.phoneFormatted}</span>
              <span className="sr-only">{company.phone}</span>
            </a>
          </div>

          {/* Mobile Actions: Phone Call Button + Hamburger Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <a
              href={company.telLink}
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] sm:w-auto sm:px-3.5 sm:gap-2 items-center justify-center rounded-xl bg-[#2f80ed] text-white shadow-md transition-all hover:bg-[#5899f0] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              aria-label={`Call ${company.name} at ${company.phoneFormatted}`}
              title={`Call ${company.phoneFormatted}`}
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
                {company.phoneFormatted}
              </span>
            </a>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/10 text-white/90 transition-all hover:bg-white/20 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Open navigation menu"
            >
              <div className="flex flex-col items-center justify-center gap-1.5 w-5 sm:w-6">
                <span className="block h-0.5 w-5 sm:w-6 rounded-full bg-white transition-all group-hover:bg-[#38bdf8]" />
                <span className="block h-0.5 w-5 sm:w-6 rounded-full bg-white transition-all group-hover:bg-[#38bdf8]" />
                <span className="block h-0.5 w-3.5 sm:w-4 self-start rounded-full bg-[#38bdf8] transition-all group-hover:w-full" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Dedicated Mobile Menu Drawer rendered outside header to avoid backdrop-filter trap */}
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile drawer navigation structure */}
      {mobileMenuOpen && (
        <div className="sr-only lg:hidden" aria-hidden="true">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => {
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
