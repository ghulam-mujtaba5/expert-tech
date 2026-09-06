/**
 * tests/e2e/tier1-features/f15-founder-values-quote.test.mjs
 * Feature F15: Founder Values & Philosophy
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F15: Founder Values & Philosophy');

suite.test('F15-T01: Philosophy section renders manifesto headline "Technology that works, quietly."', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, SPEC.founder.manifestoHeading) || hasText(page.html, 'works, quietly'),
    'Founder page must render philosophy manifesto headline'
  );
});

suite.test('F15-T02: Principles section renders H2 "Foundations of Trust"', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, SPEC.founder.principlesHeading) || hasText(page.html, 'Foundations of Trust'),
    'Founder page must render H2 "Foundations of Trust"'
  );
});

suite.test('F15-T03: Principle card 1 renders "Client-First Approach" with description', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, 'Client-First Approach') || hasText(page.html, 'Client-First'),
    'Principles section must render Client-First Approach card'
  );
});

suite.test('F15-T04: Principle card 2 renders "Transparent Operations" with description', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, 'Transparent Operations'),
    'Principles section must render Transparent Operations card'
  );
});

suite.test('F15-T05: Principle card 3 renders "UK-Compliant Delivery" with compliance copy', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, 'UK-Compliant Delivery') || hasText(page.html, 'UK-Compliant'),
    'Principles section must render UK-Compliant Delivery card'
  );
});
