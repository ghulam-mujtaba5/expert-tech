import React from 'react';
import type { Metadata } from 'next';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import ContactInfoCards from '@/components/ContactInfoCards';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import { company } from '@/data/company';
import { contactContent } from '@/data/content';
import { generateBreadcrumbSchema, generateContactPageSchema } from '@/data/schema';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & 24/7 Technical Escalation Desk',
  description:
    'Connect directly with our UK-based systems engineers. Proactive IT support, cloud consultations, and emergency dispatch with a guaranteed 15-minute SLA.',
  alternates: {
    canonical: 'https://www.experttech.uk.com/contact',
  },
  openGraph: {
    title: 'Contact & 24/7 Technical Escalation Desk | Expert Tech',
    description:
      'Connect directly with our UK-based systems engineers with guaranteed 15-minute turnaround.',
    url: 'https://www.experttech.uk.com/contact',
    siteName: company.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & 24/7 Technical Escalation Desk | Expert Tech',
    description:
      'Connect directly with our UK-based systems engineers with guaranteed 15-minute turnaround.',
  },
};

export default function ContactPage() {
  const { hero, form } = contactContent;

  const breadcrumbs = [
    { label: 'Contact', href: '/contact' },
  ];

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <div className="flex flex-col bg-white text-[#0b1c3d]">
      {/* Visual Breadcrumb Navigation */}
      <div className="bg-[#0b1c3d] border-b border-white/10">
        <SectionContainer>
          <Breadcrumb items={breadcrumbs} variant="dark" />
        </SectionContainer>
      </div>

      {/* JSON-LD Schemas */}
      <SchemaMarkup schema={breadcrumbsSchema} />
      <SchemaMarkup schema={generateContactPageSchema()} />

      {/* Brand Hero Section */}
      <HeroSection
        id="hero"
        badge={hero.overline}
        title={
          <>
            Secure systems with{' '}
            <span className="font-semibold text-[#38bdf8]">
              zero-friction onboarding.
            </span>
          </>
        }
        subtitle={hero.subtitle}
        primaryCta={{
          text: 'Request a Quote',
          href: '#contact-form',
        }}
        secondaryCta={{
          text: 'View Services',
          href: '/services',
        }}
        stats={[
          { value: '15 Min', label: 'Average response' },
          { value: '99.9%', label: 'Uptime assurance' },
        ]}
        background="navy"
      />

      {/* Office Information Cards Section in Soft Slate */}
      <section
        id="office-info"
        className="scroll-mt-24 bg-[#ebecef]/60 py-16 sm:py-20 border-y border-black/5 text-[#0b1c3d]"
      >
        <SectionContainer>
          <ContactInfoCards />
        </SectionContainer>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <SectionContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Information Copy */}
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                {form.overline}
              </span>

              <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
                {form.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80">
                {form.subtitle}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-[#1d1e20]/85">
                    <strong>Direct Engineer Access:</strong> Speak directly with senior UK technical architects, not salespeople or tiered dispatchers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-[#1d1e20]/85">
                    <strong>Rapid 15-Minute Turnaround:</strong> Inquiries during UK business hours receive guaranteed technical review within 15 minutes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-[#1d1e20]/85">
                    <strong>Transparent Pricing:</strong> No unexpected license markups or hidden fees. Predictable monthly retainers and milestone-based project scopes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form Component */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Interactive Google Map Section in Soft Slate */}
      <section id="map" className="scroll-mt-24 bg-[#ebecef]/50 py-16 sm:py-20 border-t border-black/5 text-[#0b1c3d]">
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              Visit Our Registered Office
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-[#0b1c3d] sm:text-3xl">
              Cowdenbeath, Scotland Headquarters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#1d1e20]/75">
              {company.address.full}
            </p>
          </div>

          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-black/10 bg-black/5">
            <iframe
              src="https://maps.google.com/maps?q=Cowdenbeath%2C+Scotland%2C+KY4+9QE&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Expert Tech Registered Office in Cowdenbeath, Scotland"
            />
          </div>
        </SectionContainer>
      </section>

      {/* Reusable Bottom CTA Banner */}
      <CtaBanner
        id="cta"
        title="Need urgent emergency IT support?"
        subtitle="Call our rapid escalation desk directly to speak with an on-duty UK systems engineer immediately."
        primaryButtonText="Call Emergency Desk"
        primaryButtonHref={company.telLink}
        showPhoneButton={false}
      />
    </div>
  );
}
