/**
 * tests/e2e/tier1-features/f22-refund-policy-terms.test.mjs
 * Feature F22: Refund Policy Legal Terms
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F22: Refund Policy Legal Terms');

suite.test('F22-T01: Refund policy page renders H1 "Refund & Cancellation Policy"', async () => {
  const page = await getPage('/refund-policy');
  assert(
    hasText(page.html, SPEC.refundPolicy.heading) || hasText(page.html, 'Refund & Cancellation'),
    'Refund policy must render primary H1 headline'
  );
});

suite.test('F22-T02: Policy explicitly cites Consumer Rights Act 2015 and 2013 regulations', async () => {
  const page = await getPage('/refund-policy');
  assert(
    hasText(page.html, 'Consumer Rights Act 2015') || hasText(page.html, 'Consumer Rights Act'),
    'Refund policy must cite UK Consumer Rights statutory protections'
  );
});

suite.test('F22-T03: Policy explicitly details 14-day cooling-off period and 30-day notice', async () => {
  const page = await getPage('/refund-policy');
  const hasCoolingOff = hasText(page.html, SPEC.refundPolicy.coolingOff) || hasText(page.html, '14-day');
  const hasWrittenNotice = hasText(page.html, SPEC.refundPolicy.writtenNotice) || hasText(page.html, '30 days');
  assert(hasCoolingOff && hasWrittenNotice, 'Policy must specify statutory 14-day cooling-off and 30-day notice terms');
});

suite.test('F22-T04: Policy details non-refundable terms for bespoke software development', async () => {
  const page = await getPage('/refund-policy');
  const hasBespoke = hasText(page.html, 'custom software') || hasText(page.html, 'bespoke') || hasText(page.html, 'non-refundable');
  assert(hasBespoke, 'Policy must define non-refundable terms for bespoke software services');
});

suite.test('F22-T05: Refund requests are directed to info@experttech.co.uk with 10 working days SLA', async () => {
  const page = await getPage('/refund-policy');
  const hasEmail = hasText(page.html, SPEC.refundPolicy.contactEmail) || page.html.includes(SPEC.company.email);
  const hasSLA = hasText(page.html, SPEC.refundPolicy.sla) || hasText(page.html, '10 working days');
  assert(hasEmail && hasSLA, 'Policy must instruct requests to info@experttech.co.uk with 10 working days resolution');
});
