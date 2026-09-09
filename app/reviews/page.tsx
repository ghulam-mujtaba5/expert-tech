import React from 'react';
import type { Metadata } from 'next';
import SectionContainer from '@/components/SectionContainer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import ReviewsClient from '@/components/ReviewsClient';
import { company } from '@/data/company';
import { reviewsContent } from '@/data/content';
import { generateBreadcrumbSchema, generateReviewsSchema } from '@/data/schema';

export const metadata: Metadata = {
  title: 'Client Reviews & Verified Google Testimonials',
  description:
    'Read authentic 5.0-star reviews from verified UK retainer clients for Expert Tech. Proactive managed IT support, cloud solutions, and software development.',
  alternates: {
    canonical: 'https://www.experttech.uk.com/reviews',
  },
  openGraph: {
    title: 'Client Reviews & Verified Google Testimonials | Expert Tech',
    description:
      '5.0-star rating from verified UK retainer clients. Discover how Expert Tech empowers British businesses.',
    url: 'https://www.experttech.uk.com/reviews',
    siteName: company.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Reviews & Verified Google Testimonials | Expert Tech',
    description:
      '5.0-star rating from verified UK retainer clients. Discover how Expert Tech empowers British businesses.',
  },
};

export default function ReviewsPage() {
  const breadcrumbs = [
    { label: 'Reviews', href: '/reviews' },
  ];

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews' },
  ]);

  const reviewsSchema = generateReviewsSchema(reviewsContent.reviewsList);

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
      <SchemaMarkup schema={reviewsSchema} />

      {/* Interactive Reviews Experience */}
      <ReviewsClient />
    </div>
  );
}
