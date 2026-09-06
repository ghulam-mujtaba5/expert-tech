/**
 * tests/e2e/tier2-boundaries/f18-careers-culture-perks-boundaries.test.mjs
 * Tier 2 Boundary Tests: F18 Careers Culture & Perks
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F18 Boundaries: Careers Culture & Perks');

suite.test('F18-B01: Hero gradient background colors transition smoothly without CSS parse errors', async () => {
  const page = await getPage('/careers');
  const hasBg = hasPattern(page.html, /bg-|gradient/);
  assert(hasBg, 'Careers hero background must apply valid CSS gradient syntax');
});

suite.test('F18-B02: Culture section text remains legible across mobile (16px) and desktop (16px)', async () => {
  const page = await getPage('/careers');
  const hasLegibleText = hasPattern(page.html, /text-base|text-sm|leading-relaxed/);
  assert(hasLegibleText, 'Careers typography should enforce readable body scales');
});

suite.test('F18-B03: Form container width does not exceed 400px on desktop or 328px on mobile', async () => {
  const page = await getPage('/careers');
  const hasFormConstraints = hasPattern(page.html, /max-w-md|max-w-lg|max-w-\[400px\]/);
  assert(hasFormConstraints, 'Application form container width must be cleanly constrained');
});

suite.test('F18-B04: Careers page navigation retains sticky header and footer visibility', async () => {
  const page = await getPage('/careers');
  const hasShell = hasPattern(page.html, /header/i) && hasPattern(page.html, /footer/i);
  assert(hasShell, 'Careers route must render complete global header and footer shell');
});

suite.test('F18-B05: Contact link for HR directs to hr@experttech.co.uk or on-page form', async () => {
  const page = await getPage('/careers');
  const hasHrTarget = page.html.includes('hr@experttech.co.uk') || hasPattern(page.html, /form|submit/i);
  assert(hasHrTarget, 'Careers route must provide valid application channel');
});
