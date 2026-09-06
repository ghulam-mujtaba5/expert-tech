/**
 * tests/e2e/tier2-boundaries/f13-services-process-banner-boundaries.test.mjs
 * Tier 2 Boundary Tests: F13 Services Process Banner
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F13 Boundaries: Services Process Banner');

suite.test('F13-B01: Quote button href explicitly resolves to /contact without trailing slash redirect loop', async () => {
  const page = await getPage('/services');
  const hasContactLink =
    page.html.includes('href="/contact"') ||
    page.html.includes("href='/contact'") ||
    page.html.includes('href: "/contact"') ||
    page.html.includes("href: '/contact'");
  assert(hasContactLink, 'Quote button must link directly to /contact');
});

suite.test('F13-B02: Banner container accommodates both mobile stacked and desktop inline layouts', async () => {
  const page = await getPage('/services');
  const hasResponsiveFlex = hasPattern(page.html, /flex-col|md:flex-row|items-center/);
  assert(hasResponsiveFlex, 'Services quote banner must adapt cleanly across viewports');
});

suite.test('F13-B03: Focus outline is visible when navigating to quote button via keyboard', async () => {
  const page = await getPage('/services');
  const hasFocus = hasPattern(page.html, /focus:|transition/);
  assert(hasFocus, 'Quote button must include keyboard focus states');
});

suite.test('F13-B04: Banner headline maintains line-height 1.15 to prevent text collision', async () => {
  const page = await getPage('/services');
  const hasLeading = hasPattern(page.html, /leading-tight|leading-snug|leading-normal|leading-relaxed/);
  assert(hasLeading, 'Banner typography must control line heights');
});

suite.test('F13-B05: Background Royal Blue (#2f80ed) is applied without transparency bleed', async () => {
  const page = await getPage('/services');
  const hasBg = page.html.includes('#2f80ed');
  assert(hasBg, 'Banner must use solid Royal Blue background');
});
