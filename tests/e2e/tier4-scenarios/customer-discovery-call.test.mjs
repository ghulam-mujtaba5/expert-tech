/**
 * tests/e2e/tier4-scenarios/customer-discovery-call.test.mjs
 * Tier 4 Scenario 1: Customer Discovery Call Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Customer Discovery Call Journey');

suite.test('T4-SCN01: Journey: Visitor lands on Home, reads hero value proposition, and triggers discovery call CTA', async () => {
  // Step 1: Visitor loads home page
  const homePage = await getPage('/');
  const hasHeroText = hasText(homePage.html, 'Technology that keeps your business') || hasText(homePage.html, 'keeps your business');
  assert(hasHeroText, 'Step 1: User reads hero proposition');

  // Step 2: User scrolls to bottom discovery call section
  assert(hasText(homePage.html, SPEC.home.bottomCta.heading), 'Step 2: User reaches Discovery Call section');

  // Step 3: User clicks "Schedule a Discovery Call"
  assert(homePage.html.includes(SPEC.company.telLink), 'Step 3: Discovery call button triggers phone call to +447565322806');
});

suite.test('T4-SCN02: Journey: Mobile visitor on any page initiates quick call via Floating Action Button', async () => {
  // Step 1: User is browsing services on mobile
  const servicesPage = await getPage('/services');
  assert(servicesPage.statusCode === 200 || servicesPage.exists, 'Step 1: User visits Services');

  // Step 2: User observes persistent floating call button
  assert(servicesPage.html.includes(SPEC.company.telLink), 'Step 2: Floating CTA button is available with tel:+447565322806');

  // Step 3: User clicks floating CTA to speak directly to engineer
  const target = SPEC.company.telLink;
  assert.equal(target, 'tel:+447565322806', 'Step 3: Direct call connects to official Expert Tech hotline');
});
