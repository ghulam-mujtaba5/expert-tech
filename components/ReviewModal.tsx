'use client';

import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle2, Upload, AlertCircle, Building2, User } from 'lucide-react';
import { company } from '@/data/company';

export interface ReviewSubmissionData {
  name: string;
  company: string;
  rating: number;
  review: string;
  photoFileName?: string;
  consent: boolean;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (review: ReviewSubmissionData) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: ReviewModalProps) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

    if (!review.trim()) {
      newErrors.review = 'Review text is required.';
    } else if (review.trim().length < 10) {
      newErrors.review = 'Please provide at least 10 characters detailing your experience.';
    }

    if (!consent) {
      newErrors.consent = 'You must consent to publishing your review on this website.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const submissionData: ReviewSubmissionData = {
        name: name.trim(),
        company: companyName.trim() || 'Client',
        rating,
        review: review.trim(),
        photoFileName: photo?.name,
        consent,
      };

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(submissionData);
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setName('');
    setCompanyName('');
    setRating(0);
    setReview('');
    setPhoto(null);
    setConsent(false);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b1c3d] p-6 text-white shadow-2xl border border-white/10 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close review dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-white">
              Thank You for Your Review!
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Your feedback has been submitted for verification before publication. We appreciate you taking the time to share your experience with {company.name}.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full rounded-xl bg-[#2f80ed] py-3.5 text-sm font-semibold text-white transition hover:bg-[#5899f0] shadow-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a1c5f6]">
                Client Feedback
              </span>
              <h2
                id="review-modal-title"
                className="mt-1 font-heading text-2xl font-medium text-white sm:text-3xl"
              >
                Leave a Review
              </h2>
              <p className="mt-2 text-sm text-white/75">
                Share your experience with our service. Your feedback helps us improve and helps other clients understand the quality of our work.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Reviewer Name */}
              <div>
                <label
                  htmlFor="reviewer-name"
                  className="block text-xs font-medium uppercase tracking-wider text-white/80"
                >
                  Your Name <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                  <input
                    id="reviewer-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full rounded-lg border bg-white/5 pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder-white/40 transition focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/15 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="reviewer-company"
                  className="block text-xs font-medium uppercase tracking-wider text-white/80"
                >
                  Company Name <span className="text-xs text-white/40">(Optional)</span>
                </label>
                <div className="relative mt-1.5">
                  <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                  <input
                    id="reviewer-company"
                    name="company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full rounded-lg border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder-white/40 transition focus:border-[#2f80ed] focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-white/80">
                  Your Rating <span className="text-red-400">*</span>
                </label>
                <div className="mt-2 flex items-center gap-2" role="group" aria-label="Rating selector">
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
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            isFilled
                              ? 'fill-[#ffd166] text-[#ffd166]'
                              : 'fill-transparent text-white/30'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm font-medium text-white/70">
                    {rating > 0 ? `${rating} of 5 stars` : 'Select rating'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.rating}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="reviewer-text"
                  className="block text-xs font-medium uppercase tracking-wider text-white/80"
                >
                  Your Review <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="reviewer-text"
                  name="review"
                  required
                  rows={4}
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                    if (errors.review) setErrors((prev) => ({ ...prev, review: '' }));
                  }}
                  placeholder="Write a short review about your experience with Expert Tech"
                  className={`mt-1.5 w-full rounded-lg border bg-white/5 p-3 text-base sm:text-sm text-white placeholder-white/40 transition focus:outline-none focus:ring-2 ${
                    errors.review
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/15 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
                  }`}
                />
                {errors.review && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.review}
                  </p>
                )}
              </div>

              {/* Photo Upload */}
              <div>
                <label
                  htmlFor="reviewer-photo"
                  className="block text-xs font-medium uppercase tracking-wider text-white/80"
                >
                  Upload Your Photo <span className="text-xs text-white/40">(Optional)</span>
                </label>
                <div className="mt-1.5 flex items-center gap-3">
                  <label
                    htmlFor="reviewer-photo"
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/25 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:border-white/40 transition"
                  >
                    <Upload className="h-4 w-4 text-[#2f80ed]" />
                    <span>{photo ? photo.name : 'Choose image file'}</span>
                  </label>
                  <input
                    id="reviewer-photo"
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
                  <span className="text-xs text-white/50">Accepted: JPG, PNG, WEBP</span>
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
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-[#2f80ed] focus:ring-[#2f80ed]"
                  />
                  <span className="text-xs leading-relaxed text-white/80">
                    I agree that my review and photo may be displayed on this website and confirm this review is based on my genuine experience.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] leading-normal text-white/50 pt-1">
                Reviews are checked before publication to help protect against spam and fake submissions.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#2f80ed] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#5899f0] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
                >
                  {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
