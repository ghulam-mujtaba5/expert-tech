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
import styles from './ServiceCard.module.css';

export type ServiceIconType =
  | 'users'
  | 'cloud'
  | 'code'
  | 'phone'
  | 'smartphone'
  | 'shield';

const iconMap: Record<ServiceIconType, LucideIcon> = {
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
}: ServiceCardProps) {
  const IconComponent =
    typeof icon === 'string' ? iconMap[icon] || Code : icon;

  return (
    <div
      id={id}
      className={`group ${styles.card} ${className}`}
    >
      <div className={styles.cardBody}>
        <div>
          {/* Header row: Icon Box & Optional Category */}
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076] transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <IconComponent className="h-6 w-6 stroke-[#174076]" />
            </div>
            {badge && (
              <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#174076] shadow-sm border border-black/5">
                {badge}
              </span>
            )}
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
                  className="flex items-start gap-2 text-xs sm:text-sm text-[#1d1e20]/85"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ed]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Link */}
        {linkHref && (
          <div className="mt-6 border-t border-black/5 pt-4">
            <Link
              href={linkHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174076] transition-colors hover:text-[#2f80ed]"
            >
              <span>{linkLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
