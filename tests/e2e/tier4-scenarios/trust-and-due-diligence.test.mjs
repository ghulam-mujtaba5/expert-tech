/**
 * tests/e2e/tier4-scenarios/trust-and-due-diligence.test.mjs
 * Tier 4 Scenario 5: Enterprise Trust & Due Diligence Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Enterprise Trust & Due Diligence');

suite.test('T4-SCN09: Journey: Enterprise buyer audits Founder letter, core philosophy, and UK-compliant delivery principles', async () => {
  // Step 1: Buyer navigates to Founder note
  const founder = await getPage('/a-note-from-founder');
  assert(founder.statusCode === 200 || founder.exists, 'Step 1: Founder note loads');

  // Step 2: Buyer reads founder personal story and signature quote
  assert(hasText(founder.html, SPEC.founder.name), 'Step 2a: Buyer notes founder Milon Mahmud');
  assert(hasText(founder.html, 'You try and believe'), 'Step 2b: Buyer reviews founder quote');

  // Step 3: Buyer verifies core operating principles
  for (const principle of SPEC.founder.principles) {
    assert(hasText(founder.html, principle.split(' ')[0]), `Step 3: Buyer verifies principle ${principle}`);
  }
});

suite.test('T4-SCN10: Journey: Buyer conducts cross-page address check verifying Scottish headquarters across footer, reviews, and contact', async () => {
  const routesToCheck = ['/', '/contact', '/reviews'];
  for (const route of routesToCheck) {
    const page = await getPage(route);
    const hasScotland = page.html.includes('Scotland') || page.html.includes('Cowdenbeath');
    assert(hasScotland, `Buyer verifies official Scottish presence on route ${route}`);
  }
});
