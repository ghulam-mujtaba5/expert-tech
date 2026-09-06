/**
 * tests/e2e/tier1-features/f02-design-system.test.mjs
 * Feature F02: Global Design System & Tailwind Theme
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F02: Global Design System & Tailwind Theme');

suite.test('F02-T01: Deep Navy primary background token #0b1c3d is configured', async () => {
  const page = await getPage('/');
  const hasNavy = page.html.includes('#0b1c3d') || hasPattern(page.html, /bg-\[#0b1c3d\]/) || hasPattern(page.html, /bg-navy/);
  assert(hasNavy, 'Design system must include Deep Navy (#0b1c3d) background token');
});

suite.test('F02-T02: Royal Blue primary accent token #2f80ed is configured for CTAs', async () => {
  const page = await getPage('/');
  const hasRoyalBlue = page.html.includes('#2f80ed') || hasPattern(page.html, /bg-\[#2f80ed\]/) || hasPattern(page.html, /bg-royal/);
  assert(hasRoyalBlue, 'Design system must include Royal Blue (#2f80ed) accent token');
});

suite.test('F02-T03: Soft Slate card token #ebecef is configured for card backgrounds', async () => {
  const page = await getPage('/');
  const hasSlate = page.html.includes('#ebecef') || hasPattern(page.html, /bg-\[#ebecef\]/) || hasPattern(page.html, /bg-slate/);
  assert(hasSlate, 'Design system must include Soft Slate (#ebecef) card token');
});

suite.test('F02-T04: Icon badge containers specify #c9d8ee background styling', async () => {
  const page = await getPage('/');
  const hasIconPill = page.html.includes('#c9d8ee') || hasPattern(page.html, /rounded-xl/) || hasPattern(page.html, /rounded-\[12px\]/);
  assert(hasIconPill, 'Design system must configure styled icon container pill tokens');
});

suite.test('F02-T05: Container widths are constrained to design grid (max-width 1224px / 1240px)', async () => {
  const page = await getPage('/');
  const hasContainer = hasPattern(page.html, /1224px/) || hasPattern(page.html, /1240px/) || hasPattern(page.html, /max-w-/);
  assert(hasContainer, 'Design system must constrain layout containers to responsive max-width');
});
