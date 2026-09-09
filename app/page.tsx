import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, Zap, Server, MapPin } from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import CtaBanner from '@/components/CtaBanner';
import SchemaMarkup from '@/components/SchemaMarkup';
import { company } from '@/data/company';
import { homeContent } from '@/data/content';
import { generateServicesCatalogSchema, generateBreadcrumbSchema } from '@/data/schema';

export const metadata: Metadata = {
  title: 'Managed IT Services & Custom Software UK',
  description:
    'Expert Tech delivers proactive managed IT support, cloud solutions, and bespoke software for UK businesses with a 15-minute response SLA and 99.9% uptime assurance.',
  alternates: {
    canonical: 'https://www.experttech.uk.com',
  },
};

export default function HomePage() {
  const { hero, solutions, ctaBanner } = homeContent;

  const homeBreadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        id="hero"
        badge={hero.badge}
        titlePrefix={hero.titlePrefix}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        primaryCta={{
          text: hero.primaryCta.text,
          href: hero.primaryCta.href,
          icon: <ArrowRight className="h-4 w-4" />,
        }}
        secondaryCta={{
          text: hero.secondaryCta.text,
          href: hero.secondaryCta.href,
        }}
        background="gradient"
      />

      {/* Tailored IT Solutions Section */}
      <section
        id="services"
        className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
      >
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              {solutions.overline}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              {solutions.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80 sm:text-lg">
              {solutions.subtitle}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {solutions.items.map((item, idx) => (
              <ServiceCard
                key={item.id}
                id={`card-${item.id}`}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={idx}
                linkHref="/services"
                linkLabel="Learn more"
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* AI SEO (AEO) & GEO Answer Block */}
      <section
        id="overview"
        className="scroll-mt-24 bg-[#ebecef]/50 py-16 sm:py-20 border-t border-black/5"
        aria-label="Direct Business Overview"
      >
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              UK Technology Partner
            </span>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
              Why Forward-Thinking Businesses Rely on {company.name}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#1d1e20]/80">
              We eliminate IT complexity through proactive monitoring, rapid technical response, and custom software designed for resilience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">15-Min Response SLA</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1d1e20]/75">
                Guaranteed emergency ticket review and triage by a named UK systems engineer within 15 minutes.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">99.9% Uptime Assurance</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1d1e20]/75">
                24/7 proactive health monitoring across servers, cloud workloads, and networks to prevent outages.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">UK Data Sovereignty</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1d1e20]/75">
                100% UK tier-4 data centers (AWS London, Azure UK South), fully aligned with UK GDPR &amp; Cyber Essentials.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-[#0b1c3d]">Scottish Headquarters</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#1d1e20]/75">
                Headquartered at Cowdenbeath, Scotland, serving businesses throughout Fife, Edinburgh, and nationwide UK.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* JSON-LD Schemas */}
      <SchemaMarkup schema={homeBreadcrumb} />
      <SchemaMarkup schema={generateServicesCatalogSchema()} />

      {/* Discovery Call CTA Banner */}
      <CtaBanner
        id="cta"
        title={ctaBanner.title}
        subtitle={ctaBanner.subtitle}
        primaryButtonText={ctaBanner.buttonText}
        primaryButtonHref={ctaBanner.telLink || company.telLink}
        showPhoneButton={true}
        phoneButtonText={company.phoneFormatted}
      />
    </div>
  );
}
