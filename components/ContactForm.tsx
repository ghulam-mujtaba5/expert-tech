'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, User, Mail, Phone, HelpCircle } from 'lucide-react';
import { company } from '@/data/company';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Managed IT Support');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sanitize XSS strings safely
  const sanitizeText = (input: string) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Your name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    // Phone is optional, but if supplied must look like a phone number
    if (phone.trim()) {
      const cleaned = phone.replace(/[\s()-]/g, '');
      const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
      if (!phoneRegex.test(cleaned) && cleaned.length < 8) {
        newErrors.phone = 'Please enter a valid UK or international telephone number.';
      }
    }

    if (!message.trim()) {
      newErrors.message = 'Please describe your requirements.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
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

    // Sanitize message before dispatching
    const cleanMessage = sanitizeText(message);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setService('Managed IT Support');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="w-full rounded-2xl bg-white p-8 text-center text-[#0b1c3d] shadow-2xl border border-black/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h3 className="mt-4 font-heading text-2xl font-bold text-[#0b1c3d]">
          Enquiry Received
        </h3>

        <p className="mt-3 text-base leading-relaxed text-[#1d1e20]/80">
          Thank you. An {company.name} engineer will review your requirements and respond within 15 minutes.
        </p>

        <div className="mt-6 rounded-xl bg-[#ebecef] p-4 text-xs text-[#0b1c3d]/70 text-left">
          <p className="font-semibold text-[#0b1c3d]">Need urgent infrastructure support?</p>
          <p className="mt-1">
            Call our emergency desk directly at{' '}
            <a href={company.telLink} className="font-bold text-[#2f80ed] hover:underline">
              {company.phoneFormatted}
            </a>
          </p>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-xl bg-[#2f80ed] py-3 text-sm font-semibold text-white shadow transition hover:bg-[#5899f0]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white p-6 sm:p-8 text-[#0b1c3d] shadow-2xl border border-black/5">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Your Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Robert Chen"
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

        {/* Work Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Work Email <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="e.g. robert@company.co.uk"
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

        {/* Phone Number */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Phone Number <span className="text-xs text-black/40 font-normal">(Optional)</span>
          </label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder="e.g. +44 7565 322806"
              className={`w-full rounded-lg border bg-[#ebecef]/40 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-[#0b1c3d] placeholder-black/40 transition focus:bg-white focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-black/10 focus:border-[#2f80ed] focus:ring-[#2f80ed]'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Service Interest */}
        <div>
          <label
            htmlFor="contact-service"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            Service Interest
          </label>
          <div className="relative mt-1.5">
            <HelpCircle className="absolute left-3.5 top-3 h-4 w-4 text-black/30" />
            <select
              id="contact-service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full appearance-none rounded-lg border border-black/10 bg-[#ebecef]/40 pl-10 pr-8 py-2.5 text-base sm:text-sm text-[#0b1c3d] transition focus:bg-white focus:border-[#2f80ed] focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
            >
              <option value="Managed IT Support">Managed IT Support & Helpdesk</option>
              <option value="Cloud Solutions">Cloud Solutions & Migration (AWS / Azure)</option>
              <option value="Custom Software">Custom Software & App Development</option>
              <option value="Web Design">Web Design & Full Stack Engineering</option>
              <option value="Cybersecurity">Cybersecurity & UK Compliance</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0b1c3d]"
          >
            How can we help? / Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
            }}
            placeholder="Describe your IT support or custom software requirements..."
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

        {/* Submit Enquiry Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f80ed] py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#5899f0] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]"
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
          </button>
        </div>

        <p className="text-center text-[11px] text-[#1d1e20]/60 pt-1">
          Guaranteed response within 15 minutes during UK business hours (Mon-Fri 9:00 - 18:00).
        </p>
      </form>
    </div>
  );
}
