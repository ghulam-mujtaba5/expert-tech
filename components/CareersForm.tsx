'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';
import { company } from '@/data/company';

interface CareersFormProps {
  initialRole?: string;
  onSuccess?: () => void;
}

export default function CareersForm({ initialRole = '', onSuccess }: CareersFormProps) {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update expertise if initialRole changes
  React.useEffect(() => {
    if (initialRole) {
      setExpertise(initialRole);
    }
  }, [initialRole]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!expertise.trim()) {
      newErrors.expertise = 'Please provide your expertise or role interest.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please include a message describing your experience.';
    }

    if (!consent) {
      newErrors.consent = 'Consent is required to process your application.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate genuine application processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setExpertise('');
    setEmail('');
    setPhone('');
    setMessage('');
    setResume(null);
    setConsent(true);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-6 sm:p-8 text-center text-[#0b1c3d] shadow-xl border border-black/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h3 className="mt-4 font-heading text-2xl font-bold text-[#0b1c3d]">
          Thank You!
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#1d1e20]/80">
          Your application has been received. Our UK-based recruitment team will review your details and respond shortly.
        </p>

        <div className="mt-6 rounded-xl bg-[#ebecef] p-4 text-xs text-[#0b1c3d]/70 text-left">
          <p className="font-semibold text-[#0b1c3d]">Direct Recruitment Inquiries:</p>
          <a
            href={`mailto:${company.careersEmail}`}
            className="mt-1 block text-[#2f80ed] hover:underline"
          >
            {company.careersEmail}
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2f80ed] py-3 text-sm font-semibold text-white shadow transition hover:bg-[#5899f0]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-black/10 py-2.5 text-xs font-medium text-[#1d1e20] hover:bg-black/5 transition"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="application-form"
      className="w-full max-w-md mx-auto rounded-2xl bg-white p-6 sm:p-8 text-[#0b1c3d] shadow-2xl border border-black/5"
    >
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#2f80ed]">
          Join Our Team
        </span>
        <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0b1c3d]">
          Submit Application
        </h2>
        <p className="mt-1.5 text-xs text-[#1d1e20]/70">
          Enter your details below to explore engineering opportunities at {company.name}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name */}
        <div>
          <label
            htmlFor="careers-name"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="careers-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="Your name"
              className={`w-full rounded-lg border bg-[#ebecef]/40 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
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

        {/* Your Expertise */}
        <div>
          <label
            htmlFor="careers-expertise"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Your Expertise <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="careers-expertise"
              name="expertise"
              type="text"
              required
              value={expertise}
              onChange={(e) => {
                setExpertise(e.target.value);
                if (errors.expertise) setErrors((prev) => ({ ...prev, expertise: '' }));
              }}
              placeholder="e.g. Senior Cloud & DevOps Engineer"
              className={`w-full rounded-lg border bg-[#ebecef]/40 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
                errors.expertise
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
              }`}
            />
          </div>
          {errors.expertise && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.expertise}
            </p>
          )}
        </div>

        {/* Your email */}
        <div>
          <label
            htmlFor="careers-email"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Your email <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="careers-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="Your email address"
              className={`w-full rounded-lg border bg-[#ebecef]/40 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="careers-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Phone Number <span className="text-xs text-black/40 font-normal">(Optional)</span>
          </label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="careers-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +44 7565 322806"
              className="w-full rounded-lg border border-black/10 bg-[#ebecef]/40 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:border-[#2f80ed] focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="careers-message"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="careers-message"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
            }}
            placeholder="Tell us about your technical background and why you want to join Expert Tech"
            className={`mt-1.5 w-full rounded-lg border bg-[#ebecef]/40 p-3 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
            }`}
          />
          {errors.message && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Resume Upload */}
        <div>
          <label
            htmlFor="careers-resume"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Upload CV / Resume <span className="text-xs text-black/40 font-normal">(PDF, DOC, DOCX)</span>
          </label>
          <div className="mt-1.5 flex items-center gap-3">
            <label
              htmlFor="careers-resume"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-black/20 bg-[#ebecef]/30 px-4 py-2 text-xs font-medium text-[#0b1c3d] hover:bg-[#ebecef] transition"
            >
              <Upload className="h-4 w-4 text-[#2f80ed]" />
              <span>{resume ? resume.name : 'Select document'}</span>
            </label>
            <input
              id="careers-resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setResume(e.target.files[0]);
                }
              }}
            />
            <span className="text-[11px] text-black/50">Max 10MB</span>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
              }}
              className="mt-0.5 h-4 w-4 rounded border-black/20 text-[#2f80ed] focus:ring-[#2f80ed]"
            />
            <span className="text-[11px] leading-tight text-[#1d1e20]/75">
              I consent to {company.name} processing my application data for recruitment in compliance with UK GDPR.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#174076] py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#0b1c3d] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit'}
          </button>
        </div>

        {/* Direct HR link */}
        <p className="text-center text-xs text-[#1d1e20]/60 pt-2">
          Prefer direct email? Contact us at{' '}
          <a
            href={`mailto:${company.careersEmail}`}
            className="font-medium text-[#2f80ed] hover:underline"
          >
            {company.careersEmail}
          </a>
        </p>
      </form>
    </div>
  );
}
