'use client';

import React, { useState } from 'react';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import CtaBanner from '@/components/CtaBanner';
import ReviewModal, { ReviewSubmissionData } from '@/components/ReviewModal';
import { company } from '@/data/company';
import { reviewsContent } from '@/data/content';
import {
  Star,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Upload,
  AlertCircle,
  Building2,
  User,
  ShieldCheck,
} from 'lucide-react';

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(reviewsContent.reviewsList);

  // Inline Review Form state
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Your name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a star rating from 1 to 5.';
    }

    if (!reviewText.trim()) {
      newErrors.review = 'Review text is required.';
    } else if (reviewText.trim().length < 10) {
      newErrors.review = 'Please provide at least 10 characters detailing your experience.';
    }

    if (!consent) {
      newErrors.consent = 'You must consent to publishing your review on this website.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview = {
        id: `review-${Date.now()}`,
        client: name.trim(),
        company: companyName.trim() || 'Verified Client',
        quote: `“${reviewText.trim()}”`,
        rating,
        initials: name
          .trim()
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
      };

      setReviewsList((prev) => [newReview, ...prev]);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleModalReviewSuccess = (newSubmission: ReviewSubmissionData) => {
    const newReview = {
      id: `review-${Date.now()}`,
      client: newSubmission.name,
      company: newSubmission.company,
      quote: `“${newSubmission.review}”`,
      rating: newSubmission.rating,
      initials: newSubmission.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };
    setReviewsList((prev) => [newReview, ...prev]);
  };

  return (
    <div className="flex flex-col bg-white text-[#0b1c3d]">
      {/* Brand Hero Section */}
      <HeroSection
        id="reviews-hero"
        badge={reviewsContent.hero.overline}
        title={reviewsContent.hero.title}
        subtitle={reviewsContent.hero.subtitle}
        primaryCta={{
          text: 'Leave a Review',
          href: '#review-submission',
        }}
        secondaryCta={{
          text: 'Google Reviews',
          href: reviewsContent.googleReviewsLink,
          icon: <ExternalLink className="h-4 w-4" />,
        }}
        background="navy"
        className="bg-gradient-to-b from-[#0b1c3d] via-[#0b1c3d] to-[#1a375c]"
      >
        <div className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md px-5 py-2.5 text-sm text-white/90 border border-white/15 shadow-inner">
          <span className="text-[#ffd166] text-base tracking-wider" aria-hidden="true">★★★★★</span>
          <span className="font-medium text-white">5.0 Star Rating from Verified UK Retainer Clients</span>
        </div>
      </HeroSection>

      {/* Testimonials Grid Section in Signature Soft Slate Cards */}
      <section
        id="client-testimonials"
        className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
      >
        <SectionContainer>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
              Client Feedback
            </span>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-[#0b1c3d] sm:text-4xl">
              Proven Track Record of Excellence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1d1e20]/80 sm:text-lg">
              Read how our managed IT support, custom software development, and proactive systems engineering empower growing businesses.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {reviewsList.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col justify-between rounded-2xl bg-[#ebecef] p-8 shadow-card border border-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2f80ed] text-base font-bold text-white shadow-md">
                        {item.initials}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-[#0b1c3d] leading-tight">
                          {item.company}
                        </h3>
                        <p className="text-xs font-semibold text-[#174076] mt-0.5">
                          {item.client}
                        </p>
                      </div>
                    </div>

                    {/* 5-star rating display */}
                    <div className="flex text-[#f59e0b] shrink-0" aria-label={`${item.rating} out of 5 stars`}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-[#1d1e20]/85 italic">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-4 text-xs font-semibold text-[#174076]">
                  <CheckCircle2 className="h-4 w-4 text-[#2f80ed]" />
                  <span>Verified Google Business Review</span>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Review Submission & Office Map Section in Clean Soft Slate Container */}
      <section
        id="review-submission"
        className="scroll-mt-24 bg-[#ebecef]/50 py-20 sm:py-24 border-t border-black/5"
      >
        <SectionContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Polished White "Leave a Review" Form Card */}
            <div className="lg:col-span-7 rounded-2xl bg-white p-6 sm:p-8 border border-black/5 shadow-xl text-[#0b1c3d]">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
                  Your Experience
                </span>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0b1c3d] sm:text-3xl">
                  {reviewsContent.form.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#1d1e20]/75">
                  {reviewsContent.form.description}
                </p>
              </div>

              {isSuccess ? (
                <div className="rounded-xl bg-green-50/60 p-8 text-center border border-green-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-[#0b1c3d]">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="mt-2 text-sm text-[#1d1e20]/80">
                    Your review has been submitted for verification before publication. We appreciate your partnership with {company.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setCompanyName('');
                      setReviewText('');
                      setRating(5);
                      setPhoto(null);
                      setConsent(false);
                    }}
                    className="mt-6 rounded-xl bg-[#2f80ed] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5899f0]"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4" noValidate>
                  {/* Reviewer Name */}
                  <div>
                    <label
                      htmlFor="inline-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
                      <input
                        id="inline-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full rounded-lg border bg-[#ebecef]/40 pl-10 pr-4 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="inline-company"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
                    >
                      Company Name <span className="text-xs text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
                      <input
                        id="inline-company"
                        name="company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Logistics UK"
                        className="w-full rounded-lg border border-black/10 bg-[#ebecef]/40 pl-10 pr-4 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:border-[#2f80ed] focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                      />
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]">
                      Your Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex items-center gap-2" role="group" aria-label="Interactive rating selector">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setRating(star);
                              if (errors.rating) setErrors((prev) => ({ ...prev, rating: '' }));
                            }}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="rounded p-1 text-2xl transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                            aria-label={`Select ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`h-7 w-7 transition-colors ${
                                isFilled
                                  ? 'fill-[#f59e0b] text-[#f59e0b]'
                                  : 'fill-transparent text-black/20'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-sm font-semibold text-[#174076]">
                        {rating > 0 ? `${rating} of 5 stars` : 'Select rating'}
                      </span>
                    </div>
                    {errors.rating && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Review Text */}
                  <div>
                    <label
                      htmlFor="inline-review"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
                    >
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="inline-review"
                      name="review"
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => {
                        setReviewText(e.target.value);
                        if (errors.review) setErrors((prev) => ({ ...prev, review: '' }));
                      }}
                      placeholder="Share your experience working with Expert Tech..."
                      className={`mt-1.5 w-full rounded-lg border bg-[#ebecef]/40 p-3 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
                        errors.review
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
                      }`}
                    />
                    {errors.review && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.review}
                      </p>
                    )}
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label
                      htmlFor="inline-photo"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
                    >
                      Upload Your Photo <span className="text-xs text-black/40 font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1.5 flex items-center gap-3">
                      <label
                        htmlFor="inline-photo"
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-black/20 bg-[#ebecef]/40 px-4 py-2 text-xs font-medium text-[#0b1c3d] hover:bg-[#ebecef] transition"
                      >
                        <Upload className="h-4 w-4 text-[#2f80ed]" />
                        <span>{photo ? photo.name : 'Choose image file'}</span>
                      </label>
                      <input
                        id="inline-photo"
                        name="photo"
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/*"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPhoto(e.target.files[0]);
                          }
                        }}
                      />
                      <span className="text-xs text-[#1d1e20]/60">Accepted: JPG, PNG, WEBP</span>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                        }}
                        className="mt-1 h-4 w-4 rounded border-black/20 text-[#2f80ed] focus:ring-[#2f80ed]"
                      />
                      <span className="text-xs leading-relaxed text-[#1d1e20]/80">
                        I agree that my review may be displayed on this website and confirm this review is based on my genuine experience.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[11px] leading-normal text-[#1d1e20]/60 pt-1">
                    {reviewsContent.form.disclaimer}
                  </p>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#2f80ed] py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#5899f0] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                    >
                      {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Google Reviews Link & Office Location */}
            <div className="lg:col-span-5 space-y-6">
              {/* Google Reviews CTA Card */}
              <div className="rounded-2xl bg-white p-6 border border-black/5 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1c3d] text-white font-bold text-lg shadow">
                    G
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#0b1c3d]">
                      Verified Google Profile
                    </h3>
                    <p className="text-xs text-[#1d1e20]/70">
                      Read more reviews directly on Google
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href={reviewsContent.googleReviewsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f80ed] px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#5899f0]"
                  >
                    <span>{reviewsContent.googleButtonText}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Office Location & Responsive Google Map Embed */}
              <div className="rounded-2xl bg-white p-6 border border-black/5 shadow-md">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#2f80ed] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#0b1c3d]">
                      Registered Scottish Headquarters
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#1d1e20]/80">
                      {company.address.full}
                    </p>
                  </div>
                </div>

                {/* Contact Quick Info */}
                <div className="mt-4 flex flex-wrap gap-4 border-t border-black/5 pt-4 text-xs text-[#174076]">
                  <a
                    href={company.telLink}
                    className="flex items-center gap-1.5 font-semibold hover:text-[#2f80ed] transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#2f80ed]" />
                    <span>{company.phoneFormatted}</span>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-1.5 font-semibold hover:text-[#2f80ed] transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#2f80ed]" />
                    <span>{company.email}</span>
                  </a>
                </div>

                {/* Google Map Iframe Container */}
                <div className="mt-5 w-full aspect-video rounded-xl overflow-hidden shadow-inner border border-black/10 bg-black/5">
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
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Reusable Bottom CTA Banner */}
      <CtaBanner
        id="cta"
        title="Ready to partner with a trusted UK IT team?"
        subtitle="Schedule a discovery call today to discuss your technical requirements with our senior engineers."
        primaryButtonText="Schedule a Discovery Call"
        primaryButtonHref={company.telLink}
        showPhoneButton={true}
        phoneButtonText={company.phoneFormatted}
      />

      {/* Review Modal Dialog */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleModalReviewSuccess}
      />
    </div>
  );
}
