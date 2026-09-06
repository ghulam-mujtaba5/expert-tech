'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ServiceIcon.module.css';

export interface IconMeta {
  src: string;
  accent: string;
  alt: string;
}

export const SERVICE_ICON_MAP: Record<string, IconMeta> = {
  // Primary semantic slugs
  'ai-automation': {
    src: '/service-icons/ai-automation.png',
    accent: '#4573df',
    alt: 'AI Automation',
  },
  'ai-automation-agents': {
    src: '/service-icons/ai-automation.png',
    accent: '#4573df',
    alt: 'AI Automation',
  },
  'ai-saas-mvp': {
    src: '/service-icons/ai-saas-mvp.png',
    accent: '#4573df',
    alt: 'AI SaaS & MVP Development',
  },
  'ai-saas-mvp-development': {
    src: '/service-icons/ai-saas-mvp.png',
    accent: '#4573df',
    alt: 'AI SaaS & MVP Development',
  },
  'custom-web': {
    src: '/service-icons/custom-web.png',
    accent: '#2563eb',
    alt: 'Custom Web Development',
  },
  'custom-web-development': {
    src: '/service-icons/custom-web.png',
    accent: '#2563eb',
    alt: 'Custom Web Development',
  },
  'ui-ux': {
    src: '/service-icons/ui-ux.png',
    accent: '#ec4899',
    alt: 'UI/UX Design',
  },
  'ui-ux-design': {
    src: '/service-icons/ui-ux.png',
    accent: '#ec4899',
    alt: 'UI/UX Design',
  },
  'mobile-app': {
    src: '/service-icons/mobile-app.png',
    accent: '#06b6d4',
    alt: 'Mobile App Development',
  },
  'mobile-app-development': {
    src: '/service-icons/mobile-app.png',
    accent: '#06b6d4',
    alt: 'Mobile App Development',
  },
  'cloud-devops': {
    src: '/service-icons/cloud-devops.png',
    accent: '#0ea5e9',
    alt: 'Cloud Solutions & DevOps',
  },
  'data-analytics': {
    src: '/service-icons/data-analytics.png',
    accent: '#8b5cf6',
    alt: 'Data Analytics & Infrastructure',
  },
  'consulting': {
    src: '/service-icons/consulting.png',
    accent: '#10b981',
    alt: 'IT Support & Technical Consulting',
  },
  'technical-consulting': {
    src: '/service-icons/consulting.png',
    accent: '#10b981',
    alt: 'Technical Consulting',
  },
  'growth-marketing': {
    src: '/service-icons/growth-marketing.png',
    accent: '#f97316',
    alt: 'Growth & Systems Architecture',
  },
  'growth-marketing-seo': {
    src: '/service-icons/growth-marketing.png',
    accent: '#f97316',
    alt: 'Growth & SEO',
  },

  // Existing Expert Tech aliases & identifiers
  'code': {
    src: '/service-icons/custom-web.png',
    accent: '#2563eb',
    alt: 'Web Design & Development',
  },
  'web-dev': {
    src: '/service-icons/custom-web.png',
    accent: '#2563eb',
    alt: 'Web Design & Development',
  },
  'phone': {
    src: '/service-icons/consulting.png',
    accent: '#10b981',
    alt: 'IT Support & Helpdesk',
  },
  'it-support': {
    src: '/service-icons/consulting.png',
    accent: '#10b981',
    alt: 'IT Support & Helpdesk',
  },
  'support': {
    src: '/service-icons/consulting.png',
    accent: '#10b981',
    alt: 'IT Support & Helpdesk',
  },
  'smartphone': {
    src: '/service-icons/mobile-app.png',
    accent: '#06b6d4',
    alt: 'Software & App Development',
  },
  'software-dev': {
    src: '/service-icons/ai-saas-mvp.png',
    accent: '#4573df',
    alt: 'Software & App Development',
  },
  'software': {
    src: '/service-icons/ai-saas-mvp.png',
    accent: '#4573df',
    alt: 'Software & App Development',
  },
  'cloud': {
    src: '/service-icons/cloud-devops.png',
    accent: '#0ea5e9',
    alt: 'Cloud Solutions',
  },
  'cloud-solutions': {
    src: '/service-icons/cloud-devops.png',
    accent: '#0ea5e9',
    alt: 'Cloud Solutions',
  },
  'shield': {
    src: '/service-icons/ai-automation.png',
    accent: '#4573df',
    alt: 'Cybersecurity & Compliance',
  },
  'cybersecurity': {
    src: '/service-icons/ai-automation.png',
    accent: '#4573df',
    alt: 'Cybersecurity & Compliance',
  },
  'users': {
    src: '/service-icons/data-analytics.png',
    accent: '#8b5cf6',
    alt: 'Network & Systems Architecture',
  },
  'network-systems': {
    src: '/service-icons/data-analytics.png',
    accent: '#8b5cf6',
    alt: 'Network & Systems Architecture',
  },

  // Founder principles
  'client-first': {
    src: '/service-icons/ui-ux.png',
    accent: '#ec4899',
    alt: 'Client-First Approach',
  },
  'transparent': {
    src: '/service-icons/data-analytics.png',
    accent: '#8b5cf6',
    alt: 'Transparent Operations',
  },
  'uk-compliant': {
    src: '/service-icons/ai-automation.png',
    accent: '#4573df',
    alt: 'UK-Compliant Delivery',
  },
};

const FALLBACK: IconMeta = {
  src: '/service-icons/custom-web.png',
  accent: '#2563eb',
  alt: 'Expert Tech Service',
};

export interface ServiceIconProps {
  slug?: string;
  index?: number;
  size?: number;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  slug,
  index = 0,
  size = 58,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const meta = (slug && SERVICE_ICON_MAP[slug]) || FALLBACK;

  const wrapStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${meta.accent}18 0%, ${meta.accent}08 100%)`,
    borderColor: `${meta.accent}33`,
  };

  const idleAnimation = reduce
    ? undefined
    : {
        y: [0, -3.5, 0],
        transition: {
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: (index % 5) * 0.35,
        },
      };

  return (
    <motion.span
      className={`${styles.iconWrap} ${className}`}
      style={wrapStyle}
      aria-hidden="true"
      initial={reduce ? false : { scale: 0.85, opacity: 0 }}
      whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 240, damping: 20, delay: index * 0.04 }}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.07, rotate: [0, -4, 4, -2, 0], transition: { duration: 0.4 } }
      }
    >
      {/* Dynamic ambient color glow */}
      <span className={styles.glow} style={{ background: meta.accent }} aria-hidden="true" />

      {/* Floating 3D icon element */}
      <motion.span className={styles.iconInner} animate={idleAnimation}>
        <Image
          src={meta.src}
          alt={meta.alt}
          width={size}
          height={size}
          unoptimized
          priority={index < 3}
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </motion.span>
    </motion.span>
  );
};

export default ServiceIcon;
