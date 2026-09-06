import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code,
  Phone,
  Smartphone,
  Cloud,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';
import ServiceCard from '@/components/ServiceCard';
import { company } from '@/data/company';
import { servicesContent } from '@/data/content';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Comprehensive IT solutions for UK businesses: Managed IT support, cloud solutions, bespoke software development, cybersecurity, and systems architecture.',
};

const detailedServices = [
  {
    id: 'web-dev',
    title: 'Web Design & Development',
    description:
      'Crafting bespoke web applications and platforms that drive business growth and user engagement.',
    icon: 'code' as const,
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
    icon: 'phone' as const,
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
    icon: 'smartphone' as const,
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
    icon: 'cloud' as const,
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
    icon: 'shield' as const,
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
    icon: 'users' as const,
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

  return (
    <div className="flex flex-col">
      {/* Services Hero Section */}
      <section
        id="services-hero"
        className="relative overflow-hidden bg-[#0b1c3d] py-20 text-white sm:py-28 lg:py-32 border-b border-white/10"
      >
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
              {hero.overline}
            </span>

            <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
              {hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#5899f0] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={company.telLink || "tel:+447565322806"}
                className="inline-flex items-center gap-2 rounded-lg bg-[#ebecef] px-6 py-3.5 text-base font-medium text-black shadow transition-all hover:bg-[#bcbcbf] focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <Phone className="h-4 w-4 text-[#174076]" />
                <span>{company.phone}</span>
              </a>
            </div>
          </div>
        </SectionContainer>
      </section>

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
            {detailedServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={`service-${service.id}`}
                title={service.title}
                description={service.description}
                icon={service.icon}
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

      {/* Quote / Discovery Call CTA Banner */}
      <section
        id="cta"
        className="scroll-mt-24 bg-[#2f80ed] py-16 text-white sm:py-20"
      >
        <SectionContainer>
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl font-medium text-white sm:text-3xl">
                {ctaBanner.title}
              </h2>
              <p className="mt-3 text-base text-white/90">
                {ctaBanner.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                href={ctaBanner.href}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b1c3d] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#174076] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>{ctaBanner.buttonText}</span>
                <ArrowRight className="h-4 w-4 text-[#2f80ed]" />
              </Link>
              <a
                href={company.telLink || "tel:+447565322806"}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-5 py-3.5 text-base font-medium text-white transition-all hover:bg-white/20 border border-white/20"
              >
                <Phone className="h-4 w-4" />
                <span>{company.phone}</span>
              </a>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
