/**
 * tests/e2e/tier1-features/f20-contact-office-blocks.test.mjs
 * Feature F20: Contact Page Office & Metrics Hero
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F20: Contact Page Office & Metrics Hero');

suite.test('F20-T01: Contact hero renders overline badge "Direct UK Engineering"', async () => {
  const page = await getPage('/contact');
  assert(
    hasText(page.html, SPEC.contact.badge),
    'Contact hero must render "Direct UK Engineering" overline badge'
  );
});

suite.test('F20-T02: Contact hero renders H1 "Secure systems with zero-friction onboarding."', async () => {
  const page = await getPage('/contact');
  assert(
    hasText(page.html, SPEC.contact.heading) || hasText(page.html, 'zero-friction onboarding'),
    'Contact hero must render H1 headline'
  );
});

suite.test('F20-T03: Contact hero displays "15 Min" average response SLA metric', async () => {
  const page = await getPage('/contact');
  assert(
    hasText(page.html, '15 Min') || hasText(page.html, '15-minute'),
    'Contact hero must display 15-minute response SLA'
  );
});

suite.test('F20-T04: Contact hero displays "99.9%" uptime assurance metric', async () => {
  const page = await getPage('/contact');
  assert(
    hasText(page.html, '99.9%'),
    'Contact hero must display 99.9% uptime metric'
  );
});

suite.test('F20-T05: Contact hero renders "Request a Quote" and "View Services" action buttons', async () => {
  const page = await getPage('/contact');
  const hasRequestQuote = hasText(page.html, 'Request a Quote') || page.html.includes('#contact-form');
  const hasViewServices = hasText(page.html, 'View Services') || page.html.includes('/services');
  assert(hasRequestQuote && hasViewServices, 'Contact hero must include dual quick-action buttons');
});
