/**
 * tests/e2e/tier1-features/f10-home-bottom-cta.test.mjs
 * Feature F10: Home Bottom CTA Section
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F10: Home Bottom CTA Section');

suite.test('F10-T01: Bottom CTA section renders on Royal Blue (#2f80ed) background', async () => {
  const page = await getPage('/');
  const hasRoyal = page.html.includes('#2f80ed') || hasPattern(page.html, /bg-\[#2f80ed\]/);
  assert(hasRoyal, 'Bottom CTA block must use Royal Blue background');
});

suite.test('F10-T02: Bottom CTA renders H2 "Ready to secure your IT infrastructure?"', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, SPEC.home.bottomCta.heading) || hasText(page.html, 'secure your IT infrastructure'),
    'Bottom CTA must display call-to-action headline'
  );
});

suite.test('F10-T03: Bottom CTA renders consultation subheading for UK businesses', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, 'UK-based team') || hasText(page.html, 'consultation'),
    'Bottom CTA must describe personalized consultation with UK team'
  );
});

suite.test('F10-T04: "Schedule a Discovery Call" button links directly to telephone', async () => {
  const page = await getPage('/');
  const hasDiscoveryCall = hasText(page.html, SPEC.home.bottomCta.buttonText) || hasText(page.html, 'Discovery Call');
  const hasTelLink = page.html.includes(SPEC.company.telLink);
  assert(hasDiscoveryCall && hasTelLink, 'Bottom CTA button must trigger direct phone call');
});

suite.test('F10-T05: CTA button uses Dark Navy (#0b1c3d) contrast styling', async () => {
  const page = await getPage('/');
  const hasNavyBtn = page.html.includes('#0b1c3d') || hasPattern(page.html, /bg-\[#0b1c3d\]/);
  assert(hasNavyBtn, 'Discovery call CTA button must use Dark Navy contrast styling');
});
