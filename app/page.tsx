import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import CtaBanner from '@/components/CtaBanner';
import { company } from '@/data/company';
import { homeContent } from '@/data/content';

export default function HomePage() {
  const { hero, solutions, ctaBanner } = homeContent;

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
