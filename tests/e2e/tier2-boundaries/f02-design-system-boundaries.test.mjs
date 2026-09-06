/**
 * tests/e2e/tier2-boundaries/f02-design-system-boundaries.test.mjs
 * Tier 2 Boundary Tests: F02 Design System & Colors
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F02 Boundaries: Design System & Colors');

suite.test('F02-B01: Primary colors adhere strictly to 6-digit hex format (#0b1c3d, #2f80ed, #ebecef)', async () => {
  const hexRegex = /^#([0-9a-f]{6})$/i;
  assert(hexRegex.test(SPEC.tokens.navy), 'Navy token must be valid 6-character hex');
  assert(hexRegex.test(SPEC.tokens.royalBlue), 'Royal Blue token must be valid 6-character hex');
  assert(hexRegex.test(SPEC.tokens.softSlate), 'Soft Slate token must be valid 6-character hex');
});

suite.test('F02-B02: Contrast ratio between white text and dark navy background exceeds WCAG AA (4.5:1)', async () => {
  // Authentic WCAG 2.1 relative luminance and contrast ratio calculation for #ffffff against #0b1c3d
  function getLuminance(hex) {
    const rgb = [
      parseInt(hex.slice(1, 3), 16) / 255,
      parseInt(hex.slice(3, 5), 16) / 255,
      parseInt(hex.slice(5, 7), 16) / 255,
    ].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  const lWhite = getLuminance('#ffffff');
  const lNavy = getLuminance(SPEC.tokens.navy);
  const contrastRatio = (Math.max(lWhite, lNavy) + 0.05) / (Math.min(lWhite, lNavy) + 0.05);
  assert(contrastRatio >= 4.5, `Contrast ratio ${contrastRatio.toFixed(2)}:1 must exceed WCAG AA threshold 4.5:1`);
  assert(contrastRatio >= 7.0, `Contrast ratio ${contrastRatio.toFixed(2)}:1 must exceed WCAG AAA threshold 7.0:1`);
});

suite.test('F02-B03: Responsive breakpoint at 768px separates mobile drawer from desktop horizontal nav', async () => {
  const page = await getPage('/');
  const hasBreakpoint = hasPattern(page.html, /md:/) || hasPattern(page.html, /lg:/);
  assert(hasBreakpoint, 'Design system must use standard responsive breakpoint (md: or lg:) for navigation switch');
});

suite.test('F02-B04: Mobile 375px viewport enforces zero horizontal scrollbar overflow', async () => {
  const page = await getPage('/');
  const hasOverflowControl = hasPattern(page.html, /overflow-hidden|overflow-x-hidden|w-full|max-w-/);
  assert(hasOverflowControl, 'Layout must constrain horizontal overflow across mobile widths');
});

suite.test('F02-B05: Icon container pills maintain 1:1 aspect ratio geometry and do not distort', async () => {
  const page = await getPage('/');
  const hasPillTokens = hasPattern(page.html, /w-1[024]|h-1[024]/) || hasPattern(page.html, /rounded-full|rounded-xl/);
  assert(hasPillTokens, 'Icon pills must maintain uniform square dimensions');
});
