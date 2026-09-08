/**
 * tests/e2e/tier4-scenarios/trust-and-due-diligence.test.mjs
 * Tier 4 Scenario 5: Enterprise Trust & Due Diligence Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Enterprise Trust & Due Diligence');

suite.test('T4-SCN10: Journey: Buyer conducts cross-page address check verifying Scottish headquarters across footer, reviews, and contact', async () => {
  const routesToCheck = ['/', '/contact', '/reviews'];
  for (const route of routesToCheck) {
    const page = await getPage(route);
    const hasScotland = page.html.includes('Scotland') || page.html.includes('Cowdenbeath');
    assert(hasScotland, `Buyer verifies official Scottish presence on route ${route}`);
  }
});
