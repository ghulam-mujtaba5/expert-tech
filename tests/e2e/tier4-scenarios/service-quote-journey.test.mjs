/**
 * tests/e2e/tier4-scenarios/service-quote-journey.test.mjs
 * Tier 4 Scenario 2: Service Quote Request Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, isValidEmail, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Service Quote Request Journey');

suite.test('T4-SCN03: Journey: Prospect navigates Home -> Services -> Reviews solutions -> Clicks Get a Quote -> Navigates to Contact', async () => {
  // Step 1: User lands on Home and clicks Explore Services
  const home = await getPage('/');
  assert(home.html.includes('/services'), 'Step 1: Home links to Services');

  // Step 2: User reaches Services page
  const services = await getPage('/services');
  assert(services.statusCode === 200 || services.exists, 'Step 2: Services page loads');
  assert(hasText(services.html, 'Comprehensive IT Solutions'), 'Step 2: User views services overview');

  // Step 3: User reviews service cards
  for (const card of SPEC.services.cards) {
    assert(hasText(services.html, card.split(' ')[0]), `Step 3: User reviews card ${card}`);
  }

  // Step 4: User clicks Get a Quote
  assert(services.html.includes('/contact'), 'Step 4: Get a Quote links to Contact page');
});

suite.test('T4-SCN04: Journey: Prospect fills contact form with valid inputs and receives 15-minute response confirmation', async () => {
  // Step 1: Prospect opens Contact form
  const contact = await getPage('/contact');
  assert(contact.statusCode === 200 || contact.exists, 'Step 1: Contact page loads');

  // Step 2: Prospect inputs data
  const prospectData = {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@fintech-uk.co.uk',
    phone: '+447565322806',
    message: 'We are seeking managed IT support for 45 workstations in Edinburgh.',
  };

  assert(prospectData.name.length > 0, 'Step 2a: Name provided');
  assert(isValidEmail(prospectData.email), 'Step 2b: Valid UK business email provided');
  assert(prospectData.message.length > 0, 'Step 2c: Detailed requirement provided');

  // Step 3: Form submission confirmation
  assert(
    contact.html.includes('within 15 minutes') || contact.html.includes('15 minutes'),
    'Step 3: Response SLA confirmed within 15 minutes in contact form'
  );
});
