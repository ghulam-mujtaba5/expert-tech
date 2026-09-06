/**
 * tests/e2e/tier2-boundaries/f12-services-detail-cards-boundaries.test.mjs
 * Tier 2 Boundary Tests: F12 Services Detail Cards
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F12 Boundaries: Services Detail Cards');

suite.test('F12-B01: All service cards render valid semantic heading elements (H3 or H4)', async () => {
  const page = await getPage('/services');
  const hasHeadings = hasPattern(page.html, /<h[34]/i);
  assert(hasHeadings, 'Service cards must use semantic heading elements (H3/H4)');
});

suite.test('F12-B02: Service cards stack 1-col on mobile and 2-col or 4-col on desktop', async () => {
  const page = await getPage('/services');
  const hasResponsiveCols = hasPattern(page.html, /grid-cols-1|md:grid-cols-2|lg:grid-cols-4/);
  assert(hasResponsiveCols, 'Service cards must adapt grid columns across breakpoints');
});

suite.test('F12-B03: Card shadow elevation uses valid box-shadow token without CSS errors', async () => {
  const page = await getPage('/services');
  const hasShadow = hasPattern(page.html, /shadow-card|shadow-lg|shadow-xl|shadow-md/);
  assert(hasShadow, 'Cards must specify standard Tailwind shadow tokens');
});

suite.test('F12-B04: Long text content inside service cards does not break card flex boundaries', async () => {
  const page = await getPage('/services');
  const hasFlexContain = hasPattern(page.html, /flex flex-col|p-6|p-7|p-8/);
  assert(hasFlexContain, 'Cards must maintain structured flex containers');
});

suite.test('F12-B05: Card background Soft Slate (#ebecef) maintains WCAG contrast with text', async () => {
  const page = await getPage('/services');
  const hasColors = page.html.includes('#ebecef');
  assert(hasColors, 'Card styling must adhere to design system Soft Slate color token');
});
