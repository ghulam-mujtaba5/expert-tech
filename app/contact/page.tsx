import React from 'react';
import Link from 'next/link';
import SectionContainer from '@/components/SectionContainer';
import ContactForm from '@/components/ContactForm';
import { company } from '@/data/company';
import { contactContent } from '@/data/content';
import {
  ShieldCheck,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Contact | Expert Tech',
  description:
    'Connect directly with our UK-based systems engineers. We design, deploy, and maintain robust IT infrastructure with guaranteed response times.',
};

export default function ContactPage() {
  const { hero, form } = contactContent;

  return (
    <div className="flex flex-col bg-[#0b1c3d] text-white">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#0b1c3d] py-20 sm:py-28 lg:py-32"
      >
        <SectionContainer>
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
              {hero.overline}
            </span>

            <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              Secure systems with{' '}
              <span className="font-semibold text-[#2f80ed]">
                zero-friction onboarding.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
              {hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact-form"
                className="flex items-center gap-2 rounded-lg bg-[#2f80ed] px-6 py-3.5 text-base font-medium text-white shadow-lg transition hover:bg-[#5899f0] focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/services"
                className="rounded-lg bg-[#ebecef] px-6 py-3.5 text-base font-medium text-[#0b1c3d] shadow transition hover:bg-[#bcbcbf] focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                View Services
              </Link>
            </div>

            {/* Prominent SLA & Uptime Metrics Row */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-12 border-t border-white/15 pt-12">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  15 Min
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#a1c5f6] sm:text-sm">
                  Average response
                </div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  99.9%
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#a1c5f6] sm:text-sm">
                  Uptime assurance
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Office Information Cards Section */}
      <section id="office-info" className="bg-[#1a375c] py-16 text-white border-y border-white/10">
        <SectionContainer>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address */}
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-white">
                Registered Office
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                {company.address.full}
              </p>
              <span className="mt-2 inline-block text-[11px] font-semibold text-[#a1c5f6]">
                Cowdenbeath, Scotland
              </span>
            </div>

            {/* Phone */}
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-white">
                Direct Telephone
              </h3>
              <a
                href={company.telLink}
                className="mt-2 block text-sm font-bold text-[#2f80ed] hover:underline"
              >
                {company.phoneFormatted}
              </a>
              <p className="mt-1 text-xs text-white/70">
                Direct desk to UK engineers
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-white">
                Corporate Inquiries
              </h3>
              <a
                href={`mailto:${company.email}`}
                className="mt-2 block text-sm font-bold text-[#2f80ed] hover:underline"
              >
                {company.email}
              </a>
              <p className="mt-1 text-xs text-white/70">
                15-minute response SLA
              </p>
            </div>

            {/* Hours */}
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9d8ee] text-[#174076]">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-white">
                Operating Hours
              </h3>
              <p className="mt-2 text-xs text-white/80">
                Mon - Fri: 9:00 - 18:00
              </p>
              <p className="mt-1 text-[11px] text-[#a1c5f6]">
                24/7 Monitoring for Retainer Clients
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="bg-[#0b1c3d] py-20 sm:py-28">
        <SectionContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Information Copy */}
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
                {form.overline}
              </span>

              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {form.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-white/80">
                {form.subtitle}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/85">
                    <strong>Direct Engineer Access:</strong> Speak directly with senior UK technical architects, not salespeople or tiered dispatchers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/85">
                    <strong>Rapid 15-Minute Turnaround:</strong> Inquiries during UK business hours receive guaranteed technical review within 15 minutes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/85">
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

      {/* Interactive Google Map Section */}
      <section id="map" className="bg-[#1a375c] py-16 text-white border-t border-white/10">
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
              Visit Our Registered Office
            </span>
            <h2 className="mt-1 font-heading text-2xl font-bold text-white sm:text-3xl">
              Cowdenbeath, Scotland Headquarters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/75">
              {company.address.full}
            </p>
          </div>

          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/20">
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
    </div>
  );
}
