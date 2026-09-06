import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { company, navLinks } from '@/data/company';

export default function Footer() {
  return (
    <footer className="w-full bg-[#071228] text-white border-t border-white/10" aria-label="Site Footer">
      {/* 3px Royal Blue Accent Line */}
      <div className="h-[3px] w-full bg-[#2f80ed]" />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Mission Column */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2f80ed] rounded-lg group"
              aria-label={`${company.name} Home`}
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#38bdf8]">
                EXPERT <span className="text-[#2f80ed]">TECH</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/80 max-w-sm">
              {company.tagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#38bdf8]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-xs text-white/75">
                <span className="font-semibold text-white">Registered Scottish Enterprise</span>
                <span className="text-[#a1c5f6]">Cowdenbeath, KY4 9QE</span>
              </div>
            </div>
          </div>

          {/* Quick Links Navigation Column */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[#38bdf8] focus:outline-none focus:text-[#38bdf8]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company Pages Column */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[#38bdf8] focus:outline-none focus:text-[#38bdf8]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              UK Engineering Desk
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ed]" />
                <a
                  href={company.telLink}
                  className="font-semibold text-white transition-colors hover:text-[#38bdf8]"
                >
                  {company.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ed]" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-[#38bdf8]"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ed]" />
                <address className="not-italic leading-relaxed text-white/70">
                  {company.address.line1}
                  <br />
                  {company.address.town}, {company.address.region},{' '}
                  {company.address.postcode}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 text-center sm:text-left">
            {company.copyright} All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/60">
            <Link
              href="/refund-policy"
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Support Desk
            </Link>
            <span>•</span>
            <span className="text-[#a1c5f6]">15-Min Response Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
