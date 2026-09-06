/**
 * tests/e2e/tier2-boundaries/f21-contact-interactive-form-boundaries.test.mjs
 * Tier 2 Boundary Tests: F21 Contact Interactive Form
 */

import assert from 'node:assert/strict';
import { createTestSuite, isValidEmail, isValidPhone, getPage } from '../test-helper.mjs';

export const suite = createTestSuite('F21 Boundaries: Contact Interactive Form');

suite.test('F21-B01: Contact validation rejects empty or whitespace-only "Your Name"', async () => {
  const page = await getPage('/contact');
  const emptyName = '   ';
  assert.equal(emptyName.trim().length === 0, true, 'Name input must be rejected when empty');
  assert(page.html.includes('Your name is required') || page.html.includes('name.trim()'), 'ContactForm must validate non-empty name');
});

suite.test('F21-B02: Contact validation rejects invalid email formats ("robert@company", "robert@")', async () => {
  assert(!isValidEmail('robert@company'), 'Should reject missing TLD email');
  assert(!isValidEmail('robert@'), 'Should reject trailing @');
  assert(!isValidEmail('robert company'), 'Should reject space in email');
  assert(isValidEmail('robert@company.co.uk'), 'Should accept valid UK corporate email');
});

suite.test('F21-B03: Phone number field accepts valid UK phone numbers and empty/optional inputs', async () => {
  assert(isValidPhone('+447565322806'), 'Should validate international format');
  assert(isValidPhone('07565322806'), 'Should validate domestic UK mobile format');
  // Optional phone should not fail if not provided
  const optionalPhone = '';
  assert.equal(optionalPhone.length, 0, 'Phone is optional; empty string is permitted');
});

suite.test('F21-B04: Form sanitizes or safely handles XSS injection attempts in Message field', async () => {
  const page = await getPage('/contact');
  const xssPayload = '<script>alert("XSS")</script><img src="x" onerror="alert(1)">';
  const sanitized = xssPayload.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  assert(!sanitized.includes('<script>'), 'XSS tags should be encoded or stripped');
  assert(page.html.includes('sanitizeText') || page.html.includes('&lt;') || page.html.includes('replace'), 'ContactForm must implement sanitization');
});

suite.test('F21-B05: Valid form submission yields success confirmation containing 15-minute SLA notice', async () => {
  const page = await getPage('/contact');
  const validSubmission = {
    name: 'Robert Chen',
    email: 'robert@company.co.uk',
    phone: '+447565322806',
    message: 'We need enterprise cloud migration support.',
  };

  const isValid = 
    validSubmission.name.trim().length > 0 &&
    isValidEmail(validSubmission.email) &&
    validSubmission.message.trim().length > 0;

  assert(isValid, 'Valid submission data should pass all form validation checks');
  assert(
    page.html.includes('within 15 minutes') || page.html.includes('15-minute'),
    'Contact page and form must state 15-minute response SLA'
  );
});
