/**
 * tests/e2e/tier2-boundaries/f03-brand-config-boundaries.test.mjs
 * Tier 2 Boundary Tests: F03 Brand Config
 */

import assert from 'node:assert/strict';
import { createTestSuite, SPEC, isValidPhone, isValidEmail } from '../test-helper.mjs';

export const suite = createTestSuite('F03 Boundaries: Brand Config');

suite.test('F03-B01: Primary telephone adheres strictly to E.164 international format (+447565322806)', async () => {
  assert(isValidPhone(SPEC.company.phone), 'Telephone must validate under UK international E.164 phone format');
  assert(!/[a-zA-Z]/.test(SPEC.company.phone), 'Telephone must not contain alpha characters');
});

suite.test('F03-B02: Scottish postcode strictly satisfies UK alphanumeric postcode pattern (KY4 9QE)', async () => {
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  assert(ukPostcodeRegex.test(SPEC.company.address.postcode), 'Postcode must match official UK postal code standard');
});

suite.test('F03-B03: Company email adheres to valid RFC-5322 syntax without whitespace', async () => {
  assert(isValidEmail(SPEC.company.email), 'Primary email info@experttech.co.uk must be valid RFC-5322 address');
  assert(!SPEC.company.email.includes(' '), 'Email must not contain whitespace');
});

suite.test('F03-B04: Brand name string is non-empty, trimmed, and exact ("Expert Tech")', async () => {
  assert.equal(SPEC.company.name, 'Expert Tech');
  assert.equal(SPEC.company.name.trim(), 'Expert Tech');
});

suite.test('F03-B05: Brand sanitation regex rejects any permutation of "Elvarix" or legacy Glasgow address', async () => {
  assert(!SPEC.company.forbiddenBrand.test(SPEC.company.name), 'Brand name must not match forbidden brand');
  assert(!SPEC.company.forbiddenBrand.test(SPEC.company.email), 'Email must not match forbidden brand');
  assert(!SPEC.company.forbiddenBrand.test(SPEC.company.address.full), 'Address must not match forbidden brand');
  assert(!SPEC.company.address.full.includes('Glasgow'), 'Address must not reference former Glasgow address');
});
