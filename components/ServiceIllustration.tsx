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
  support: '/lottie/security-it.json',
  'it-support': '/lottie/security-it.json',
  'it-support-&-helpdesk': '/lottie/security-it.json',
  cloud: '/lottie/cloud-devops.json',
  'cloud-solutions': '/lottie/cloud-devops.json',
  software: '/lottie/web-coding.json',
  'software-dev': '/lottie/web-coding.json',
  'software-&-app-development': '/lottie/web-coding.json',
  'web-dev': '/lottie/14_uiux_web_design.json',
  web: '/lottie/web-coding.json',
  cybersecurity: '/lottie/06_cybersecurity_trust.json',
  shield: '/lottie/06_cybersecurity_trust.json',
  'network-systems': '/lottie/automation-gears.json',
  network: '/lottie/automation-gears.json',
  ai: '/lottie/ai-brain.json',
  mobile: '/lottie/mobile-app.json',
  automation: '/lottie/automation-gears.json',
  data: '/lottie/analytics-data.json',
  consulting: '/lottie/security-it.json',
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
