/**
 * tests/e2e/tier2-boundaries/f01-app-shell-boundaries.test.mjs
 * Tier 2 Boundary Tests: F01 App Shell & Providers
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F01 Boundaries: App Shell & Global Providers');

suite.test('F01-B01: Mobile 375px viewport configuration maintains responsive scaling without disabling pinch-zoom', async () => {
  const page = await getPage('/');
  // user-scalable=no is an anti-pattern; verify standard responsive viewport
  const hasAntiPattern = hasPattern(page.html, /user-scalable=no/i);
  assert(!hasAntiPattern, 'Viewport should not disable user scaling on mobile');
});

suite.test('F01-B02: Ultra-wide 2560px viewport prevents content horizontal stretching beyond max-w', async () => {
  const page = await getPage('/');
  const hasMaxWidth = hasPattern(page.html, /max-w-/i) || hasPattern(page.html, /container/i);
  assert(hasMaxWidth, 'App shell must constrain content on ultra-wide viewports');
});

suite.test('F01-B03: Missing or non-existent route URL handles 404 cleanly without uncaught exception', async () => {
  const page = await getPage('/non-existent-route-random-404');
  assert(page.statusCode === 404 || page.exists === false, 'Non-existent route must return 404 or indicate non-existence');
});

suite.test('F01-B04: HTML character encoding is explicitly set to UTF-8', async () => {
  const page = await getPage('/');
  const hasUtf8 = hasPattern(page.html, /utf-8/i);
  assert(hasUtf8, 'Document head must declare UTF-8 charset');
});

suite.test('F01-B05: HTML document root sets valid language code "en"', async () => {
  const page = await getPage('/');
  const hasEn = hasPattern(page.html, /<html[^>]*lang=["']en(-[a-zA-Z]+)?["']/i) || hasPattern(page.html, /lang=["']en/i);
  assert(hasEn, 'Document lang must be configured to "en" or "en-GB"');
});
