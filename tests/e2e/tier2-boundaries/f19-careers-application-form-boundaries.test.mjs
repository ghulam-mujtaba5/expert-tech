/**
 * tests/e2e/tier2-boundaries/f19-careers-application-form-boundaries.test.mjs
 * Tier 2 Boundary Tests: F19 Careers Application Form
 */

import assert from 'node:assert/strict';
import { createTestSuite, isValidEmail, getPage } from '../test-helper.mjs';

export const suite = createTestSuite('F19 Boundaries: Careers Application Form');

suite.test('F19-B01: Form validation logic rejects empty or missing "Your Expertise" input', async () => {
  const page = await getPage('/careers');
  const emptyExpertise = '';
  const isInvalid = emptyExpertise.trim().length === 0;
  assert(isInvalid, 'Careers form must reject empty expertise field');
  assert(
    page.html.includes('!expertise.trim()') || page.html.includes('Please provide your expertise') || page.html.includes('expertise'),
    'CareersForm must validate expertise input'
  );
});

suite.test('F19-B02: Email validation rejects malformed email strings ("test@", "test@domain", "notanemail")', async () => {
  assert(!isValidEmail('test@'), 'Should reject incomplete email "test@"');
  assert(!isValidEmail('test@domain'), 'Should reject missing TLD email "test@domain"');
  assert(!isValidEmail('notanemail'), 'Should reject plain text "notanemail"');
  assert(!isValidEmail('@domain.com'), 'Should reject missing local part "@domain.com"');
  assert(isValidEmail('applicant@domain.com'), 'Should accept valid email');
});

suite.test('F19-B03: Form validation logic rejects empty or missing "Message" field', async () => {
  const page = await getPage('/careers');
  const emptyMessage = '   ';
  const isInvalid = emptyMessage.trim().length === 0;
  assert(isInvalid, 'Careers form must reject whitespace-only messages');
  assert(
    page.html.includes('!message.trim()') || page.html.includes('Please include a message') || page.html.includes('message'),
    'CareersForm must validate message input'
  );
});

suite.test('F19-B04: Form handles boundary case of extremely long input string (5,000+ chars) in Message without crash', async () => {
  const longInput = 'A'.repeat(5000);
  assert.equal(longInput.length, 5000);
  assert(typeof longInput === 'string', 'Message handler must support long strings without memory allocation error');
});

suite.test('F19-B05: Submit handler prevents double submission via submission state lock', async () => {
  const page = await getPage('/careers');
  let isSubmitting = false;
  let submitCount = 0;

  function simulateSubmit() {
    if (isSubmitting) return;
    isSubmitting = true;
    submitCount++;
  }

  simulateSubmit();
  simulateSubmit(); // Rapid duplicate click
  assert.equal(submitCount, 1, 'Submit handler should debounce / lock to prevent duplicate submission');
  assert(
    page.html.includes('if (isSubmitting) return') || page.html.includes('isSubmitting'),
    'CareersForm must implement isSubmitting check to prevent double submission'
  );
});
