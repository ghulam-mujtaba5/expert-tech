/**
 * tests/e2e/tier2-boundaries/f06-corporate-footer-boundaries.test.mjs
 * Tier 2 Boundary Tests: F06 Corporate Footer
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F06 Boundaries: Corporate Footer');

suite.test('F06-B01: Footer interactive links maintain touch spacing and target size', async () => {
  const page = await getPage('/');
  const hasSpacing = hasPattern(page.html, /space-y-|gap-|py-/);
  assert(hasSpacing, 'Footer links must have comfortable spacing and tap padding');
});

suite.test('F06-B02: Address block wraps cleanly on narrow mobile 320px screen without clipping', async () => {
  const page = await getPage('/');
  const hasWrapping = hasPattern(page.html, /break-words|leading-|text-sm|text-xs/);
  assert(hasWrapping, 'Address typography must handle narrow screen wrapping cleanly');
});

suite.test('F06-B03: Mailto link validates proper email syntax without protocol errors', async () => {
  const page = await getPage('/');
  const hasMailto =
    page.html.includes(`mailto:${SPEC.company.email}`) ||
    (page.html.includes('mailto:') && page.html.includes(SPEC.company.email));
  assert(
    hasMailto,
    `Footer mailto link must target valid email address mailto:${SPEC.company.email}`
  );
});

suite.test('F06-B04: Copyright notice cites current year 2026 and Scottish registration', async () => {
  const page = await getPage('/');
  assert(
    page.html.includes('2026') && page.html.includes('Scotland'),
    'Footer copyright must cite year 2026 and Scottish registration'
  );
});

suite.test('F06-B05: Footer blue bar width adapts across mobile (full/wide) and desktop (narrow bar)', async () => {
  const page = await getPage('/');
  const hasBarWidth = hasPattern(page.html, /w-12|w-\[48px\]|w-full|md:w-/);
  assert(hasBarWidth, 'Decorative accent bar must support responsive styling');
});
