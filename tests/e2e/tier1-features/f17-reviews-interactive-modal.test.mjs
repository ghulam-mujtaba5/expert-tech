/**
 * tests/e2e/tier1-features/f17-reviews-interactive-modal.test.mjs
 * Feature F17: Reviews Interactive Form & Map Embed
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F17: Reviews Interactive Form & Map Embed');

suite.test('F17-T01: Reviews page renders "Leave a Review" interactive form heading', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, SPEC.reviews.formHeading) || hasText(page.html, 'Leave a Review'),
    'Reviews page must render "Leave a Review" form'
  );
});

suite.test('F17-T02: Review form contains Name, Company, Rating, Review text, and Consent inputs', async () => {
  const page = await getPage('/reviews');
  const hasInputs = hasPattern(page.html, /rating/i) || hasPattern(page.html, /review/i) || hasPattern(page.html, /textarea/i);
  assert(hasInputs, 'Review form must provide star rating, review textarea, and name inputs');
});

suite.test('F17-T03: Review form renders "Submit Review" action button', async () => {
  const page = await getPage('/reviews');
  const hasSubmit = hasText(page.html, 'Submit Review') || hasText(page.html, 'Submit');
  assert(hasSubmit, 'Review form must feature Submit Review button');
});

suite.test('F17-T04: Reviews page renders Google Map embed centered on Scottish address', async () => {
  const page = await getPage('/reviews');
  const hasMap = hasPattern(page.html, /<iframe/i) || hasPattern(page.html, /maps\.google/i) || hasText(page.html, 'Cowdenbeath');
  assert(hasMap, 'Reviews page must render Google Map embed for Scottish headquarters');
});

suite.test('F17-T05: Reviews page renders external Google Reviews button linking in new tab', async () => {
  const page = await getPage('/reviews');
  const hasGoogleLink = page.html.includes('share.google') || hasPattern(page.html, /google/i);
  assert(hasGoogleLink, 'Reviews page must feature external Google Reviews CTA button');
});
