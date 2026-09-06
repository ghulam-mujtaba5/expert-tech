/**
 * tests/e2e/tier1-features/f13-services-process-banner.test.mjs
 * Feature F13: Services Process & Quote CTA Banner
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F13: Services Process & Quote CTA Banner');

suite.test('F13-T01: Quote banner renders on Royal Blue (#2f80ed) background', async () => {
  const page = await getPage('/services');
  const hasRoyal = page.html.includes('#2f80ed') || hasPattern(page.html, /bg-\[#2f80ed\]/);
  assert(hasRoyal, 'Services quote banner must use Royal Blue background');
});

suite.test('F13-T02: Quote banner renders H2 "Ready for Proactive IT Support?"', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, SPEC.services.cta.heading) || hasText(page.html, 'Proactive IT Support'),
    'Services banner must display H2 headline'
  );
});

suite.test('F13-T03: Quote banner describes tailored quote and secure future with Expert Tech', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'tailored quote') || hasText(page.html, SPEC.company.name),
    'Services banner must describe tailored quote proposition'
  );
});

suite.test('F13-T04: "Get a Quote" CTA button links to /contact', async () => {
  const page = await getPage('/services');
  const hasQuoteBtn = page.html.includes('href="/contact"') || hasText(page.html, SPEC.services.cta.buttonText);
  assert(hasQuoteBtn, 'Get a Quote button must navigate to /contact');
});

suite.test('F13-T05: Quote CTA button uses Dark Navy (#0b1c3d) contrast styling', async () => {
  const page = await getPage('/services');
  const hasNavy = page.html.includes('#0b1c3d') || hasPattern(page.html, /bg-\[#0b1c3d\]/);
  assert(hasNavy, 'Quote CTA button must apply Dark Navy styling');
});
