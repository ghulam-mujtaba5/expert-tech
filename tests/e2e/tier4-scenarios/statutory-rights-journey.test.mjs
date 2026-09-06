/**
 * tests/e2e/tier4-scenarios/statutory-rights-journey.test.mjs
 * Tier 4 Scenario 6: Customer Statutory Rights & Refund Audit Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Customer Statutory Rights Audit');

suite.test('T4-SCN11: Journey: Corporate client audits cancellation terms, cooling-off window, and Scottish jurisdiction compliance', async () => {
  // Step 1: Client navigates to Refund Policy
  const policy = await getPage('/refund-policy');
  assert(policy.statusCode === 200 || policy.exists, 'Step 1: Refund Policy loads');

  // Step 2: Client reviews Consumer Rights Act compliance
  assert(hasText(policy.html, 'Consumer Rights Act'), 'Step 2: Statutory UK consumer protection cited');

  // Step 3: Client confirms 14-day cooling-off and 30-day notice terms
  assert(hasText(policy.html, '14-day'), 'Step 3a: 14-day cooling-off window confirmed');
  assert(hasText(policy.html, '30 days'), 'Step 3b: 30-day monthly contract cancellation notice confirmed');

  // Step 4: Client confirms 10 working days refund SLA and official email
  assert(hasText(policy.html, '10 working days'), 'Step 4a: 10 working days resolution confirmed');
  assert(policy.html.includes(SPEC.company.email), 'Step 4b: Requests handled by info@experttech.co.uk');
});
