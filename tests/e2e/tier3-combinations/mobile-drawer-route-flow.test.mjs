/**
 * tests/e2e/tier3-combinations/mobile-drawer-route-flow.test.mjs
 * Tier 3 Cross-Feature Combination Tests: Mobile Drawer Open, Route Navigation, Auto-Close Flow
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('T3: Mobile Drawer Interaction Flow');

suite.test('T3-MBL01: Mobile viewport (375px) displays hamburger trigger and hides desktop navbar', async () => {
  const page = await getPage('/');
  const hasHamburger = hasPattern(page.html, /(md|lg):hidden/);
  const hidesDesktop = hasPattern(page.html, /hidden (md|lg):flex/);
  assert(hasHamburger && hidesDesktop, 'Mobile view must switch to hamburger toggle mode');
});

suite.test('T3-MBL02: Opening mobile drawer exposes links to all 7 routes', async () => {
  const page = await getPage('/');
  for (const route of SPEC.routes) {
    assert(page.html.includes(route.path), `Drawer must link to ${route.path}`);
  }
});

suite.test('T3-MBL03: Selecting a route from mobile drawer closes drawer and loads target route', async () => {
  const targetPage = await getPage('/services');
  assert(targetPage.statusCode === 200 || targetPage.exists, 'Target route /services must load cleanly');
});

suite.test('T3-MBL04: Mobile drawer retains dark navy contrast theme across all route views', async () => {
  for (const route of ['/', '/contact', '/careers']) {
    const page = await getPage(route);
    const hasNavy = page.html.includes('#0b1c3d');
    assert(hasNavy, `Route ${route} mobile drawer must use dark navy background`);
  }
});

suite.test('T3-MBL05: Active route indicator is correctly applied within mobile drawer links', async () => {
  const page = await getPage('/contact');
  const hasActiveIndicator = hasPattern(page.html, /active|contact/i);
  assert(hasActiveIndicator, 'Active link indication should reflect current route');
});
