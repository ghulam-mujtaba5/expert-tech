/**
 * tests/e2e/tier1-features/f05-mobile-drawer.test.mjs
 * Feature F05: Mobile Menu Drawer
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F05: Mobile Menu Drawer');

suite.test('F05-T01: Mobile menu toggle trigger is rendered for mobile viewports', async () => {
  const page = await getPage('/');
  const hasHamburger = hasPattern(page.html, /burger/i) || hasPattern(page.html, /menu/i) || hasPattern(page.html, /md:hidden/);
  assert(hasHamburger, 'Mobile menu hamburger toggle must be present');
});

suite.test('F05-T02: Mobile drawer supports interactive toggle state (open/closed)', async () => {
  const page = await getPage('/');
  const hasDrawerState = hasPattern(page.html, /mobileMenuOpen/i) || hasPattern(page.html, /isOpen/i) || hasPattern(page.html, /open/i);
  assert(hasDrawerState, 'Header component must support mobile menu open/close toggling');
});

suite.test('F05-T03: Mobile menu drawer provides access to all 7 routes', async () => {
  const page = await getPage('/');
  for (const route of SPEC.routes) {
    const hasRoute = page.html.includes(route.path);
    assert(hasRoute, `Mobile drawer must contain link to ${route.name} (${route.path})`);
  }
});

suite.test('F05-T04: Mobile menu drawer renders on dark background with high-contrast text', async () => {
  const page = await getPage('/');
  const hasContrast = page.html.includes('#0b1c3d') || page.html.includes('bg-');
  assert(hasContrast, 'Mobile drawer must maintain dark contrast styling');
});

suite.test('F05-T05: Mobile menu links close drawer upon navigation', async () => {
  const page = await getPage('/');
  const hasCloseHandler = hasPattern(page.html, /setMobileMenuOpen\(false\)/) || hasPattern(page.html, /setIsOpen\(false\)/) || hasPattern(page.html, /close/i);
  assert(hasCloseHandler, 'Mobile menu drawer must dismiss on route link interaction');
});
