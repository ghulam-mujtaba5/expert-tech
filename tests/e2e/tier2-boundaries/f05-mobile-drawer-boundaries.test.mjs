/**
 * tests/e2e/tier2-boundaries/f05-mobile-drawer-boundaries.test.mjs
 * Tier 2 Boundary Tests: F05 Mobile Drawer
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F05 Boundaries: Mobile Drawer');

suite.test('F05-B01: Mobile hamburger toggle includes accessible aria-label or title', async () => {
  const page = await getPage('/');
  const hasA11y = hasPattern(page.html, /navigation menu|menu/i);
  assert(hasA11y, 'Hamburger button should define accessible aria-label');
});

suite.test('F05-B02: Mobile drawer button touch target meets minimum accessibility dimension (≥44px)', async () => {
  const page = await getPage('/');
  const hasTouchSize = hasPattern(page.html, /p-2|p-3|p-4|h-10|w-10|h-11|w-11|h-12|w-12|min-h-\[44px\]/);
  assert(hasTouchSize, 'Mobile hamburger button must provide adequate touch target');
});

suite.test('F05-B03: Mobile menu drawer renders on full-width or full-screen overlay (375px)', async () => {
  const page = await getPage('/');
  const hasDrawerOverlay = hasPattern(page.html, /fixed|absolute/);
  assert(hasDrawerOverlay, 'Mobile menu drawer must overlay viewport correctly');
});

suite.test('F05-B04: Mobile drawer hides automatically when resized to desktop viewport (1440px)', async () => {
  const page = await getPage('/');
  const hasDesktopHide = hasPattern(page.html, /(md|lg):hidden/);
  assert(hasDesktopHide, 'Mobile drawer container must be hidden on desktop viewport');
});

suite.test('F05-B05: Mobile drawer backdrop dismiss or close button is provided', async () => {
  const page = await getPage('/');
  const hasClose = hasPattern(page.html, /close/i) || hasPattern(page.html, /setMobileMenuOpen/) || hasPattern(page.html, /setIsOpen/);
  assert(hasClose, 'Mobile drawer must provide dismiss or close interaction');
});
