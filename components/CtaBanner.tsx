import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { company } from '@/data/company';

export interface CtaBannerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  showPhoneButton?: boolean;
  phoneButtonText?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export default function CtaBanner({
  id = 'cta',
  title = 'Ready to secure your IT infrastructure?',
  subtitle = `Connect with our UK-based engineering team for dedicated technical oversight and proactive systems management.`,
  primaryButtonText = 'Schedule a Discovery Call',
  primaryButtonHref = company.telLink,
  showPhoneButton = true,
  phoneButtonText = company.phoneFormatted,
  secondaryButtonText,
  secondaryButtonHref,
  className = '',
}: CtaBannerProps) {
  const isPrimaryTel = primaryButtonHref.startsWith('tel:');

  return (
    <section
      id={id}
      className={`scroll-mt-24 bg-[#2f80ed] py-16 text-white sm:py-20 ${className}`}
      aria-label="Call to action"
    >
      <SectionContainer>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/90">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            {isPrimaryTel ? (
              <a
                href={primaryButtonHref}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-[#0b1c3d] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#174076] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <Phone className="h-4 w-4 text-[#2f80ed]" />
                <span>{primaryButtonText}</span>
              </a>
            ) : (
              <Link
                href={primaryButtonHref}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-[#0b1c3d] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#174076] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="h-4 w-4 text-[#2f80ed]" />
              </Link>
            )}

            {showPhoneButton && (
              <a
                href={company.telLink}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3.5 text-base font-medium text-white transition-all hover:bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <Phone className="h-4 w-4" />
                <span>{phoneButtonText}</span>
              </a>
            )}

            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3.5 text-base font-medium text-white transition-all hover:bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>{secondaryButtonText}</span>
              </Link>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
