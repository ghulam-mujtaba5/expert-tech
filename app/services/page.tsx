import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import CtaBanner from '@/components/CtaBanner';
import FaqAccordion from '@/components/FaqAccordion';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import { company } from '@/data/company';
import { servicesContent } from '@/data/content';
import {
  generateBreadcrumbSchema,
  generateServicesCatalogSchema,
} from '@/data/schema';

export const metadata: Metadata = {
  title: 'Comprehensive Managed IT & Custom Software Services',
  description:
    'Comprehensive IT solutions for UK businesses: Managed IT support, cloud solutions, bespoke software development, cybersecurity, and systems architecture with 15-minute response SLA.',
  alternates: {
    canonical: 'https://www.experttech.uk.com/services',
  },
  openGraph: {
    title: 'Comprehensive Managed IT & Custom Software Services | Expert Tech',
    description:
      'Proactive managed IT, cloud migrations, bespoke software, and cybersecurity designed for UK enterprise uptime.',
    url: 'https://www.experttech.uk.com/services',
    siteName: company.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprehensive Managed IT & Custom Software Services | Expert Tech',
    description:
      'Proactive managed IT, cloud migrations, bespoke software, and cybersecurity designed for UK enterprise uptime.',
  },
};

const detailedServices = [
  {
    id: 'web-dev',
    title: 'Web Design & Development',
    description:
      'Crafting bespoke web applications and platforms that drive business growth and user engagement.',
    icon: 'custom-web' as const,
    lottieSrc: '/lottie/web-coding.json',
    badge: 'Custom Engineering',
    features: [
      'Responsive Next.js & modern frontend apps',
      'Secure REST & GraphQL API integrations',
      'High-performance SEO & speed optimization',
      'WCAG 2.1 accessible user interfaces',
    ],
  },
  {
    id: 'it-support',
    title: 'IT Support & Helpdesk',
    description:
      'Proactive monitoring and rapid response to ensure your systems run smoothly, minimizing downtime.',
    icon: 'consulting' as const,
    lottieSrc: '/lottie/analytics-data.json',
    badge: 'Rapid Response',
    features: [
      '15-minute guaranteed emergency response SLA',
      '24/7 proactive endpoint and server monitoring',
      'Remote diagnostics & on-site Scottish support',
      'Proactive patch management and maintenance',
    ],
  },
  {
    id: 'software-dev',
    title: 'Software & App Development',
    description:
      'Custom software solutions and mobile apps tailored to optimize your unique operational workflows.',
    icon: 'ai-saas-mvp' as const,
    lottieSrc: '/lottie/mobile-app.json',
    badge: 'Digital Transformation',
    features: [
      'Bespoke CRM & internal automation tools',
      'Cross-platform iOS and Android mobile apps',
      'Enterprise database architecture & reporting',
      'Legacy software migration and modernization',
    ],
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description:
      'Secure and scalable cloud migrations, management, and optimization for modern business agility.',
    icon: 'cloud-devops' as const,
    lottieSrc: '/lottie/cloud-devops.json',
    badge: 'Cloud Agility',
    features: [
      'AWS, Microsoft Azure & private cloud hosting',
      'Zero-downtime data migration & synchronization',
      'Automated disaster recovery & hourly backups',
      'Cloud cost optimization & governance audit',
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Compliance',
    description:
      'Multi-layered perimeter defense, vulnerability audits, and UK regulatory compliance to protect corporate data.',
    icon: 'ai-automation' as const,
    lottieSrc: '/lottie/security-it.json',
    badge: 'UK Compliance',
    features: [
      'Cyber Essentials & UK GDPR alignment',
      'Next-generation firewalls & endpoint protection',
      'Regular penetration testing & vulnerability scans',
      'Employee cybersecurity training & phishing tests',
    ],
  },
  {
    id: 'network-systems',
    title: 'Network & Systems Architecture',
    description:
      'Robust corporate network infrastructure and unified communications designed for enterprise uptime.',
    icon: 'data-analytics' as const,
    lottieSrc: '/lottie/automation-gears.json',
    badge: 'Enterprise Infrastructure',
    features: [
      'Enterprise Wi-Fi & structured office cabling',
      'VoIP telephony & unified communications',
      'Secure multi-office VPN & remote access',
      'Hardware procurement & lifecycle management',
    ],
  },
];

const consultationSteps = [
  {
    step: '01',
    title: 'Discovery & Infrastructure Audit',
    description:
      'We conduct an in-depth audit of your existing hardware, cloud setups, workflows, and pain points with zero disruption.',
  },
  {
    step: '02',
    title: 'Architecture & Bespoke Strategy',
    description:
      'Our senior engineers formulate a clear technical roadmap, milestone plan, and transparent fixed pricing model.',
  },
  {
    step: '03',
    title: 'Seamless Deployment & Integration',
    description:
      'We roll out solutions with minimal friction, rigorous testing, and hands-on staff onboarding.',
  },
  {
    step: '04',
    title: '24/7 Proactive Oversight & SLA',
    description:
      'Continuous health monitoring, SLA guarantees, and regular strategy reviews to keep your business ahead.',
  },
];

export default function ServicesPage() {
  const { hero, ctaBanner } = servicesContent;

  const breadcrumbs = [
    { label: 'Services', href: '/services' },
  ];

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <div className="flex flex-col">
      {/* Visual Breadcrumb Navigation */}
      <div className="bg-[#0b1c3d] border-b border-white/10">
        <SectionContainer>
          <Breadcrumb items={breadcrumbs} variant="dark" />
        </SectionContainer>
      </div>

      {/* JSON-LD Schemas */}
      <SchemaMarkup schema={breadcrumbsSchema} />
      <SchemaMarkup schema={generateServicesCatalogSchema()} />

      {/* Services Hero Section using unified HeroSection */}
      <HeroSection
        id="services-hero"
        badge={hero.overline}
        title={hero.title}
        subtitle={hero.subtitle}
        primaryCta={{
          text: 'Request a Quote',
          href: '/contact',
          icon: <ArrowRight className="h-4 w-4" />,
        }}
        secondaryCta={{
          text: company.phoneFormatted,
          href: company.telLink,
          icon: <Phone className="h-4 w-4" />,
        }}
        background="navy"
      />

      {/* Comprehensive IT Solutions 6-Card Grid */}
      <section id="grid" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32">
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              {hero.overline}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              {hero.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80 sm:text-lg">
              {hero.subtitle}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {detailedServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                id={`service-${service.id}`}
                title={service.title}
                description={service.description}
                icon={service.icon}
                lottieSrc={service.lottieSrc}
                index={idx}
                badge={service.badge}
                features={service.features}
                linkHref="/contact"
                linkLabel="Discuss this service"
              />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 4-Step Consultation Process Flow */}
      <section
        id="process"
        className="scroll-mt-24 bg-[#ebecef]/50 py-20 border-y border-black/5 sm:py-24"
      >
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              Our Methodology
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              How We Deliver Technical Excellence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/75 sm:text-lg">
              A transparent, structured approach from initial systems audit to ongoing managed operations.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {consultationSteps.map((stepItem) => (
              <div
                key={stepItem.step}
                className="relative flex flex-col rounded-2xl bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-black/5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-3xl font-bold text-[#2f80ed]/40">
                    {stepItem.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#2f80ed]" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-medium text-[#0b1c3d]">
                  {stepItem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1d1e20]/75">
                  {stepItem.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <FaqAccordion />

      {/* Quote / Discovery Call CTA Banner */}
      <CtaBanner
        id="cta"
        title={ctaBanner.title}
        subtitle={ctaBanner.subtitle}
        primaryButtonText={ctaBanner.buttonText}
        primaryButtonHref={ctaBanner.href}
        showPhoneButton={true}
        phoneButtonText={company.phoneFormatted}
      />
    </div>
  );
}
