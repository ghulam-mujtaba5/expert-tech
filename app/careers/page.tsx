import React from 'react';
import type { Metadata } from 'next';
import SectionContainer from '@/components/SectionContainer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import CareersClient from '@/components/CareersClient';
import { company } from '@/data/company';
import { generateBreadcrumbSchema, generateJobPostingSchemas } from '@/data/schema';

export const metadata: Metadata = {
  title: 'Engineering Careers & Opportunities in the UK',
  description:
    'Explore engineering opportunities at Expert Tech. We hire talented Cloud, DevOps, Full-Stack, and Systems Engineers across Scotland and the UK.',
  alternates: {
    canonical: 'https://experttech.co.uk/careers',
  },
  openGraph: {
    title: 'Engineering Careers & Opportunities in the UK | Expert Tech',
    description:
      'Join our collaborative UK engineering team delivering proactive technology solutions to growing organizations.',
    url: 'https://experttech.co.uk/careers',
    siteName: company.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Careers & Opportunities in the UK | Expert Tech',
    description:
      'Join our collaborative UK engineering team delivering proactive technology solutions to growing organizations.',
  },
};

export default function CareersPage() {
  const breadcrumbs = [
    { label: 'Careers', href: '/careers' },
  ];

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
  ]);

  const jobSchemas = generateJobPostingSchemas();

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
      {jobSchemas.map((schema, index) => (
        <SchemaMarkup key={index} schema={schema} />
      ))}

      {/* Interactive Careers Experience */}
      <CareersClient />
    </div>
  );
}
