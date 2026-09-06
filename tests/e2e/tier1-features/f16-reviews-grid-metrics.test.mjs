/**
 * tests/e2e/tier1-features/f16-reviews-grid-metrics.test.mjs
 * Feature F16: Reviews Page Trust Metrics & Grid
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F16: Reviews Page Trust Metrics & Grid');

suite.test('F16-T01: Reviews page renders section heading for Google Reviews from retainer clients', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, SPEC.reviews.heading) || hasText(page.html, 'Google Reviews') || hasText(page.html, 'Retainer'),
    'Reviews page must render section headline'
  );
});

suite.test('F16-T02: Reviews grid renders testimonial for "OLIVE AURA RECORDS LTD"', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, 'OLIVE AURA RECORDS LTD') || hasText(page.html, 'OLIVE AURA'),
    'Reviews grid must render Olive Aura Records client testimonial'
  );
});

suite.test('F16-T03: Reviews grid renders testimonial for "Jelan o Ltd"', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, 'Jelan o Ltd') || hasText(page.html, 'Jelan'),
    'Reviews grid must render Jelan o Ltd client testimonial'
  );
});

suite.test('F16-T04: Reviews grid renders testimonial for "CITY PROPERTY SWITCH LTD"', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, 'CITY PROPERTY SWITCH LTD') || hasText(page.html, 'CITY PROPERTY'),
    'Reviews grid must render City Property Switch client testimonial'
  );
});

suite.test('F16-T05: Reviews grid renders testimonial for "A Chaon, Individual Client"', async () => {
  const page = await getPage('/reviews');
  assert(
    hasText(page.html, 'A Chaon'),
    'Reviews grid must render A Chaon client testimonial'
  );
});
