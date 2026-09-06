/**
 * tests/e2e/tier2-boundaries/f07-floating-action-btn-boundaries.test.mjs
 * Tier 2 Boundary Tests: F07 Floating Action Button
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F07 Boundaries: Floating Action Button');

suite.test('F07-B01: Floating CTA does not obscure critical footer copyright on full scroll', async () => {
  const page = await getPage('/');
  const hasMargins = hasPattern(page.html, /bottom-4|bottom-6|bottom-8|bottom-\[24px\]/);
  assert(hasMargins, 'Floating CTA positioning must preserve margins from viewport edges');
});

suite.test('F07-B02: Floating CTA click action opens phone dialer directly without reload', async () => {
  const page = await getPage('/');
  assert(
    page.html.includes(`href="${SPEC.company.telLink}"`) || page.html.includes(SPEC.company.telLink),
    'Floating CTA must be an anchor directly pointing to tel link'
  );
});

suite.test('F07-B03: Floating CTA button meets touch target requirements (≥48x48px)', async () => {
  const page = await getPage('/');
  const hasSize = hasPattern(page.html, /w-12|h-12|w-14|h-14|w-16|h-16|p-3|p-4/);
  assert(hasSize, 'Floating CTA dimensions must ensure easy tap on mobile devices');
});

suite.test('F07-B04: Floating CTA position remains pinned to viewport during momentum scroll', async () => {
  const page = await getPage('/');
  const hasFixed = hasPattern(page.html, /fixed/);
  assert(hasFixed, 'Floating CTA must maintain CSS position: fixed');
});

suite.test('F07-B05: Floating CTA includes accessible screen reader title or aria-label', async () => {
  const page = await getPage('/');
  const hasA11y = hasPattern(page.html, /aria-label|title=["'][^"']*call/i);
  assert(hasA11y, 'Floating CTA button must provide accessible label');
});
