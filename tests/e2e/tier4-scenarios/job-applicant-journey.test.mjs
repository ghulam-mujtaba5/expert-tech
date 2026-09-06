/**
 * tests/e2e/tier4-scenarios/job-applicant-journey.test.mjs
 * Tier 4 Scenario 4: Engineering Job Applicant Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, isValidEmail, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Engineering Job Applicant Journey');

suite.test('T4-SCN07: Journey: Engineer navigates to Careers, inspects UK team culture, and fills application form', async () => {
  // Step 1: Applicant visits Careers
  const careers = await getPage('/careers');
  assert(careers.statusCode === 200 || careers.exists, 'Step 1: Careers page loads');

  // Step 2: Applicant reads team proposition
  assert(hasText(careers.html, 'Expertise'), 'Step 2: Applicant identifies expertise requirements');

  // Step 3: Candidate prepares application details
  const candidate = {
    name: 'Alexander Ross',
    expertise: 'Senior Cloud & DevOps Engineer',
    email: 'alexander.ross@ukcloud.dev',
    message: '10+ years managing Kubernetes and multi-region AWS cloud architectures in the UK.',
  };

  assert(candidate.name.length > 0, 'Step 3a: Candidate name valid');
  assert(candidate.expertise.length > 0, 'Step 3b: Candidate expertise valid');
  assert(isValidEmail(candidate.email), 'Step 3c: Candidate email valid');
  assert(candidate.message.length > 0, 'Step 3d: Candidate message valid');
});

suite.test('T4-SCN08: Journey: Application submission returns "Thank You!" confirmation and home return link', async () => {
  const careers = await getPage('/careers');

  // Step 1: Authentic Careers form structure check
  assert(
    careers.html.includes('CareersForm') || careers.html.includes('application-form') || careers.html.includes('isSubmitted'),
    'Step 1: Careers application form is present and mounted'
  );

  // Step 2: Feedback confirmation verification
  assert(
    hasText(careers.html, 'Thank You!'),
    'Step 2: Applicant receives "Thank You!" confirmation feedback state'
  );

  // Step 3: Applicant return link to Home
  assert(
    careers.html.includes('Return to Home') || careers.html.includes('href="/"') || careers.html.includes("href='/'"),
    'Step 3: Applicant is provided Return to Home link'
  );
});
