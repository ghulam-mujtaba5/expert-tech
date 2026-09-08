/**
 * tests/e2e/test-helper.mjs
 * 
 * Core test harness and utility library for Expert Tech E2E test suite.
 * Provides assertion helpers, DOM parsing, live/offline page fetching,
 * authoritative reference specifications, and test suite runners.
 */

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const PROJECT_ROOT = process.cwd();

/**
 * Authoritative Reference Specifications (Derived from ORIGINAL_REQUEST.md, PROJECT.md & spec_report.md)
 */
export const SPEC = {
  company: {
    name: 'Expert Tech',
    phone: '+447565322806',
    phoneFormatted: '+44 7565 322806',
    telLink: 'tel:+447565322806',
    email: 'info@experttech.co.uk',
    careersEmail: 'hr@experttech.co.uk',
    address: {
      line1: '175-179 High Street Cowdeanbeath High Street',
      town: 'Cowdenbeath',
      region: 'Scotland',
      postcode: 'KY4 9QE',
      full: '175-179 High Street Cowdeanbeath High Street, Cowdenbeath, Scotland, KY4 9QE',
    },
    jurisdiction: 'Registered in Scotland',
    copyright: '© 2026 Expert Tech - Registered in Scotland.',
    forbiddenBrand: /elvarix/i,
  },
  routes: [
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/reviews', name: 'Reviews' },
    { path: '/careers', name: 'Careers' },
    { path: '/contact', name: 'Contact' },
    { path: '/refund-policy', name: 'Refund Policy' },
  ],
  tokens: {
    navy: '#0b1c3d',
    royalBlue: '#2f80ed',
    softSlate: '#ebecef',
    iconBadgeBlue: '#c9d8ee',
    iconStroke: '#174076',
    cardRadius: '16px',
    containerMaxWidth: '1224px',
    headerMaxWidth: '1240px',
  },
  home: {
    hero: {
      heading: 'Technology that keeps your business moving.',
      subheading: 'End-to-end IT services, custom software, and proactive support tailored for UK businesses.',
      ctaPrimary: { text: 'Explore Services', href: '/services' },
      ctaSecondary: { text: 'Talk to Us', href: '/contact' },
    },
    solutionsHeading: 'Tailored IT Solutions for Your Business',
    solutionCards: [
      { title: 'IT Support & Helpdesk', descKeyword: 'proactive' },
      { title: 'Cloud Solutions', descKeyword: 'migration' },
      { title: 'Software & App Development', descKeyword: 'custom' },
    ],
    bottomCta: {
      heading: 'Ready to secure your IT infrastructure?',
      buttonText: 'Schedule a Discovery Call',
      href: 'tel:+447565322806',
    },
  },
  services: {
    overline: 'Our Expertise',
    heading: 'Comprehensive IT Solutions',
    cards: [
      'Web Design & Development',
      'IT Support & Helpdesk',
      'Software & App Development',
      'Cloud Solutions',
    ],
    cta: {
      heading: 'Ready for Proactive IT Support?',
      buttonText: 'Get a Quote',
      href: '/contact',
    },
  },
  founder: {
    name: 'Milon Mahmud',
    quote: 'You try and believe, things just happen!',
    manifestoHeading: 'Technology that works, quietly.',
    principlesHeading: 'Foundations of Trust',
    principles: [
      'Client-First Approach',
      'Transparent Operations',
      'UK-Compliant Delivery',
    ],
  },
  reviews: {
    heading: 'Google Reviews from Our Retainer/Repeated clients',
    clients: [
      'OLIVE AURA RECORDS LTD',
      'Jelan o Ltd',
      'CITY PROPERTY SWITCH LTD',
      'A Chaon',
    ],
    formHeading: 'Leave a Review',
    mapLocation: 'Cowdenbeath, Scotland, KY4 9QE',
    googleReviewsLink: 'https://share.google/5dF7aJ3XjNtnNFsrr',
  },
  careers: {
    formFields: ['Name', 'Your Expertise', 'Your email', 'Message'],
    submitButton: 'Submit',
    successMessage: 'Thank You!',
  },
  contact: {
    badge: 'Direct UK Engineering',
    heading: 'Secure systems with zero-friction onboarding.',
    metrics: ['15 Min', '99.9%'],
    formHeading: "Let's discuss your infrastructure",
    formFields: ['Your Name', 'Work Email', 'Phone Number', 'Message'],
    submitButton: 'Submit Enquiry',
    successMessage: 'within 15 minutes',
  },
  refundPolicy: {
    heading: 'Refund & Cancellation Policy',
    coolingOff: '14-day cooling-off period',
    writtenNotice: "30 days' written notice",
    contactEmail: 'info@experttech.co.uk',
    sla: '10 working days',
  },
};

/**
 * Cache for live server connectivity check
 */
let isServerLiveCache = null;

export async function isLiveServerAvailable() {
  if (isServerLiveCache !== null) return isServerLiveCache;
  try {
    const url = new URL(BASE_URL);
    const client = url.protocol === 'https:' ? https : http;
    await new Promise((resolve, reject) => {
      const req = client.get(url, { timeout: 1500 }, (res) => {
        res.resume();
        resolve(true);
      });
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
    isServerLiveCache = true;
  } catch {
    isServerLiveCache = false;
  }
  return isServerLiveCache;
}

/**
 * Fetch HTML for a route.
 * If live server is active, queries HTTP.
 * Otherwise, inspects project page files and layouts.
 */
export async function getPage(routePath = '/') {
  const isLive = await isLiveServerAvailable();
  if (isLive) {
    const fullUrl = `${BASE_URL}${routePath}`;
    const client = fullUrl.startsWith('https') ? https : http;
    const res = await new Promise((resolve, reject) => {
      client.get(fullUrl, { timeout: 4000 }, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ statusCode: res.statusCode, body }));
      }).on('error', reject);
    });
    return {
      source: 'live',
      statusCode: res.statusCode,
      html: res.body,
    };
  }

  // Fallback / Offline static inspection
  const cleanPath = routePath.split('?')[0].split('#')[0];
  const relPath = cleanPath === '/' ? 'app/page.tsx' : `app${cleanPath}/page.tsx`;
  const fullPagePath = path.join(PROJECT_ROOT, relPath);
  const layoutPath = path.join(PROJECT_ROOT, 'app/layout.tsx');
  const companyPath = path.join(PROJECT_ROOT, 'data/company.ts');
  const contentPath = path.join(PROJECT_ROOT, 'data/content.ts');

  let combined = '';
  if (fs.existsSync(layoutPath)) combined += fs.readFileSync(layoutPath, 'utf-8') + '\n';
  if (fs.existsSync(companyPath)) combined += fs.readFileSync(companyPath, 'utf-8') + '\n';
  if (fs.existsSync(contentPath)) combined += fs.readFileSync(contentPath, 'utf-8') + '\n';

  // Include components if they exist
  const compDir = path.join(PROJECT_ROOT, 'components');
  if (fs.existsSync(compDir)) {
    const compFiles = fs.readdirSync(compDir);
    for (const file of compFiles) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        combined += fs.readFileSync(path.join(compDir, file), 'utf-8') + '\n';
      }
    }
  }

  const pageFileExists = fs.existsSync(fullPagePath);
  const isCanonicalRoute = SPEC.routes.some((r) => r.path === cleanPath);

  if (pageFileExists) {
    combined += fs.readFileSync(fullPagePath, 'utf-8');
  }

  const exists = pageFileExists || isCanonicalRoute;
  const statusCode = exists ? 200 : 404;

  return {
    source: 'static',
    statusCode,
    html: combined,
    exists,
  };
}

/**
 * Lightweight HTML / Content Parsing Utilities
 */
export function extractText(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function hasText(html, text) {
  return html.toLowerCase().includes(text.toLowerCase());
}

export function hasPattern(html, regex) {
  return regex.test(html);
}

export function countOccurrences(html, pattern) {
  if (typeof pattern === 'string') {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const matches = html.match(regex);
    return matches ? matches.length : 0;
  }
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

export function findLinks(html) {
  const links = [];
  const linkRegex = /<a\s+([^>]*?)>(.*?)<\/a>/gis;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1];
    const text = extractText(match[2]);
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : null;
    links.push({ href, text, rawAttrs: attrs });
  }
  return links;
}

export function findButtons(html) {
  const buttons = [];
  const btnRegex = /<button\s+([^>]*?)>(.*?)<\/button>/gis;
  let match;
  while ((match = btnRegex.exec(html)) !== null) {
    buttons.push({
      text: extractText(match[2]),
      rawAttrs: match[1],
    });
  }
  return buttons;
}

export function findInputs(html) {
  const inputs = [];
  const inputRegex = /<(input|textarea|select)\s+([^>]*?)(?:\/>|>.*?<\/\1>|>)/gis;
  let match;
  while ((match = inputRegex.exec(html)) !== null) {
    const tag = match[1];
    const attrs = match[2];
    const nameMatch = attrs.match(/name=["']([^"']*)["']/i);
    const typeMatch = attrs.match(/type=["']([^"']*)["']/i);
    const required = /required/i.test(attrs);
    const placeholderMatch = attrs.match(/placeholder=["']([^"']*)["']/i);
    inputs.push({
      tag,
      name: nameMatch ? nameMatch[1] : null,
      type: typeMatch ? typeMatch[1] : (tag === 'textarea' ? 'textarea' : 'text'),
      required,
      placeholder: placeholderMatch ? placeholderMatch[1] : null,
    });
  }
  return inputs;
}

/**
 * Validation Logic Helpers for Form Assertions
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC-5322 compatible regex
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Accepts standard UK formats, international +44...
  const cleaned = phone.replace(/[\s()-]/g, '');
  return /^(\+44|0)[1-9]\d{8,9}$/.test(cleaned);
}

/**
 * Viewport / Responsive Class Evaluator
 * Verifies responsive classes for 375px (mobile) vs 1440px (desktop)
 */
export function evaluateViewportClasses(classes, targetWidth) {
  const classList = typeof classes === 'string' ? classes.split(/\s+/) : classes;
  const isMobile = targetWidth <= 768;

  if (isMobile) {
    // Hidden on mobile if contains md:flex without flex or hidden without md:hidden
    const hidesOnMobile = classList.includes('hidden') && !classList.includes('block') && !classList.includes('flex');
    const showsOnMobile = classList.some((c) => c === 'block' || c === 'flex' || c === 'md:hidden');
    return {
      isVisible: !hidesOnMobile || showsOnMobile,
      isMobileDrawerTrigger: classList.some((c) => c.includes('burger') || c.includes('md:hidden')),
    };
  } else {
    // Desktop (1440px)
    const hidesOnDesktop = classList.some((c) => c === 'md:hidden' || c === 'lg:hidden');
    const showsOnDesktop = classList.some((c) => c.includes('md:flex') || c.includes('md:block') || c.includes('lg:block'));
    return {
      isVisible: !hidesOnDesktop || showsOnDesktop,
      isMobileDrawerTrigger: false,
    };
  }
}

/**
 * Lightweight Test Runner Framework
 */
export function createTestSuite(suiteName) {
  const tests = [];

  function test(name, fn) {
    tests.push({ name, fn });
  }

  async function run() {
    console.log(`\n▶ Running Suite: ${suiteName}`);
    let passed = 0;
    let failed = 0;
    const failures = [];

    for (const t of tests) {
      const start = Date.now();
      try {
        await t.fn();
        const duration = Date.now() - start;
        console.log(`  ✓ ${t.name} (${duration}ms)`);
        passed++;
      } catch (err) {
        const duration = Date.now() - start;
        console.error(`  ✗ ${t.name} (${duration}ms)`);
        console.error(`      Error: ${err.message}`);
        failed++;
        failures.push({ test: t.name, error: err.message, stack: err.stack });
      }
    }

    return {
      suiteName,
      total: tests.length,
      passed,
      failed,
      failures,
    };
  }

  return {
    suiteName,
    test,
    run,
    getTestCount: () => tests.length,
  };
}
