import React from 'react';
import SectionContainer from '@/components/SectionContainer';
import { company } from '@/data/company';
import { refundPolicyContent } from '@/data/content';
import { ShieldCheck, FileText, CheckCircle2, Clock, Mail, Scale } from 'lucide-react';

export const metadata = {
  title: 'Refund & Cancellation Policy | Expert Tech',
  description:
    'Comprehensive statutory rights, cancellation terms, and refund policy for Expert Tech services under Scottish jurisdiction and UK consumer law.',
};

export default function RefundPolicyPage() {
  const { hero } = refundPolicyContent;

  return (
    <div className="flex flex-col bg-white text-[#0b1c3d]">
      {/* Policy Hero */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#0b1c3d] py-16 text-white sm:py-24"
      >
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
              {hero.overline}
            </span>

            <h1 className="mt-6 font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-[#2f80ed]" />
                Governing Law: Scotland, UK
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#2f80ed]" />
                Standard Resolution SLA: 10 working days
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-[#2f80ed]" />
                Official Inquiries: {company.email}
              </span>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* 7 Structured Legal Sections */}
      <section id="policy-content" className="py-16 sm:py-24">
        <SectionContainer size="narrow">
          <div className="space-y-12">
            {/* Section 1: Overview & Scope */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Section 1
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                1. Overview & Scope of Agreement
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  This Refund and Cancellation Policy governs all technology solutions, managed IT support retainers, cloud infrastructure services, and custom software development agreements provided by <strong>{company.name}</strong> (registered in Scotland).
                </p>
                <p>
                  Our commitment is to deliver transparent, reliable, and professional engineering services. All engagements are entered into with clear service definitions, agreed deliverables, and full alignment with statutory UK commerce regulations.
                </p>
              </div>
            </div>

            {/* Section 2: Statutory Rights & Cooling-Off Periods */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Statutory Rights
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                2. UK Consumer Protections & Cooling-Off Periods
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  <strong>{company.name}</strong> operates in full compliance with the <strong>Consumer Rights Act 2015</strong> and the <strong>Consumer Contracts Regulations 2013</strong>.
                </p>
                <p>
                  For qualifying distance or off-premises consumer contracts, you are entitled to a statutory <strong>14-day cooling-off period</strong> (14 calendar days) commencing from the date of contract formation. During this 14-day window, you have the right to cancel your agreement without penalty.
                </p>
                <p>
                  If you expressly request that service delivery commence immediately during this 14-day cooling-off period, you acknowledge that you remain liable for the pro-rata cost of services performed up to the time notice of cancellation is served.
                </p>
              </div>
            </div>

            {/* Section 3: Monthly Contracts & Ongoing Retainers */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Ongoing Services
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                3. Monthly Contracts & Managed IT Retainer Cancellation
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  Monthly contracts for ongoing services can be cancelled with <strong>30 days&#39; written notice</strong>, as per your service agreement. Cancellations take effect at the conclusion of the subsequent billing cycle following the 30-day notice window.
                </p>
                <p>
                  During the notice period, {company.name} will continue to provide active systems monitoring, helpdesk response, and offboarding support to guarantee seamless technical transition without operational downtime.
                </p>
              </div>
            </div>

            {/* Section 4: Custom Software & Bespoke Solutions */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Bespoke Engineering
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                4. Custom Software Development & Bespoke Projects
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  Certain items, particularly <strong>custom software</strong> development or <strong>bespoke</strong> infrastructure solutions, may become <strong>non-refundable</strong> once significant work has been performed or intellectual property transferred. This ensures fair compensation for our engineering team&#39;s dedicated efforts.
                </p>
                <p>
                  Project deposits are typically <strong>non-refundable</strong> once work commences, covering initial planning, technical architecture, and resource allocation. Specific milestone terms for each engagement are detailed in your individual Statement of Work (SOW), ensuring full transparency and shared accountability.
                </p>
                <p>
                  In the event of project termination before completion, {company.name} will invoice only for milestones satisfactorily completed, and any unearned milestone prepayments will be refunded in accordance with Section 6.
                </p>
              </div>
            </div>

            {/* Section 5: Third-Party Licenses & Hardware */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Pass-Through Costs
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                5. Third-Party Licenses, Cloud Resources & Hardware
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  Any third-party software licenses (e.g. Microsoft 365, Google Workspace, specialized security software), cloud hosting compute resources (AWS, Microsoft Azure), or hardware procured specifically for your project are non-refundable once purchased, as these costs are committed directly to third-party vendors on your behalf.
                </p>
                <p>
                  Where transferable, ownership and administrative control of procured licenses and assets will be fully reassigned to your organization upon project settlement.
                </p>
              </div>
            </div>

            {/* Section 6: Refund Request Procedure & Timeline */}
            <div className="border-b border-black/10 pb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Our Commitment
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                6. Non-Refundable Items & Request Procedure
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  To request a refund or cancellation, please submit a written request to <a href={`mailto:${company.email}`} className="font-semibold text-[#2f80ed] hover:underline">{company.email}</a>, clearly stating your service details, invoice number, and reason for cancellation.
                </p>
                <p>
                  All requests will be processed within <strong>10 working days</strong>, and any eligible refunds will be issued to the original payment method. We aim for a fair and timely resolution for all clients.
                </p>
                <p>
                  Upon approval, funds are returned directly to your originating bank account or corporate credit card. Your payment provider may require an additional 3 to 5 business days to post the credit to your statement.
                </p>
              </div>
            </div>

            {/* Section 7: Dispute Resolution & Jurisdiction */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                Governing Law
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                7. Dispute Resolution & Scottish Jurisdiction
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#1d1e20]/80">
                <p>
                  This policy, all client service contracts, and any disputes arising out of or in connection with them are governed exclusively by and construed in accordance with the laws of <strong>Scotland</strong>.
                </p>
                <p>
                  Both parties agree to submit to the exclusive jurisdiction of the Scottish courts in Dunfermline or Edinburgh, without prejudice to statutory consumer rights protected under broader United Kingdom legislation.
                </p>
                <p className="pt-4 text-xs text-[#1d1e20]/60">
                  {company.copyright} Registered office: {company.address.full}.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
