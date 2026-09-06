/**
 * tests/e2e/tier1-features/f11-services-overview.test.mjs
 * Feature F11: Services Page Hero & Overview
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F11: Services Page Hero & Overview');

suite.test('F11-T01: Services page renders overline badge "Our Expertise"', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, SPEC.services.overline),
    'Services page must include "Our Expertise" badge'
  );
});

suite.test('F11-T02: Services page renders H2 "Comprehensive IT Solutions"', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, SPEC.services.heading),
    'Services page must render H2 "Comprehensive IT Solutions"'
  );
});

suite.test('F11-T03: Services page renders full spectrum IT value proposition', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'full spectrum') || hasText(page.html, 'secure, efficient, and compliant'),
    'Services page must describe comprehensive technology services'
  );
});

suite.test('F11-T04: Services overview is laid out within responsive grid structure', async () => {
  const page = await getPage('/services');
  const hasGrid = hasPattern(page.html, /grid/) || hasPattern(page.html, /flex/);
  assert(hasGrid, 'Services section must use responsive grid layout');
});

suite.test('F11-T05: Services page maintains brand cleanliness (zero "Elvarix")', async () => {
  const page = await getPage('/services');
  const match = page.html.match(SPEC.company.forbiddenBrand);
  assert(!match, `Services page must not contain legacy brand "${match?.[0]}"`);
});
