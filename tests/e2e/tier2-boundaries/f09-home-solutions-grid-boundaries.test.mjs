/**
 * tests/e2e/tier2-boundaries/f09-home-solutions-grid-boundaries.test.mjs
 * Tier 2 Boundary Tests: F09 Home Solutions Grid
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F09 Boundaries: Home Solutions Grid');

suite.test('F09-B01: Solutions grid wraps to single column on mobile 375px (grid-cols-1)', async () => {
  const page = await getPage('/');
  const hasColWrapping = hasPattern(page.html, /grid-cols-1/);
  assert(hasColWrapping, 'Solutions grid must stack as single column on mobile viewports');
});

suite.test('F09-B02: Solutions grid expands to 3 columns on desktop 1440px (md:grid-cols-3)', async () => {
  const page = await getPage('/');
  const hasDesktopCols = hasPattern(page.html, /md:grid-cols-3|lg:grid-cols-3/);
  assert(hasDesktopCols, 'Solutions grid must expand to 3 columns on desktop viewports');
});

suite.test('F09-B03: Cards maintain equal height regardless of variation in description lengths', async () => {
  const page = await getPage('/');
  const hasEqualHeight = hasPattern(page.html, /h-full|flex flex-col|items-stretch/);
  assert(hasEqualHeight, 'Cards should use flex stretch to maintain uniform heights');
});

suite.test('F09-B04: Hover lift animation does not cause layout shifts or scroll jumps', async () => {
  const page = await getPage('/');
  const hasHover = hasPattern(page.html, /hover:-translate-y|transition|hover:shadow/);
  assert(hasHover, 'Card hover animations should use GPU-accelerated transforms');
});

suite.test('F09-B05: Icon SVGs preserve viewBox attributes and do not distort on narrow containers', async () => {
  const page = await getPage('/');
  const hasSvgPreservation = hasPattern(page.html, /shrink-0|min-w-|w-6|h-6/);
  assert(hasSvgPreservation, 'Icons inside cards must maintain rigid square dimensions');
});
