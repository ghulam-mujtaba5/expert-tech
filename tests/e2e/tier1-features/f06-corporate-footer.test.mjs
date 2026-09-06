/**
 * tests/e2e/tier1-features/f06-corporate-footer.test.mjs
 * Feature F06: Global Corporate Footer
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F06: Global Corporate Footer');

suite.test('F06-T01: Footer renders brand name Expert Tech and core tagline', async () => {
  const page = await getPage('/');
  assert(hasText(page.html, SPEC.company.name), 'Footer must render Expert Tech brand title');
  const hasTagline = hasPattern(page.html, /proactive/i) || hasPattern(page.html, /software/i);
  assert(hasTagline, 'Footer must render business tagline');
});

suite.test('F06-T02: Footer renders top decorative royal blue (#2f80ed) accent bar', async () => {
  const page = await getPage('/');
  const hasBar = page.html.includes('#2f80ed') || hasPattern(page.html, /h-\[3px\]/) || hasPattern(page.html, /h-1/);
  assert(hasBar, 'Footer must include royal blue decorative top bar');
});

suite.test('F06-T03: Footer renders Get in Touch section with active mailto link', async () => {
  const page = await getPage('/');
  const hasEmail = page.html.includes(`mailto:${SPEC.company.email}`) || page.html.includes(SPEC.company.email);
  assert(hasEmail, `Footer must provide active link to ${SPEC.company.email}`);
});

suite.test('F06-T04: Footer renders active tel link to +447565322806', async () => {
  const page = await getPage('/');
  assert(page.html.includes(SPEC.company.telLink), 'Footer must provide active tel:+447565322806 link');
});

suite.test('F06-T05: Footer renders Scottish registered address and copyright notice', async () => {
  const page = await getPage('/');
  const hasTown = page.html.includes(SPEC.company.address.town);
  const hasPostcode = page.html.includes(SPEC.company.address.postcode);
  const hasJurisdiction = hasPattern(page.html, /Registered in Scotland/i);
  assert(hasTown && hasPostcode && hasJurisdiction, 'Footer must render Cowdenbeath Scottish registered address and legal notice');
});
