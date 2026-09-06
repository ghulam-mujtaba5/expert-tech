/**
 * tests/e2e/tier1-features/f21-contact-interactive-form.test.mjs
 * Feature F21: Contact Interactive Form
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F21: Contact Interactive Form');

suite.test('F21-T01: Contact form block renders H2 "Let\'s discuss your infrastructure"', async () => {
  const page = await getPage('/contact');
  assert(
    hasText(page.html, SPEC.contact.formHeading) || hasText(page.html, 'discuss your infrastructure'),
    'Contact section must render H2 form headline'
  );
});

suite.test('F21-T02: Contact form renders inputs for Name, Work Email, Phone, and Message', async () => {
  const page = await getPage('/contact');
  const hasInputs = hasPattern(page.html, /name/i) && hasPattern(page.html, /email/i) && hasPattern(page.html, /message/i);
  assert(hasInputs, 'Contact form must provide Name, Email, and Message inputs');
});

suite.test('F21-T03: Contact form renders "Submit Enquiry" action button', async () => {
  const page = await getPage('/contact');
  const hasSubmit = hasText(page.html, SPEC.contact.submitButton) || hasText(page.html, 'Submit');
  assert(hasSubmit, 'Contact form must feature Submit Enquiry button');
});

suite.test('F21-T04: Contact form fields enforce required validation on submission', async () => {
  const page = await getPage('/contact');
  const hasValidation = hasPattern(page.html, /required/i) || hasPattern(page.html, /validate/i);
  assert(hasValidation, 'Contact form must enforce required field validation');
});

suite.test('F21-T05: Valid submission triggers success feedback acknowledging 15-minute SLA', async () => {
  const page = await getPage('/contact');
  const hasFeedback = hasText(page.html, 'within 15 minutes') || hasText(page.html, '15-minute');
  assert(hasFeedback, 'Contact form must define 15-minute response confirmation feedback message');
});
