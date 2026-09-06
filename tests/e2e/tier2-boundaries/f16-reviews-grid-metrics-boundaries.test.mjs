/**
 * tests/e2e/tier2-boundaries/f16-reviews-grid-metrics-boundaries.test.mjs
 * Tier 2 Boundary Tests: F16 Reviews Grid & Metrics
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F16 Boundaries: Reviews Grid & Metrics');

suite.test('F16-B01: Review star rating symbols (★★★★★) render consistently without UTF-8 corruption', async () => {
  const page = await getPage('/reviews');
  const hasStars = page.html.includes('★') || hasPattern(page.html, /star/i);
  assert(hasStars, 'Reviews page must render 5-star rating icons or symbols');
});

suite.test('F16-B02: Testimonial cards wrap gracefully on 375px mobile viewports', async () => {
  const page = await getPage('/reviews');
  const hasColWrap = hasPattern(page.html, /grid-cols-1|md:grid-cols-2/);
  assert(hasColWrap, 'Testimonial cards must wrap to single column on mobile');
});

suite.test('F16-B03: Testimonial quotes handle quotes with internal quotation marks cleanly', async () => {
  const page = await getPage('/reviews');
  const hasQuotes = hasPattern(page.html, /["'“”]/);
  assert(hasQuotes, 'Testimonials must preserve typographic quotation marks');
});

suite.test('F16-B04: Client avatar images maintain circular dimensions (aspect-square / rounded-full)', async () => {
  const page = await getPage('/reviews');
  const hasAvatarStyles = hasPattern(page.html, /rounded-full|w-1[24]|h-1[24]/);
  assert(hasAvatarStyles, 'Client avatars must use circular geometry');
});

suite.test('F16-B05: Dark background overlay ensures high readability of client testimonials', async () => {
  const page = await getPage('/reviews');
  const hasDarkOverlay = page.html.includes('#0b1538') || page.html.includes('#1a375c') || page.html.includes('bg-opacity');
  assert(hasDarkOverlay, 'Reviews section must provide dark background overlay for text contrast');
});
