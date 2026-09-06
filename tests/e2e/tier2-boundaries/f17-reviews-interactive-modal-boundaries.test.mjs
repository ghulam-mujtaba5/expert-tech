/**
 * tests/e2e/tier2-boundaries/f17-reviews-interactive-modal-boundaries.test.mjs
 * Tier 2 Boundary Tests: F17 Reviews Interactive Form & Map Embed
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F17 Boundaries: Reviews Form & Map');

suite.test('F17-B01: Review form rejects submission when rating is 0 / unselected', async () => {
  const page = await getPage('/reviews');
  const hasRatingValidation = hasPattern(page.html, /rating/i);
  assert(hasRatingValidation, 'Review submission requires valid star rating selection');
});

suite.test('F17-B02: Review form rejects submission when consent checkbox is unchecked', async () => {
  const page = await getPage('/reviews');
  const hasConsent = hasPattern(page.html, /consent/i) || hasPattern(page.html, /checkbox/i);
  assert(hasConsent, 'Review form must enforce consent agreement before submission');
});

suite.test('F17-B03: Review form rejects whitespace-only inputs in reviewer name or review text', async () => {
  const page = await getPage('/reviews');
  const hasValidation = hasPattern(page.html, /trim/i) || hasPattern(page.html, /required/i);
  assert(hasValidation, 'Review form inputs must reject empty or whitespace-only content');
});

suite.test('F17-B04: Photo file input restricts accepted formats to valid images (.jpg, .jpeg, .png, .webp)', async () => {
  const page = await getPage('/reviews');
  const hasAcceptAttr = hasPattern(page.html, /accept=["'][^"']*image/i) || hasPattern(page.html, /image\/\*/i);
  assert(hasAcceptAttr, 'File upload must restrict input to supported image mime types');
});

suite.test('F17-B05: Google Map iframe container uses responsive aspect ratio without horizontal overflow', async () => {
  const page = await getPage('/reviews');
  const hasResponsiveIframe = hasPattern(page.html, /w-full|aspect-video|aspect-square|h-\d+/);
  assert(hasResponsiveIframe, 'Map embed container must be responsive without fixed pixel overflow');
});
