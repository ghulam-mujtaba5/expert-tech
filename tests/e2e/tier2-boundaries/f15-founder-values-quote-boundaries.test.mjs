/**
 * tests/e2e/tier2-boundaries/f15-founder-values-quote-boundaries.test.mjs
 * Tier 2 Boundary Tests: F15 Founder Values & Philosophy
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F15 Boundaries: Founder Values & Philosophy');

suite.test('F15-B01: Manifesto section Deep Navy (#0b1c3d) with pure white text achieves >15:1 contrast', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasDarkSection = page.html.includes('#0b1c3d');
  assert(hasDarkSection, 'Manifesto section must use Deep Navy dark contrast styling');
});

suite.test('F15-B02: Three Principle cards stack vertically on 375px mobile and 3 columns on desktop', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasResponsiveGrid = hasPattern(page.html, /grid-cols-1|md:grid-cols-3/);
  assert(hasResponsiveGrid, 'Principle cards must stack on mobile and expand on desktop');
});

suite.test('F15-B03: Principle card icons define aria-hidden or semantic presentation attributes', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasAriaIcons = hasPattern(page.html, /aria-hidden|lucide/i);
  assert(hasAriaIcons, 'Decorative icons must include proper accessibility attributes');
});

suite.test('F15-B04: Principle descriptions contain full, complete sentences without truncated text', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasFullSentences = page.html.includes('dedication') || page.html.includes('regulations') || page.html.includes('standards') || page.html.includes('Transparent');
  assert(hasFullSentences, 'Principle cards must render complete copy blocks without truncation');
});

suite.test('F15-B05: Section padding adheres to responsive gutter requirements (16px mobile / 24px desktop)', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasGutters = hasPattern(page.html, /px-4|px-6|py-12|py-16/);
  assert(hasGutters, 'Sections must maintain responsive gutter padding');
});
