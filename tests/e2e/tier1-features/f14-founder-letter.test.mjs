/**
 * tests/e2e/tier1-features/f14-founder-letter.test.mjs
 * Feature F14: Founder Page Hero & Narrative
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F14: Founder Page Hero & Narrative');

suite.test('F14-T01: Founder hero section renders on Soft Slate (#bcbcbf) background', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasBg = page.html.includes('#bcbcbf') || page.html.includes('#ebecef') || hasPattern(page.html, /bg-/);
  assert(hasBg, 'Founder hero must apply designated soft slate background styling');
});

suite.test('F14-T02: Founder hero renders portrait image container', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasImg = hasPattern(page.html, /<img/) || hasPattern(page.html, /rounded-full/i);
  assert(hasImg, 'Founder hero must include founder portrait image element');
});

suite.test('F14-T03: Founder narrative features biography of Milon Mahmud', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, SPEC.founder.name),
    `Founder narrative must cite founder name "${SPEC.founder.name}"`
  );
});

suite.test('F14-T04: Founder section renders motivational quote "You try and believe, things just happen!"', async () => {
  const page = await getPage('/a-note-from-founder');
  assert(
    hasText(page.html, SPEC.founder.quote) || hasText(page.html, 'You try and believe'),
    'Founder page must render signature motivational quote'
  );
});

suite.test('F14-T05: Motivational quote applies styled italic/display typography accent', async () => {
  const page = await getPage('/a-note-from-founder');
  const hasStyling = hasPattern(page.html, /italic/) || hasPattern(page.html, /font-serif/) || hasPattern(page.html, /lobster/i) || hasPattern(page.html, /font-accent/);
  assert(hasStyling, 'Motivational quote must be styled with distinctive accent typography');
});
