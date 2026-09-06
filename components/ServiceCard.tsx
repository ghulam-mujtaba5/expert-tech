'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Cloud,
  Code,
  Phone,
  Smartphone,
  Shield,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import ServiceIcon from './ServiceIcon';
import LottiePlayer from './LottiePlayer';
import styles from './ServiceCard.module.css';

export type ServiceIconType =
  | 'users'
  | 'cloud'
  | 'code'
  | 'phone'
  | 'smartphone'
  | 'shield'
  | 'custom-web'
  | 'consulting'
  | 'ai-saas-mvp'
  | 'cloud-devops'
  | 'ai-automation'
  | 'data-analytics'
  | 'growth-marketing'
  | 'mobile-app'
  | 'ui-ux'
  | string;

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  cloud: Cloud,
  code: Code,
  phone: Phone,
  smartphone: Smartphone,
  shield: Shield,
};

export interface ServiceCardProps {
  id?: string;
  title: string;
  description: string;
  icon: ServiceIconType | LucideIcon;
  features?: string[];
  linkHref?: string;
  linkLabel?: string;
  badge?: string;
  className?: string;
  compact?: boolean;
  index?: number;
  lottieSrc?: string;
}

/** Resolves the appropriate high-fidelity Lottie animation JSON file */
function resolveLottie(
  lottieSrc?: string,
  id?: string,
  icon?: ServiceIconType | LucideIcon,
  title?: string
): string {
  if (lottieSrc) return lottieSrc;

  const key = `${id || ''} ${typeof icon === 'string' ? icon : ''} ${title || ''}`.toLowerCase();

  // Cybersecurity & Compliance
  if (
    key.includes('cyber') ||
    key.includes('security') ||
    key.includes('compliance') ||
    key.includes('shield')
  ) {
    return '/lottie/security-it.json';
  }

  // Web Design & Development
  if (
    key.includes('web-dev') ||
    key.includes('custom-web') ||
    key.includes('web design') ||
    key.includes('web') ||
    key.includes('ui-ux')
  ) {
    return '/lottie/web-coding.json';
  }

  // Cloud Solutions
  if (key.includes('cloud') || key.includes('devops')) {
    return '/lottie/cloud-devops.json';
  }

  // Software & App Development
  if (
    key.includes('software') ||
    key.includes('mobile') ||
    key.includes('app dev') ||
    key.includes('smartphone') ||
    key.includes('ai-saas-mvp')
  ) {
    return '/lottie/mobile-app.json';
  }

  // Network & Systems Architecture
  if (
    key.includes('network') ||
    key.includes('systems') ||
    key.includes('automation')
  ) {
    return '/lottie/automation-gears.json';
  }

  // IT Support & Helpdesk / Proactive Monitoring
  if (
    key.includes('support') ||
    key.includes('helpdesk') ||
    key.includes('consulting')
  ) {
    return '/lottie/analytics-data.json';
  }

  // Data & Analytics
  if (key.includes('data') || key.includes('analytics')) {
    return '/lottie/analytics-data.json';
  }

  // AI & Automation
  if (key.includes('ai') || key.includes('brain')) {
    return '/lottie/ai-brain.json';
  }

  return '/lottie/web-coding.json';
}

export default function ServiceCard({
  id,
  title,
  description,
  icon,
  features,
  linkHref,
  linkLabel = 'Learn more',
  badge,
  className = '',
  index = 0,
  lottieSrc,
}: ServiceCardProps) {
  const isStringIcon = typeof icon === 'string';
  const IconComponent = !isStringIcon ? icon : iconMap[icon] || Code;
  const lottieAnimationSrc = resolveLottie(lottieSrc, id, icon, title);

  return (
    <div
      id={id}
      className={`group ${styles.card} ${className}`}
    >
      {/* Megicode top animated shimmer gradient accent bar */}
      <div className={styles.accentBar} />

      {/* Megicode corner ambient radial glow */}
      <span className={styles.revealGlow} aria-hidden="true" />

      <div className={styles.cardBody}>
        <div>
          {/* Header row: 3D Illustration Icon & Optional Badge / Index Pill */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isStringIcon ? (
                <ServiceIcon slug={icon} index={index} />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9d8ee]/60 text-[#174076] transition-transform duration-200 group-hover:scale-105 shadow-sm border border-[#174076]/10">
                  <IconComponent className="h-7 w-7 stroke-[#174076]" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {badge && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#174076] shadow-sm border border-black/5 tracking-wide">
                  {badge}
                </span>
              )}
              {typeof index === 'number' && (
                <span className={styles.indexPill} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-6 font-heading text-xl font-medium tracking-tight text-[#0b1c3d] transition-colors group-hover:text-[#174076]">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-[#1d1e20]/80 sm:text-base sm:leading-relaxed">
            {description}
          </p>

          {/* Feature List (if provided) */}
          {features && features.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-black/5 pt-4">
              {features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[#1d1e20]/85 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ed]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Link & Corner Lottie Animation */}
        <div className="relative mt-6 flex items-center justify-between border-t border-black/5 pt-4">
          {linkHref && (
            <Link
              href={linkHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174076] transition-colors hover:text-[#2f80ed]"
            >
              <span>{linkLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          {/* Megicode signature hover-revealed Lottie animation from JSON */}
          <span className={styles.cardIllus} aria-hidden="true">
            <LottiePlayer
              src={lottieAnimationSrc}
              loop
              autoplay
              pauseWhenHidden
              speed={0.7}
              style={{ width: 104, height: 104 }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
