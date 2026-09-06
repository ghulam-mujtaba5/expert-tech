/**
 * tests/e2e/tier2-boundaries/f22-refund-policy-terms-boundaries.test.mjs
 * Tier 2 Boundary Tests: F22 Refund Policy Legal Terms
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F22 Boundaries: Refund Policy Legal Terms');

suite.test('F22-B01: Policy strictly references both Consumer Rights Act 2015 and Consumer Contracts Regulations 2013', async () => {
  const page = await getPage('/refund-policy');
  const hasAct = hasText(page.html, 'Consumer Rights Act 2015');
  const hasRegs = hasText(page.html, 'Consumer Contracts Regulations 2013');
  assert(hasAct && hasRegs, 'Policy must cite both statutory instruments');
});

suite.test('F22-B02: Policy explicitly specifies 14 calendar days cooling-off duration', async () => {
  const page = await getPage('/refund-policy');
  const has14Days = hasText(page.html, '14-day') || hasText(page.html, '14 days');
  assert(has14Days, 'Policy must specify 14-day duration');
});

suite.test('F22-B03: Policy specifies 30 days written notice for monthly recurring contracts', async () => {
  const page = await getPage('/refund-policy');
  const has30Days = hasText(page.html, '30 days');
  assert(has30Days, 'Policy must specify 30 days written notice');
});

suite.test('F22-B04: Policy defines 10 working days SLA window for refund processing', async () => {
  const page = await getPage('/refund-policy');
  const has10WorkingDays = hasText(page.html, '10 working days');
  assert(has10WorkingDays, 'Policy must state 10 working days SLA window');
});

suite.test('F22-B05: Policy verifies official refund inbox info@experttech.co.uk and zero legacy emails', async () => {
  const page = await getPage('/refund-policy');
  const hasOfficialEmail = page.html.includes(SPEC.company.email);
  const hasNoLegacyEmail = !page.html.toLowerCase().includes('elvarix');
  assert(hasOfficialEmail && hasNoLegacyEmail, 'Policy must use info@experttech.co.uk without legacy addresses');
});
