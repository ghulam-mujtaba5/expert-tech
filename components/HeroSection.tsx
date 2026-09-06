import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionContainer from './SectionContainer';

export interface HeroCta {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroSectionProps {
  id?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  title?: React.ReactNode;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  stats?: HeroStat[];
  background?: 'gradient' | 'navy' | 'slate' | 'white';
  align?: 'center' | 'left';
  className?: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  id = 'hero',
  badge,
  badgeIcon,
  title,
  titlePrefix,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  background = 'gradient',
  align = 'center',
  className = '',
  children,
}: HeroSectionProps) {
  const bgClasses = {
    gradient: 'bg-gradient-to-b from-[#0b1c3d] to-[#2f80ed] text-white',
    navy: 'bg-[#0b1c3d] text-white',
    slate: 'bg-[#bcbcbf] text-[#0b1c3d]',
    white: 'bg-white text-[#0b1c3d]',
  }[background];

  const isCenter = align === 'center';

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-24 lg:py-28 ${bgClasses} ${className}`}
    >
      <SectionContainer>
        <div
          className={`mx-auto ${
            isCenter ? 'max-w-3xl text-center' : 'max-w-4xl text-left'
          }`}
        >
          {badge && (
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${
                background === 'gradient' || background === 'navy'
                  ? 'text-[#a1c5f6]'
                  : 'text-[#0b1c3d]'
              }`}
            >
              {badge}
            </span>
          )}

          <h1
            className={`mt-6 font-heading text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl ${
              background === 'gradient' || background === 'navy'
                ? 'text-white'
                : 'text-[#0b1c3d]'
            }`}
          >
            {title ? (
              title
            ) : (
              <>
                {titlePrefix}
                {titleHighlight && (
                  <strong className="font-semibold underline decoration-[#2f80ed] underline-offset-8">
                    {titleHighlight}
                  </strong>
                )}
              </>
            )}
          </h1>

          <p
            className={`mt-6 text-base leading-relaxed sm:text-lg sm:leading-relaxed ${
              background === 'gradient' || background === 'navy'
                ? 'text-white/90'
                : 'text-[#1d1e20]/85'
            }`}
          >
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div
              className={`mt-10 flex flex-wrap items-center gap-4 ${
                isCenter ? 'justify-center' : 'justify-start'
              }`}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#5899f0] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span>{primaryCta.text}</span>
                  {primaryCta.icon || <ArrowRight className="h-4 w-4" />}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#ebecef] px-6 py-3.5 text-base font-medium text-black shadow transition-all hover:bg-[#bcbcbf] focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  <span>{secondaryCta.text}</span>
                  {secondaryCta.icon}
                </Link>
              )}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs sm:text-sm uppercase tracking-wider text-[#a1c5f6]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>
      </SectionContainer>
    </section>
  );
}
