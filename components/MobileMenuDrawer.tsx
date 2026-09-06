'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Layers,
  Star,
  UserCheck,
  Briefcase,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { company, navLinks } from '@/data/company';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navIcons: Record<string, React.ElementType> = {
  '/': Home,
  '/services': Layers,
  '/reviews': Star,
  '/a-note-from-founder': UserCheck,
  '/careers': Briefcase,
  '/contact': PhoneCall,
  '/refund-policy': ShieldCheck,
};

export default function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevPathname = useRef(pathname);

  // Close drawer ONLY when route actually changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Lock body scroll and set focus when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer automatically if viewport resized to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  // Handle ESC key press (WCAG 2.1 modal dismissal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
          {/* Backdrop blur overlay - tap outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel (Width Safe for 320px screens) */}
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-[101] flex h-full h-[100dvh] w-full max-w-[340px] sm:max-w-sm flex-col bg-[#071228] text-white shadow-2xl border-l border-white/10"
          >
            {/* Drawer Header */}
            <div className="flex h-18 sm:h-20 shrink-0 items-center justify-between px-5 sm:px-6 border-b border-white/10 bg-[#0b1c3d]/70 backdrop-blur-md">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2f80ed] rounded-lg p-1"
                aria-label={`${company.name} Home`}
              >
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
                  EXPERT <span className="text-[#2f80ed]">TECH</span>
                </span>
              </Link>

              {/* Close Button with 44px min touch target */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {/* Quick Status */}
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-white/90">UK Systems Live</span>
                </div>
                <span className="text-[11px] text-[#38bdf8] font-medium bg-[#38bdf8]/10 px-2 py-0.5 rounded-md border border-[#38bdf8]/20">
                  15-Min SLA
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5" aria-label="Mobile Menu Navigation">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname?.startsWith(item.href);
                  const Icon = navIcons[item.href] || Layers;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm sm:text-base font-medium transition-all active:scale-[0.98] ${
                        isActive
                          ? 'bg-[#2f80ed] text-white font-semibold shadow-md shadow-[#2f80ed]/30'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-[#a1c5f6] group-hover:bg-white/10 group-hover:text-white'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isActive ? 'text-white' : 'text-white/40 group-hover:translate-x-1'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Direct Engineer Call CTA Card — Designed to Never Overflow */}
              <div className="rounded-2xl bg-gradient-to-br from-[#174076] to-[#0b1c3d] p-4 sm:p-5 border border-[#2f80ed]/40 shadow-xl">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                    Direct Technical Line
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-white/80">
                  Speak directly with senior UK systems engineers.
                </p>

                <a
                  href={company.telLink}
                  className="mt-3.5 flex w-full min-h-[46px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2f80ed] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:bg-[#5899f0] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="truncate">Call {company.phoneFormatted}</span>
                </a>
              </div>

              {/* Contact Information & Registered Office */}
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10 space-y-3 text-xs text-white/80">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#38bdf8] mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-white/50 uppercase tracking-wider">Email Inquiry</span>
                    <a
                      href={`mailto:${company.email}`}
                      className="font-medium text-white hover:text-[#38bdf8] transition-colors truncate block"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2.5 border-t border-white/10">
                  <MapPin className="h-4 w-4 shrink-0 text-[#38bdf8] mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-white/50 uppercase tracking-wider">Registered Office</span>
                    <address className="not-italic leading-relaxed text-white/70 text-[11px]">
                      {company.address.line1}, {company.address.town}, {company.address.region}, {company.address.postcode}
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="shrink-0 border-t border-white/10 bg-[#071228] px-5 py-3.5">
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>{company.jurisdiction}</span>
                <Link
                  href="/refund-policy"
                  onClick={onClose}
                  className="hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
