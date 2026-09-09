'use client';

import React, { useState } from 'react';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import CtaBanner from '@/components/CtaBanner';
import CareersForm from '@/components/CareersForm';
import { company } from '@/data/company';
import { careersContent } from '@/data/content';
import {
  MapPin,
  Clock,
  ArrowRight,
  Laptop,
  GraduationCap,
  HeartHandshake,
  Layers,
} from 'lucide-react';

const perks = [
  {
    icon: Laptop,
    title: 'Flexible & Hybrid Working',
    description:
      'We empower our UK engineers with flexible working patterns, top-tier hardware, and the autonomy to do their best work.',
  },
  {
    icon: GraduationCap,
    title: '£1,500 Learning Budget',
    description:
      'Annual stipend for technical certifications (AWS, Azure, Kubernetes, Cisco), developer conferences, and continuous education.',
  },
  {
    icon: HeartHandshake,
    title: 'UK Enterprise Impact',
    description:
      'Direct client-facing impact architecting critical infrastructure, security protocols, and custom software for high-growth UK businesses.',
  },
  {
    icon: Layers,
    title: 'Modern Technology Stack',
    description:
      'Work with modern tooling: Next.js, React, TypeScript, Cloud Native, Terraform, automated CI/CD, and robust cybersecurity frameworks.',
  },
];

const openRoles = [
  {
    id: 'cloud-devops',
    title: 'Senior Cloud & DevOps Engineer',
    department: 'Infrastructure & Cloud',
    location: 'Remote (UK) / Hybrid Fife',
    type: 'Full-time',
    salary: '£65,000 – £80,000',
    description:
      'Lead multi-cloud AWS and Azure deployments, automate CI/CD pipelines, and design resilient infrastructure for retainer clients.',
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack TypeScript Engineer',
    department: 'Software & App Engineering',
    location: 'Remote (UK) / Scotland',
    type: 'Full-time',
    salary: '£50,000 – £65,000',
    description:
      'Build performant web applications, APIs, and client portals using Next.js, Node.js, and modern relational/NoSQL databases.',
  },
  {
    id: 'it-support-specialist',
    title: 'Tier 2/3 IT Support & Systems Specialist',
    department: 'Managed IT & Helpdesk',
    location: 'Cowdenbeath / Fife, Scotland',
    type: 'Full-time',
    salary: '£32,000 – £42,000',
    description:
      'Deliver proactive endpoint management, network diagnostics, Microsoft 365 administration, and rapid SLA escalation resolution.',
  },
];

export default function CareersClient() {
  const [selectedRole, setSelectedRole] = useState('');

  const handleApplyRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col bg-white text-[#0b1c3d]">
      {/* Brand Hero Section */}
      <HeroSection
        id="careers-hero"
        badge={careersContent.hero.overline}
        title={careersContent.hero.title}
        subtitle={careersContent.hero.subtitle}
        primaryCta={{
          text: 'View Open Positions',
          href: '#open-positions',
        }}
        secondaryCta={{
          text: 'Culture & Perks',
          href: '#culture',
        }}
        background="navy"
      />

      {/* Engineering Team Culture & Perks Section */}
      <section id="culture" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              Engineering Culture & Perks
            </span>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              Why Engineers Thrive at {company.name}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1d1e20]/80">
              We cultivate an environment centered on technical excellence, transparent communication, work-life balance, and continuous developer growth.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#ebecef] p-8 shadow-card border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-[#0b1c3d]">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1d1e20]/75">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Open Positions & Application Section in Harmonious Soft Slate Container */}
      <section
        id="open-positions"
        className="scroll-mt-24 bg-[#ebecef]/50 py-20 sm:py-28 border-t border-black/5"
      >
        <SectionContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Clean White Job Cards */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Current Opportunities
              </span>
              <h2 className="mt-2 font-heading text-3xl font-medium text-[#0b1c3d]">
                Open Engineering Roles
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#1d1e20]/80">
                Join our UK team of passionate developers, system administrators, and cloud architects. Select a role to populate your application below.
              </p>

              <div className="mt-8 space-y-6">
                {openRoles.map((role) => (
                  <div
                    key={role.id}
                    className="group rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-black/5 transition-all duration-200 hover:border-[#2f80ed] hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-lg bg-[#ebecef] px-3 py-1 text-xs font-semibold text-[#174076]">
                        {role.department}
                      </span>
                      <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                        {role.salary}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold text-[#0b1c3d] group-hover:text-[#174076] transition-colors">
                      {role.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#1d1e20]/75">
                      {role.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#1d1e20]/65">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#2f80ed]" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#2f80ed]" />
                        {role.type}
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/5">
                      <button
                        type="button"
                        onClick={() => handleApplyRole(role.title)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#2f80ed] px-5 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#5899f0] focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                      >
                        <span>Apply for this Role</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Application Form Component */}
            <div className="lg:col-span-5">
              <CareersForm initialRole={selectedRole} />
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Reusable Bottom CTA Banner */}
      <CtaBanner
        id="cta"
        title="Don't see the right role for your skillset?"
        subtitle="We are always looking for ambitious systems engineers, cloud architects, and developers across the UK. Get in touch with our recruitment desk."
        primaryButtonText="Contact Recruitment"
        primaryButtonHref={`mailto:${company.careersEmail}`}
        showPhoneButton={true}
        phoneButtonText={company.phoneFormatted}
      />
    </div>
  );
}
