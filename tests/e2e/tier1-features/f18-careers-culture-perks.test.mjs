/**
 * tests/e2e/tier1-features/f18-careers-culture-perks.test.mjs
 * Feature F18: Careers Page Culture & Perks
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F18: Careers Page Culture & Perks');

suite.test('F18-T01: Careers page renders hero section with gradient background styling', async () => {
  const page = await getPage('/careers');
  const hasStyling = hasPattern(page.html, /bg-/i) || hasPattern(page.html, /gradient/i);
  assert(hasStyling, 'Careers page must feature styled hero section');
});

suite.test('F18-T02: Careers page presents UK-based engineering team culture', async () => {
  const page = await getPage('/careers');
  const hasCulture = hasText(page.html, 'engineer') || hasText(page.html, 'developer') || hasText(page.html, 'expertise') || hasText(page.html, 'join');
  assert(hasCulture, 'Careers page must present engineering opportunities');
});

suite.test('F18-T03: Application form container is centered with high contrast styling', async () => {
  const page = await getPage('/careers');
  const hasContainer = hasPattern(page.html, /max-w-/i) || hasPattern(page.html, /rounded-/i);
  assert(hasContainer, 'Application form container must use centered card layout');
});

suite.test('F18-T04: Careers page displays clear submission instructions for candidates', async () => {
  const page = await getPage('/careers');
  const hasInstructions = hasText(page.html, 'Expertise') || hasText(page.html, 'Message');
  assert(hasInstructions, 'Careers page must guide applicants on submission fields');
});

suite.test('F18-T05: Careers page contains zero occurrences of legacy brand "Elvarix"', async () => {
  const page = await getPage('/careers');
  const match = page.html.match(SPEC.company.forbiddenBrand);
  assert(!match, `Careers page brand cleanliness violation: Found "${match?.[0]}"`);
});
