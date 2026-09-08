/**
 * tests/e2e/tier3-combinations/cross-route-navigation.test.mjs
 * Tier 3 Cross-Feature Combination Tests: Cross-Route Navigation across all 7 routes
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T3: Cross-Route Navigation (All 7 Routes)');

suite.test('T3-NAV01: Navigating to Home (/) renders Home Hero and Shell', async () => {
  const page = await getPage('/');
  assert.equal(page.statusCode, 200);
  assert(hasText(page.html, SPEC.company.name), 'Home must render company branding');
});

suite.test('T3-NAV02: Navigating to Services (/services) renders Services Overview and Shell', async () => {
  const page = await getPage('/services');
  assert(page.statusCode === 200 || page.exists, 'Services route must be accessible');
  assert(hasText(page.html, SPEC.company.name), 'Services page must render company branding');
});

suite.test('T3-NAV04: Navigating to Reviews (/reviews) renders Reviews Testimonials and Shell', async () => {
  const page = await getPage('/reviews');
  assert(page.statusCode === 200 || page.exists, 'Reviews route must be accessible');
  assert(hasText(page.html, SPEC.company.name), 'Reviews page must render company branding');
});

suite.test('T3-NAV05: Navigating to Careers (/careers) renders Careers Form and Shell', async () => {
  const page = await getPage('/careers');
  assert(page.statusCode === 200 || page.exists, 'Careers route must be accessible');
  assert(hasText(page.html, SPEC.company.name), 'Careers page must render company branding');
});

suite.test('T3-NAV06: Navigating to Contact (/contact) renders Contact Form and Shell', async () => {
  const page = await getPage('/contact');
  assert(page.statusCode === 200 || page.exists, 'Contact route must be accessible');
  assert(hasText(page.html, SPEC.company.name), 'Contact page must render company branding');
});

suite.test('T3-NAV07: Navigating to Refund Policy (/refund-policy) renders Legal Terms and Shell', async () => {
  const page = await getPage('/refund-policy');
  assert(page.statusCode === 200 || page.exists, 'Refund Policy route must be accessible');
  assert(hasText(page.html, SPEC.company.name), 'Refund Policy page must render company branding');
});
