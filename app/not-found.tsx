import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowLeft, Phone, Search } from 'lucide-react';
import { company } from '@/data/company';

export const metadata = {
  title: '404 - Page Not Found | Expert Tech',
  description: 'The requested resource could not be found on Expert Tech.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b1c3d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-lg text-center">
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 p-3 border border-white/15 shadow-xl">
            <Image
              src="/images/logo-mark.svg"
              alt={`${company.name} Mark`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
            Error 404
          </span>

          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Resource Not Located
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            The page or document you are looking for has moved or does not exist. Our Scottish systems engineering infrastructure remains 100% operational.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2f80ed] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#5899f0] focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/15"
            >
              <span>Explore Services</span>
            </Link>

            <a
              href={company.telLink}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-[#a1c5f6] transition-all hover:bg-white/10 border border-white/10"
            >
              <Phone className="h-4 w-4 text-[#2f80ed]" />
              <span>{company.phone}</span>
            </a>
          </div>

          {/* Quick Directory Grid to prevent dead ends */}
          <div className="mt-12 pt-8 border-t border-white/10 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6] text-center mb-4">
              Explore Available Resources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <Link
                href="/services"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Services Overview
              </Link>
              <Link
                href="/a-note-from-founder"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Note from Founder
              </Link>
              <Link
                href="/reviews"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Client Reviews
              </Link>
              <Link
                href="/careers"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Careers &amp; Jobs
              </Link>
              <Link
                href="/contact"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Contact &amp; Quotes
              </Link>
              <Link
                href="/refund-policy"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center text-white/90"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
