/**
 * tests/e2e/tier3-combinations/brand-consistency.test.mjs
 * Tier 3 Cross-Feature Combination Tests: Brand & Contact Consistency across all routes
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T3: Brand & Contact Consistency across Routes');

suite.test('T3-BRD01: Company name "Expert Tech" is present consistently across all 7 routes', async () => {
  for (const route of SPEC.routes) {
    const page = await getPage(route.path);
    assert(hasText(page.html, SPEC.company.name), `Route ${route.path} must contain brand "${SPEC.company.name}"`);
  }
});

suite.test('T3-BRD02: Primary telephone +447565322806 is present on every route via layout or content', async () => {
  for (const route of SPEC.routes) {
    const page = await getPage(route.path);
    const hasPhone = page.html.includes(SPEC.company.phone) || page.html.includes(SPEC.company.phoneFormatted);
    assert(hasPhone, `Route ${route.path} must contain telephone ${SPEC.company.phone}`);
  }
});

suite.test('T3-BRD03: Registered Scottish address is rendered consistently across all page views', async () => {
  for (const route of SPEC.routes) {
    const page = await getPage(route.path);
    const hasAddress = page.html.includes('Cowdenbeath') || page.html.includes('Scotland') || page.html.includes('KY4 9QE');
    assert(hasAddress, `Route ${route.path} must render Scottish address elements`);
  }
});

suite.test('T3-BRD04: Corporate email info@experttech.co.uk is wired across all page footers', async () => {
  for (const route of SPEC.routes) {
    const page = await getPage(route.path);
    const hasEmail = page.html.includes(SPEC.company.email);
    assert(hasEmail, `Route ${route.path} must contain email ${SPEC.company.email}`);
  }
});

suite.test('T3-BRD05: Strict 0 occurrences of "Elvarix" across all 7 routes simultaneously', async () => {
  for (const route of SPEC.routes) {
    const page = await getPage(route.path);
    const match = page.html.match(SPEC.company.forbiddenBrand);
    assert(!match, `Route ${route.path} violates brand cleanliness: Found "${match?.[0]}"`);
  }
});
