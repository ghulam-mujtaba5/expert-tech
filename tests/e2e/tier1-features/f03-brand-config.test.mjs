/**
 * tests/e2e/tier1-features/f03-brand-config.test.mjs
 * Feature F03: Brand Constants Config (data/company.ts)
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F03: Brand Constants Config (data/company.ts)');

suite.test('F03-T01: Company name is explicitly defined as Expert Tech', async () => {
  const page = await getPage('/');
  assert(hasText(page.html, SPEC.company.name), `Expected brand name "${SPEC.company.name}"`);
});

suite.test('F03-T02: Primary telephone is defined as +447565322806', async () => {
  const page = await getPage('/');
  const hasPhone = page.html.includes(SPEC.company.phone) || page.html.includes(SPEC.company.phoneFormatted);
  assert(hasPhone, `Expected primary telephone ${SPEC.company.phone} to be present`);
});

suite.test('F03-T03: Tel link format is strictly tel:+447565322806', async () => {
  const page = await getPage('/');
  assert(page.html.includes(SPEC.company.telLink), `Expected clickable link "${SPEC.company.telLink}"`);
});

suite.test('F03-T04: Registered office address specifies Cowdenbeath, Scotland, KY4 9QE', async () => {
  const page = await getPage('/');
  const hasTown = page.html.includes(SPEC.company.address.town);
  const hasPostcode = page.html.includes(SPEC.company.address.postcode);
  assert(hasTown && hasPostcode, 'Company config must include Scottish address details');
});

suite.test('F03-T05: Company configuration contains zero occurrences of legacy brand "Elvarix"', async () => {
  const page = await getPage('/');
  const match = page.html.match(SPEC.company.forbiddenBrand);
  assert(!match, `Brand cleanliness violation: Found legacy brand "${match?.[0]}"`);
});
