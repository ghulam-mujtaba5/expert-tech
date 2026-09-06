'use client';

import React from 'react';
import LottiePlayer from './LottiePlayer';

export type ServiceIllusType =
  | 'support'
  | 'cloud'
  | 'software'
  | 'web'
  | 'cybersecurity'
  | 'network'
  | 'ai'
  | 'mobile'
  | 'automation'
  | 'data'
  | 'consulting';

export const LOTTIE_SERVICE_MAP: Record<string, string> = {
  // Direct matching keys
  cybersecurity: '/lottie/security-it.json',
  'cybersecurity-&-compliance': '/lottie/security-it.json',
  security: '/lottie/security-it.json',
  shield: '/lottie/security-it.json',

  'web-dev': '/lottie/web-coding.json',
  web: '/lottie/web-coding.json',
  'web-design': '/lottie/web-coding.json',
  'web-design-&-development': '/lottie/web-coding.json',
  'custom-web': '/lottie/web-coding.json',

  cloud: '/lottie/cloud-devops.json',
  'cloud-solutions': '/lottie/cloud-devops.json',
  devops: '/lottie/cloud-devops.json',

  software: '/lottie/mobile-app.json',
  'software-dev': '/lottie/mobile-app.json',
  'software-&-app-development': '/lottie/mobile-app.json',
  mobile: '/lottie/mobile-app.json',
  'ai-saas-mvp': '/lottie/mobile-app.json',

  'network-systems': '/lottie/automation-gears.json',
  network: '/lottie/automation-gears.json',
  automation: '/lottie/automation-gears.json',

  support: '/lottie/analytics-data.json',
  'it-support': '/lottie/analytics-data.json',
  'it-support-&-helpdesk': '/lottie/analytics-data.json',
  consulting: '/lottie/analytics-data.json',

  ai: '/lottie/ai-brain.json',
  data: '/lottie/analytics-data.json',
};

interface ServiceIllustrationProps {
  type?: string;
  src?: string;
  size?: number;
  className?: string;
}

export const ServiceIllustration: React.FC<ServiceIllustrationProps> = ({
  type,
  src,
  size = 100,
  className,
}) => {
  const resolvedSrc =
    src ||
    (type && LOTTIE_SERVICE_MAP[type.toLowerCase().trim()]) ||
    '/lottie/security-it.json';

  return (
    <LottiePlayer
      src={resolvedSrc}
      loop
      autoplay
      pauseWhenHidden
      speed={0.7}
      style={{ width: size, height: size }}
      className={className}
    />
  );
};

export default ServiceIllustration;
