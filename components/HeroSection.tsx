import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
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
    gradient: 'bg-gradient-to-b from-[#0b1c3d] via-[#0b1c3d] to-[#174076] text-white',
    navy: 'bg-[#0b1c3d] text-white',
    slate: 'bg-[#ebecef] text-[#0b1c3d]',
    white: 'bg-white text-[#0b1c3d]',
  }[background];

  const isCenter = align === 'center';
  const isDark = background === 'gradient' || background === 'navy';

  const renderCtaButton = (cta: HeroCta, isPrimary: boolean) => {
    const isTel = cta.href.startsWith('tel:');
    const baseClasses = isPrimary
      ? 'inline-flex items-center gap-2 rounded-xl bg-[#2f80ed] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#5899f0] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50'
      : 'inline-flex items-center gap-2 rounded-xl bg-[#ebecef] px-6 py-3.5 text-base font-medium text-[#0b1c3d] shadow transition-all hover:bg-[#bcbcbf] focus:outline-none focus:ring-2 focus:ring-black/20';

    if (isTel) {
      return (
        <a
          key={cta.href}
          href={cta.href}
          className={baseClasses}
        >
          {cta.icon || <Phone className="h-4 w-4" />}
          <span>{cta.text}</span>
        </a>
      );
    }

    return (
      <Link
        key={cta.href}
        href={cta.href}
        className={baseClasses}
      >
        <span>{cta.text}</span>
        {cta.icon || (isPrimary ? <ArrowRight className="h-4 w-4" /> : null)}
      </Link>
    );
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 lg:py-32 border-b border-white/10 ${bgClasses} ${className}`}
    >
      {/* Background subtle mesh glow */}
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2f80ed]/20 via-transparent to-transparent"
          aria-hidden="true"
        />
      )}

      <SectionContainer>
        <div
          className={`relative mx-auto ${
            isCenter ? 'max-w-3xl text-center' : 'max-w-4xl text-left'
          }`}
        >
          {badge && (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${
                isDark ? 'text-[#a1c5f6]' : 'text-[#2f80ed]'
              }`}
            >
              {badgeIcon}
              <span>{badge}</span>
            </span>
          )}

          <h1
            className={`mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight ${
              isDark ? 'text-white' : 'text-[#0b1c3d]'
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
            className={`mt-6 text-lg sm:text-xl leading-relaxed ${
              isDark ? 'text-white/90' : 'text-[#1d1e20]/85'
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
              {primaryCta && renderCtaButton(primaryCta, true)}
              {secondaryCta && renderCtaButton(secondaryCta, false)}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 pt-8 border-t border-white/15">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
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
