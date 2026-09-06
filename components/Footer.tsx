import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import styles from './Footer.module.css';

const SERVICES_LINKS = [
  { href: '/services#managed-it', label: 'Managed IT Support' },
  { href: '/services#cloud', label: 'Cloud Infrastructure' },
  { href: '/services#cybersecurity', label: 'Cyber Security & ISO' },
  { href: '/services#networking', label: 'Network Solutions & Wi-Fi' },
  { href: '/services#m365', label: 'Microsoft 365 & Backup' },
  { href: '/services#business-continuity', label: 'Business Continuity' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      {/* 3px Royal Blue Accent Line */}
      <div className="h-[3px] w-full bg-[#2f80ed]" />

      {/* Blueprint wire with traveling pulse docking at the right */}
      <div className={styles.wire} aria-hidden="true">
        <span className={styles.wirePulse} />
        <span className={styles.wireNode} />
      </div>

      <div className={styles.frame}>
        <div className={styles.content}>
          {/* Brand & Mission Column */}
          <div className={styles.brand}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label={`${company.name} Home`}
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#38bdf8]">
                EXPERT <span className="text-[#2f80ed]">TECH</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              {company.tagline}
            </p>

            <div className={styles.officeInfo}>
              <span className={styles.officeTitle}>{company.jurisdiction}</span>
              <span>{company.address.line1}</span>
              <span>{company.address.town}, {company.address.region}, {company.address.postcode}</span>
            </div>
          </div>

          {/* Services Column */}
          <nav className={styles.navCol} aria-label="Footer services">
            <h4 className={styles.colTitle}>Services</h4>
            {SERVICES_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Company Column */}
          <nav className={styles.navCol} aria-label="Footer company links">
            <h4 className={styles.colTitle}>Company</h4>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Start Panel CTA Card (Where top wire pulse docks) */}
          <div className={styles.startPanel}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <p className={styles.startCopy}>
              Have an IT project or need immediate engineering support? We respond within 15 minutes.
            </p>

            <Link href="/contact" className={styles.cta}>
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>

            <div className={styles.contactRow}>
              <a href={company.telLink} className={styles.contactItem} aria-label="Call Expert Tech">
                <Phone className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                <span className="font-semibold">{company.phoneFormatted}</span>
              </a>
              <a href={`mailto:${company.email}`} className={styles.contactItem} aria-label="Email Expert Tech">
                <Mail className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                <span>{company.email}</span>
              </a>
            </div>

            <div className={styles.slaBadge}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>15-Min Response Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and back to top */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {company.copyright} All rights reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/refund-policy" className={styles.bottomLink}>
              Refund Policy
            </Link>
            <Link href="/contact" className={styles.bottomLink}>
              Support Desk
            </Link>
            <a href="#main-content" className={styles.toTop} aria-label="Back to top">
              ↑
            </a>
          </div>
        </div>
      </div>

      {/* Oversized watermark — quiet, cropped, unmistakably ours */}
      <div className={styles.watermark} aria-hidden="true">
        expert tech
      </div>
    </footer>
  );
}
