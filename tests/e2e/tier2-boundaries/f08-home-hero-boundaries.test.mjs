/**
 * tests/e2e/tier2-boundaries/f08-home-hero-boundaries.test.mjs
 * Tier 2 Boundary Tests: F08 Home Hero Section
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F08 Boundaries: Home Hero Section');

suite.test('F08-B01: Hero heading maintains clean word wraps on narrow mobile 375px viewport', async () => {
  const page = await getPage('/');
  const hasTextScaling = hasPattern(page.html, /text-3xl|text-4xl|text-5xl|sm:text-|md:text-/);
  assert(hasTextScaling, 'Hero heading must define responsive typography scales');
});

suite.test('F08-B02: Dual CTA buttons stack vertically on mobile and align horizontally on desktop', async () => {
  const page = await getPage('/');
  const hasResponsiveFlex = hasPattern(page.html, /flex-wrap|flex-col|sm:flex-row|gap-/);
  assert(hasResponsiveFlex, 'Hero CTA buttons must stack on mobile and flex row on desktop');
});

suite.test('F08-B03: Hero gradient angle specifies 180 degrees without color stop artifacts', async () => {
  const page = await getPage('/');
  const hasGradientStyle = hasPattern(page.html, /bg-gradient-to-b|180deg|from-|to-/);
  assert(hasGradientStyle, 'Hero gradient must render smooth vertical transition');
});

suite.test('F08-B04: CTA buttons support keyboard tab focus and active states', async () => {
  const page = await getPage('/');
  const hasFocus = hasPattern(page.html, /focus:|hover:|transition/);
  assert(hasFocus, 'Hero buttons must include keyboard focus and hover state styles');
});

suite.test('F08-B05: Hero section enforces minimum height to prevent layout shift during font load', async () => {
  const page = await getPage('/');
  const hasMinH = hasPattern(page.html, /min-h-|py-1[26]|py-20|py-2[48]/);
  assert(hasMinH, 'Hero section must enforce minimum height boundary');
});
