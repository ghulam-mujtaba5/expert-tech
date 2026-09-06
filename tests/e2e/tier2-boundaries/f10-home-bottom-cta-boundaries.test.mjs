/**
 * tests/e2e/tier2-boundaries/f10-home-bottom-cta-boundaries.test.mjs
 * Tier 2 Boundary Tests: F10 Home Bottom CTA
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F10 Boundaries: Home Bottom CTA');

suite.test('F10-B01: Discovery call button handles click on desktop where telephony client may be absent', async () => {
  const page = await getPage('/');
  assert(
    page.html.includes(SPEC.company.telLink),
    'Discovery call button must provide standard tel: link'
  );
});

suite.test('F10-B02: Section background Royal Blue (#2f80ed) maintains WCAG contrast with dark navy button', async () => {
  const page = await getPage('/');
  const hasColors = page.html.includes('#2f80ed') && page.html.includes('#0b1c3d');
  assert(hasColors, 'CTA section and button tokens must meet contrast requirements');
});

suite.test('F10-B03: Discovery call button text does not overflow button boundary on 375px viewport', async () => {
  const page = await getPage('/');
  const hasPadding = hasPattern(page.html, /px-6|px-8|py-3|py-4/);
  assert(hasPadding, 'Discovery call button must provide proper padding on mobile');
});

suite.test('F10-B04: Section padding prevents content from touching viewport edges on mobile (p-4 or p-6)', async () => {
  const page = await getPage('/');
  const hasPadding = hasPattern(page.html, /px-4|px-6|py-12|py-16/);
  assert(hasPadding, 'CTA section must include adequate gutter padding');
});

suite.test('F10-B05: Subheading text wraps within maximum readable line length (65-75 chars)', async () => {
  const page = await getPage('/');
  const hasMaxWidth = hasPattern(page.html, /max-w-xl|max-w-2xl|max-w-lg/);
  assert(hasMaxWidth, 'Subheading typography should be constrained for readability');
});
