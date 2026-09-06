'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { company } from '@/data/company';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-onboarding',
    category: 'Onboarding',
    question: 'How quickly can Expert Tech onboard our company?',
    answer:
      'Our onboarding process is engineered for zero business downtime. For standard small-to-medium UK operations, complete audit, endpoint agent deployment, and proactive 24/7 monitoring are typically achieved within 24 to 48 hours.',
  },
  {
    id: 'faq-sla',
    category: 'IT Support',
    question: 'What is covered under your 15-minute response SLA?',
    answer:
      'Every priority incident submitted via telephone, email, or client portal is acknowledged by a named UK systems engineer within 15 minutes. We initiate immediate diagnostics, remote triage, and keep your designated points of contact informed at each stage.',
  },
  {
    id: 'faq-co-managed',
    category: 'Collaboration',
    question: 'Can Expert Tech collaborate with our existing internal IT team?',
    answer:
      'Absolutely. We frequently provide co-managed IT services where we act as an escalation force for tier-3 incidents, out-of-hours coverage, specialized cloud migrations, and routine patch compliance, allowing your in-house staff to concentrate on core business initiatives.',
  },
  {
    id: 'faq-data-residency',
    category: 'Compliance',
    question: 'Where is our company data hosted, backed up, and maintained?',
    answer:
      'All client data, system backups, and infrastructure services are strictly stored within UK-based tier-4 data facilities (AWS London, Microsoft Azure UK South, or sovereign UK private clouds). We ensure full compliance with UK GDPR, the Data Protection Act 2018, and Cyber Essentials guidelines.',
  },
  {
    id: 'faq-contracts',
    category: 'Agreements',
    question: 'Are there lengthy lock-in contracts or multi-year tie-ins?',
    answer:
      'No. We believe in earning your business every single month through technical excellence. Our managed IT retainers operate on flexible rolling monthly agreements with a transparent 30-day notice period. Bespoke software projects are quoted on fixed milestones.',
  },
  {
    id: 'faq-out-of-hours',
    category: 'Support',
    question: 'Do you provide out-of-hours and emergency weekend coverage?',
    answer:
      'Yes. Our automated monitoring infrastructure operates 24/7/365, tracking server health, firewall integrity, and backup verification. For mission-critical operations, our on-call engineers are available around the clock via our dedicated priority emergency line.',
  },
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-onboarding');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28 border-t border-black/5" aria-label="Frequently Asked Questions">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ebecef] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#174076]">
            <HelpCircle className="h-3.5 w-3.5 text-[#2f80ed]" />
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80 sm:text-lg">
            Transparent answers regarding our UK engineering practices, response SLAs, onboarding timelines, and data sovereignty.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-[#2f80ed]/40 bg-[#ebecef]/40 shadow-sm'
                    : 'border-black/5 bg-white hover:border-black/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${faq.id}`}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/50 rounded-2xl"
                >
                  <span className="font-heading text-base sm:text-lg font-semibold text-[#0b1c3d]">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#2f80ed] text-white'
                        : 'bg-[#ebecef] text-[#0b1c3d]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`answer-${faq.id}`}
                    role="region"
                    className="px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-[#1d1e20]/80"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Box */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#ebecef] p-6 sm:p-8 border border-black/5">
          <div>
            <h3 className="font-heading text-lg font-semibold text-[#0b1c3d]">
              Have a specific technical question?
            </h3>
            <p className="mt-1 text-sm text-[#1d1e20]/75">
              Speak directly with our senior systems architects in Cowdenbeath.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={company.telLink}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b1c3d] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#174076]"
            >
              <Phone className="h-4 w-4 text-[#38bdf8]" />
              <span>{company.phoneFormatted}</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2f80ed] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#5899f0]"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
