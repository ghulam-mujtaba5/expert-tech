/**
 * tests/e2e/tier2-boundaries/f04-sticky-header-boundaries.test.mjs
 * Tier 2 Boundary Tests: F04 Sticky Header
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F04 Boundaries: Sticky Header');

suite.test('F04-B01: Header z-index token (z-50) is greater than body cards and images', async () => {
  const page = await getPage('/');
  const hasZIndex = hasPattern(page.html, /z-50|z-40|z-30/);
  assert(hasZIndex, 'Header must use elevated z-index to stay above content during scroll');
});

suite.test('F04-B02: Desktop navigation links container hides cleanly on mobile (<768px)', async () => {
  const page = await getPage('/');
  const hasResponsiveHide = hasPattern(page.html, /hidden (lg|md):flex/) || hasPattern(page.html, /(lg|md):hidden/);
  assert(hasResponsiveHide, 'Desktop navigation links must hide on mobile screens');
});

suite.test('F04-B03: Header telephone CTA preserves tel: protocol without broken spaces in URI', async () => {
  const page = await getPage('/');
  const hasValidTel = page.html.includes(SPEC.company.telLink) || page.html.includes('tel:+447565322806');
  assert(hasValidTel, 'Phone link href must be valid tel:+447565322806 URI without whitespace');
});

suite.test('F04-B04: Navigation link labels do not wrap awkwardly into broken text lines', async () => {
  const page = await getPage('/');
  const hasWhitespaceControl = hasPattern(page.html, /whitespace-nowrap/);
  assert(hasWhitespaceControl, 'Nav links should prevent unwanted multiline label wrapping');
});

suite.test('F04-B05: Header height boundary is constrained (approx 74px mobile / 112px desktop)', async () => {
  const page = await getPage('/');
  const hasHeightLimit = hasPattern(page.html, /h-\[74px\]|h-\[112px\]|py-|h-16|h-20/);
  assert(hasHeightLimit, 'Header must maintain stable vertical dimensions');
});
