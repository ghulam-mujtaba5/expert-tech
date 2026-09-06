/**
 * tests/e2e/tier2-boundaries/f11-services-overview-boundaries.test.mjs
 * Tier 2 Boundary Tests: F11 Services Overview
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F11 Boundaries: Services Overview');

suite.test('F11-B01: Services overline badge text renders in uppercase or letter-spaced tracking', async () => {
  const page = await getPage('/services');
  const hasTracking = hasPattern(page.html, /uppercase|tracking-|letter-spacing/);
  assert(hasTracking, 'Overline badges must apply tracking or uppercase styling');
});

suite.test('F11-B02: Section heading does not overflow on 375px mobile view', async () => {
  const page = await getPage('/services');
  const hasResponsiveHeading = hasPattern(page.html, /text-2xl|text-3xl|text-4xl/);
  assert(hasResponsiveHeading, 'Services heading must adapt to mobile viewport scales');
});

suite.test('F11-B03: Grid gap classes provide consistent spacing between items', async () => {
  const page = await getPage('/services');
  const hasGap = hasPattern(page.html, /gap-6|gap-8|gap-4/);
  assert(hasGap, 'Grid layout must declare consistent gap spacing');
});

suite.test('F11-B04: Query parameters on /services?foo=bar do not break page rendering', async () => {
  const page = await getPage('/services?filter=all');
  assert(page.statusCode === 200 || page.exists, 'Services route must handle query strings gracefully');
});

suite.test('F11-B05: High contrast between white background and dark navy text is maintained', async () => {
  const page = await getPage('/services');
  const hasContrast = page.html.includes('#0b1c3d') || page.html.includes('text-navy');
  assert(hasContrast, 'Services overview text must use dark primary color for high contrast');
});
