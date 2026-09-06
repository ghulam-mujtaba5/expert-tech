import React from 'react';
import type { Metadata } from 'next';
import {
  Quote,
  CheckCircle2,
} from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';
import ServiceIcon from '@/components/ServiceIcon';
import CtaBanner from '@/components/CtaBanner';
import { company } from '@/data/company';
import { founderContent } from '@/data/content';

export const metadata: Metadata = {
  title: 'A Note from Founder',
  description:
    'A personal message from Milon Mahmud, Founder of Expert Tech, on our dedication to delivering quiet, reliable, and proactive IT services for UK businesses.',
};

export default function FounderNotePage() {
  const { hero, manifesto, principles } = founderContent;

  return (
    <div className="flex flex-col">
      {/* Founder Hero Section with Brand Dark Navy Atmosphere */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#0b1c3d] py-20 text-white sm:py-24 lg:py-28 border-b border-white/10"
      >
        {/* Subtle mesh radial glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2f80ed]/20 via-transparent to-transparent"
          aria-hidden="true"
        />

        <SectionContainer>
          <div className="relative mx-auto max-w-5xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Founder Portrait Container */}
              <div className="flex flex-col items-center justify-center lg:col-span-5 text-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80"
                    alt={`${hero.founderName} - Founder of ${company.name}`}
                    className="h-56 w-56 sm:h-64 sm:w-64 rounded-full object-cover shadow-2xl ring-4 ring-[#2f80ed]/40 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {hero.founderName}
                </h1>
                <p className="text-sm font-medium text-[#a1c5f6]">
                  {hero.founderTitle} • {company.name}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Cowdenbeath, Scotland
                </p>
              </div>

              {/* Founder Quote Card with Cursive Accent Typography */}
              <div className="flex flex-col rounded-3xl bg-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-md lg:col-span-7 border border-white/15">
                <Quote className="h-10 w-10 text-[#38bdf8]" />

                <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
                  {hero.founderBio}
                </p>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <blockquote className="font-accent font-serif italic text-2xl sm:text-3xl text-white tracking-normal leading-snug">
                    “{hero.founderQuote}”
                  </blockquote>
                  <p className="mt-3 text-xs uppercase tracking-widest text-[#a1c5f6] font-semibold">
                    — {hero.founderName}, Personal Motto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Founder Letter & Narrative on UK IT Landscape */}
      <section id="letter" className="bg-white py-20 sm:py-24">
        <SectionContainer size="narrow">
          <div className="mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              Letter From The Founder
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              Building a Culture of Quiet Reliability
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[#1d1e20]/85 sm:text-lg sm:leading-relaxed">
              <p>
                When I founded <strong>{company.name}</strong>, the vision was born
                from a clear observation of the UK technology landscape: far too many
                growing enterprises were burdened by reactive, slow, and overly complex
                IT service providers. Simple issues frequently spiraled into costly
                downtime, and business leaders were left navigating confusing technical
                jargon and opaque billing structures.
              </p>

              <p>
                My journey in the UK—from arriving as an international student with a
                deep passion for computer systems to establishing a registered Scottish
                technology enterprise—taught me that true technical partnership requires
                dedication, humility, and absolute transparency. We treat every client’s
                infrastructure with the same rigorous care and diligence as our own.
              </p>

              <p>
                Today, our UK engineering team operates on a simple promise: technology
                should quietly power your operations in the background, eliminating
                friction and enabling your team to focus entirely on growth. Whether we
                are designing custom cloud architecture, managing daily helpdesk tickets,
                or developing bespoke business software, we deliver with uncompromising
                Scottish and British standards.
              </p>

              <div className="mt-8 rounded-2xl bg-[#ebecef] p-6 border-l-4 border-[#2f80ed]">
                <p className="text-sm italic text-[#0b1c3d] sm:text-base">
                  “Our commitment is straightforward: we answer quickly, solve problems
                  proactively, and communicate openly. When your systems work seamlessly,
                  we have done our job.”
                </p>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#174076]">
                  Milon Mahmud — Founder & IT Director
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Philosophy Manifesto Block */}
      <section
        id="manifesto"
        className="scroll-mt-24 bg-[#0b1c3d] py-20 text-white sm:py-24 lg:py-28"
      >
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
              {manifesto.overline}
            </span>
            <h2 className="mt-6 font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              {manifesto.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
              {manifesto.description}
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Principles & Values Block */}
      <section
        id="values"
        className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
      >
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              {principles.overline}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              {principles.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80 sm:text-lg">
              {principles.subtitle}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {principles.items.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[#ebecef] p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-black/5"
                >
                  <div>
                    <div className="mb-2">
                      <ServiceIcon slug={item.id} index={idx} size={54} />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-medium text-[#0b1c3d]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#1d1e20]/75 sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-4 text-xs font-semibold text-[#174076]">
                    <CheckCircle2 className="h-4 w-4 text-[#2f80ed]" />
                    <span>Core Value</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Call to Action Banner using CtaBanner with proper contrast */}
      <CtaBanner
        id="cta"
        title="Ready to Experience Proactive IT Management?"
        subtitle={`Speak directly with our UK-based team to discuss how ${company.name} can support and safeguard your infrastructure.`}
        primaryButtonText="Talk to Us"
        primaryButtonHref="/contact"
        showPhoneButton={true}
        phoneButtonText={company.phoneFormatted}
      />
    </div>
  );
}
