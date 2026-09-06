/**
 * tests/e2e/tier1-features/f19-careers-application-form.test.mjs
 * Feature F19: Careers Application Form
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F19: Careers Application Form');

suite.test('F19-T01: Application form renders input field for applicant Name', async () => {
  const page = await getPage('/careers');
  const hasNameInput = hasPattern(page.html, /name=["'](?:name|firstName)["']/i) || hasText(page.html, 'Name');
  assert(hasNameInput, 'Careers form must include Name input');
});

suite.test('F19-T02: Application form renders input for "Your Expertise"', async () => {
  const page = await getPage('/careers');
  const hasExpertise = hasPattern(page.html, /expertise/i) || hasText(page.html, 'Expertise');
  assert(hasExpertise, 'Careers form must include Your Expertise input');
});

suite.test('F19-T03: Application form renders email input for "Your email"', async () => {
  const page = await getPage('/careers');
  const hasEmail = hasPattern(page.html, /type=["']email["']/i) || hasText(page.html, 'email');
  assert(hasEmail, 'Careers form must include email input');
});

suite.test('F19-T04: Application form renders textarea for "Message"', async () => {
  const page = await getPage('/careers');
  const hasMessage = hasPattern(page.html, /<textarea/i) || hasText(page.html, 'Message');
  assert(hasMessage, 'Careers form must include Message textarea');
});

suite.test('F19-T05: Application form renders "Submit" button with submit handling', async () => {
  const page = await getPage('/careers');
  const hasSubmit = hasPattern(page.html, /<button[^>]*type=["']submit["']/i) || hasText(page.html, 'Submit');
  assert(hasSubmit, 'Careers form must feature Submit button');
});
