'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { company } from '@/data/company';

export default function ContactInfoCards() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Address */}
      <div className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
              <MapPin className="h-6 w-6" />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=175-179+High+Street+Cowdenbeath+KY4+9QE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2f80ed] hover:underline"
              title="Open registered office in Google Maps"
            >
              <span>Map</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">
            Registered Office
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#1d1e20]/80">
            {company.address.full}
          </p>
          <span className="mt-3 inline-block rounded-md bg-[#ebecef] px-2.5 py-1 text-[11px] font-semibold text-[#174076]">
            Cowdenbeath, Scotland
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-black/5">
          <button
            type="button"
            onClick={() => handleCopy(company.address.full, 'address')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174076] hover:text-[#2f80ed] transition-colors"
          >
            {copiedItem === 'address' ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Address copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy address</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
              <Phone className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Desk
            </span>
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">
            Direct Telephone
          </h3>
          <a
            href={company.telLink}
            className="mt-2 block text-sm font-bold text-[#2f80ed] hover:underline"
            title={`Call ${company.phoneFormatted}`}
          >
            {company.phoneFormatted}
          </a>
          <p className="mt-1 text-xs text-[#1d1e20]/70">
            Direct desk to UK engineers
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-black/5">
          <button
            type="button"
            onClick={() => handleCopy(company.phone, 'phone')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174076] hover:text-[#2f80ed] transition-colors"
          >
            {copiedItem === 'phone' ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Number copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy number</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
              <Mail className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-semibold text-[#174076]">15-min SLA</span>
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">
            Corporate Inquiries
          </h3>
          <a
            href={`mailto:${company.email}`}
            className="mt-2 block text-sm font-bold text-[#2f80ed] hover:underline"
          >
            {company.email}
          </a>
          <p className="mt-1 text-xs text-[#1d1e20]/70">
            15-minute response SLA
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-black/5">
          <button
            type="button"
            onClick={() => handleCopy(company.email, 'email')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174076] hover:text-[#2f80ed] transition-colors"
          >
            {copiedItem === 'email' ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Email copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hours */}
      <div className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">
            Operating Hours
          </h3>
          <p className="mt-2 text-xs text-[#1d1e20]/80">
            Mon - Fri: 9:00 - 18:00
          </p>
          <p className="mt-1 text-[11px] font-medium text-[#174076]">
            24/7 Monitoring for Retainer Clients
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-black/5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Engineers on duty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
