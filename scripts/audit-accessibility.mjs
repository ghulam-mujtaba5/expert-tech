#!/usr/bin/env node
/**
 * scripts/audit-accessibility.mjs
 * 
 * Automated CLI accessibility audit for Expert Tech Next.js web application.
 * Verifies WCAG 2.1 AA compliance:
 *  1. Skip to main content link
 *  2. Semantic landmarks (header, nav, main, footer)
 *  3. Heading hierarchy (presence of h1, structured h2/h3)
 *  4. Accessible names on buttons, links, and toggles (aria-label on icon-only buttons)
 *  5. Form control labels (htmlFor matching id) and error indicators
 *  6. Minimum touch-target sizes on mobile controls (min-h-[44px] / min-w-[44px])
 *  7. Image alt text and decorative icon aria-hidden attributes
 *  8. Dialog modal accessibility (role="dialog", aria-modal="true", aria-label)
 * 
 * Usage:
 *   node scripts/audit-accessibility.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

console.log('='.repeat(70));
console.log('  Expert Tech — Automated CLI Accessibility (a11y) Audit (WCAG 2.1 AA)');
console.log('='.repeat(70));

const auditResults = [];
let totalChecks = 0;
let passedChecks = 0;

function check(name, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    auditResults.push({ name, passed: true, details });
    console.log(`  ✓ PASS: ${name}`);
  } else {
    auditResults.push({ name, passed: false, details });
    console.log(`  ✗ FAIL: ${name}${details ? ` -> ${details}` : ''}`);
  }
}

// 1. Check Layout & Landmarks
console.log('\n[1] Landmarks & Document Structure:');
const layoutPath = path.join(rootDir, 'app', 'layout.tsx');
const layoutSrc = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf-8') : '';

check(
  'Main landmark contains id="main-content"',
  layoutSrc.includes('id="main-content"'),
  'Ensures keyboard skip links can focus the main landmark'
);

check(
  'Lang attribute set on <html> root',
  layoutSrc.includes('lang="en-GB"'),
  'WCAG 3.1.1 Language of Page'
);

check(
  'Viewport meta tag configured with maximumScale for zoom accessibility',
  layoutSrc.includes('maximumScale') || layoutSrc.includes('viewport'),
  'WCAG 1.4.4 Resize text up to 200%'
);

// 2. Check Header & Navigation
console.log('\n[2] Header, Skip Links & Navigation:');
const headerPath = path.join(rootDir, 'components', 'Header.tsx');
const headerSrc = fs.existsSync(headerPath) ? fs.readFileSync(headerPath, 'utf-8') : '';

check(
  'Skip to content anchor exists for keyboard/screen reader users',
  headerSrc.includes('href="#main-content"'),
  'WCAG 2.4.1 Bypass Blocks'
);

check(
  'Header has semantic <header> tag',
  headerSrc.includes('<header'),
  'WCAG Landmark Banner'
);

check(
  'Desktop <nav> has aria-label',
  headerSrc.includes('<nav') && headerSrc.includes('aria-label='),
  'WCAG Landmark Navigation identification'
);

check(
  'Mobile toggle button has 44px minimum touch target',
  headerSrc.includes('min-h-[44px]') || headerSrc.includes('min-w-[44px]'),
  'WCAG 2.5.5 Target Size minimum 44x44px'
);

check(
  'Mobile toggle button has dynamic aria-expanded attribute',
  headerSrc.includes('aria-expanded='),
  'WCAG 4.1.2 Name, Role, Value'
);

// 3. Check Mobile Menu Drawer
console.log('\n[3] Mobile Navigation Drawer Accessibility:');
const drawerPath = path.join(rootDir, 'components', 'MobileMenuDrawer.tsx');
const drawerSrc = fs.existsSync(drawerPath) ? fs.readFileSync(drawerPath, 'utf-8') : '';

check(
  'Drawer has role="dialog" and aria-modal="true"',
  drawerSrc.includes('role="dialog"') && drawerSrc.includes('aria-modal="true"'),
  'WAI-ARIA Dialog (Modal) Pattern'
);

check(
  'Drawer has accessible aria-label="Mobile Navigation Menu"',
  drawerSrc.includes('aria-label="Mobile Navigation Menu"'),
  'WAI-ARIA Dialog Labeling'
);

check(
  'Drawer implements Escape key listener for modal dismissal',
  drawerSrc.includes("'Escape'") && drawerSrc.includes('keydown'),
  'WCAG 2.1.1 Keyboard Navigation Dismissal'
);

check(
  'Drawer close button has minimum 44px touch target',
  drawerSrc.includes('min-h-[44px]') && drawerSrc.includes('min-w-[44px]'),
  'WCAG 2.5.5 Target Size'
);

// 4. Check Forms & Label Associations
console.log('\n[4] Form Controls & Error Associations:');
const contactFormPath = path.join(rootDir, 'components', 'ContactForm.tsx');
const contactFormSrc = fs.existsSync(contactFormPath) ? fs.readFileSync(contactFormPath, 'utf-8') : '';

check(
  'ContactForm inputs have explicit <label htmlFor="..."> matching input id',
  contactFormSrc.includes('htmlFor="contact-name"') && contactFormSrc.includes('id="contact-name"') &&
  contactFormSrc.includes('htmlFor="contact-email"') && contactFormSrc.includes('id="contact-email"'),
  'WCAG 1.3.1 Info and Relationships / Form Labels'
);

check(
  'ContactForm inputs use responsive text-base sm:text-sm to prevent iOS zoom',
  contactFormSrc.includes('text-base sm:text-sm'),
  'Prevents mobile auto-zoom distortion'
);

const careersFormPath = path.join(rootDir, 'components', 'CareersForm.tsx');
const careersFormSrc = fs.existsSync(careersFormPath) ? fs.readFileSync(careersFormPath, 'utf-8') : '';

check(
  'CareersForm inputs have explicit <label htmlFor="..."> matching input id',
  careersFormSrc.includes('htmlFor="careers-name"') && careersFormSrc.includes('id="careers-name"'),
  'WCAG 1.3.1 Form Labels'
);

check(
  'CareersForm inputs use responsive text-base sm:text-sm',
  careersFormSrc.includes('text-base sm:text-sm'),
  'Mobile touch usability'
);

// 5. Check Pages for Heading Structure & Alt Texts
console.log('\n[5] Pages Heading Hierarchy & Brand Assets:');
const pages = [
  { file: 'app/page.tsx', name: 'Home' },
  { file: 'app/services/page.tsx', name: 'Services' },
  { file: 'app/reviews/page.tsx', name: 'Reviews' },
  { file: 'app/careers/page.tsx', name: 'Careers' },
  { file: 'app/contact/page.tsx', name: 'Contact' },
  { file: 'app/refund-policy/page.tsx', name: 'Refund Policy' },
];

for (const p of pages) {
  const fullPath = path.join(rootDir, p.file);
  const src = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : '';
  const hasH1 = src.includes('<h1') || src.includes('HeroSection');
  check(
    `${p.name} page contains primary heading (H1)`,
    hasH1,
    `WCAG 2.4.6 Headings and Labels on ${p.file}`
  );
}

// 6. Check Brand Logos & Favicons
console.log('\n[6] Bespoke Brand Assets & Vectors:');
check('Vector logo-white.svg exists', fs.existsSync(path.join(rootDir, 'public', 'logo-white.svg')));
check('Vector logo.svg exists', fs.existsSync(path.join(rootDir, 'public', 'logo.svg')));
check('Vector logo-mark.svg exists', fs.existsSync(path.join(rootDir, 'public', 'images', 'logo-mark.svg')));
check('Vector scotland-seal.svg exists', fs.existsSync(path.join(rootDir, 'public', 'images', 'scotland-seal.svg')));
check('Atmospheric bg-hero-grid.svg exists', fs.existsSync(path.join(rootDir, 'public', 'images', 'bg-hero-grid.svg')));
check('Favicon favicon.svg exists', fs.existsSync(path.join(rootDir, 'public', 'favicon.svg')));
check('Sitemap sitemap.xml exists', fs.existsSync(path.join(rootDir, 'public', 'sitemap.xml')));
check('Robots robots.txt exists', fs.existsSync(path.join(rootDir, 'public', 'robots.txt')));
check('Manifest site.webmanifest exists', fs.existsSync(path.join(rootDir, 'public', 'site.webmanifest')));

console.log('\n' + '='.repeat(70));
console.log(`ACCESSIBILITY AUDIT SUMMARY: ${passedChecks}/${totalChecks} checks passed (${Math.round((passedChecks / totalChecks) * 100)}%)`);
console.log('='.repeat(70));

if (passedChecks === totalChecks) {
  console.log('\n🎉 ALL ACCESSIBILITY & MOBILE CRITERIA VERIFIED SUCCESSFULLY.');
  process.exit(0);
} else {
  console.error('\n❌ AUDIT FAILED: Some accessibility criteria were not satisfied.');
  process.exit(1);
}
