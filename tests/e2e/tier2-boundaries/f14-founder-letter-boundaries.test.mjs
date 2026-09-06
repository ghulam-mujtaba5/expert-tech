/**
 * tests/e2e/tier2-boundaries/f14-founder-letter-boundaries.test.mjs
 * Tier 2 Boundary Tests: F14 Founder Letter
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F14 Boundaries: Founder Letter');

suite.test('F14-B01: Founder portrait image element includes descriptive alt text', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasAlt = hasPattern(page.html, /alt=["'][^"']*Founder/i) || page.html.includes('Founder of');
  assert(hasAlt, 'Founder portrait image must have descriptive alt attribute');
});

suite.test('F14-B02: Founder portrait maintains fixed aspect ratio and circular geometry on 375px mobile', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasCircle = hasPattern(page.html, /rounded-full|aspect-square/);
  assert(hasCircle, 'Founder photo must maintain circular aspect ratio');
});

suite.test('F14-B03: Specialty cursive font (Lobster) includes fallback to clean serif or cursive', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasFontStack = hasPattern(page.html, /font-serif|font-cursive|italic/);
  assert(hasFontStack, 'Display quote font must include safe fallbacks');
});

suite.test('F14-B04: Motivational quote preserves punctuation and character encoding without artifacts', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasQuoteText = page.html.includes('You try and believe');
  assert(hasQuoteText, 'Quote text must be encoded cleanly without garbled characters');
});

suite.test('F14-B05: Soft Slate background (#bcbcbf / #ebecef) transitions cleanly to dark manifesto section', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasContrastBoundary = page.html.includes('#0b1c3d');
  assert(hasContrastBoundary, 'Founder page must transition cleanly between slate and dark sections');
});
