/**
 * tests/e2e/tier1-features/f04-sticky-header.test.mjs
 * Feature F04: Sticky Navigation Header
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F04: Sticky Navigation Header');

suite.test('F04-T01: Navigation header is sticky positioned at top:0 with dark navy background', async () => {
  const page = await getPage('/');
  const hasSticky = hasPattern(page.html, /sticky/i) || hasPattern(page.html, /fixed/i);
  assert(hasSticky, 'Header must use sticky/fixed top positioning');
});

suite.test('F04-T02: Header logo links to root home page (/)', async () => {
  const page = await getPage('/');
  const hasRootLink = hasPattern(page.html, /href=["']\/["']/);
  assert(hasRootLink, 'Header logo/brand title must link to "/"');
});

suite.test('F04-T03: Header contains all 7 canonical navigation routes', async () => {
  const page = await getPage('/');
  for (const route of SPEC.routes) {
    const hasRoute = page.html.includes(`href="${route.path}"`) || page.html.includes(`href='${route.path}'`) || hasText(page.html, route.name);
    assert(hasRoute, `Header must include navigation to ${route.name} (${route.path})`);
  }
});

suite.test('F04-T04: Header supports active route indication for current page', async () => {
  const page = await getPage('/services');
  const hasActiveStyling = hasPattern(page.html, /isActive/i) || hasPattern(page.html, /pathname/i) || hasPattern(page.html, /text-\[#2f80ed\]/);
  assert(hasActiveStyling, 'Header must implement active route indicator logic');
});

suite.test('F04-T05: Header includes direct telephone contact CTA button', async () => {
  const page = await getPage('/');
  const hasPhoneLink = page.html.includes(SPEC.company.telLink) || page.html.includes(SPEC.company.phone);
  assert(hasPhoneLink, 'Header must feature quick phone action linking to +447565322806');
});
