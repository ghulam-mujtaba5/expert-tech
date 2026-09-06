/**
 * tests/e2e/tier1-features/f09-home-solutions-grid.test.mjs
 * Feature F09: Home Solutions Grid
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F09: Home Solutions Grid');

suite.test('F09-T01: Solutions section renders H2 "Tailored IT Solutions for Your Business"', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, SPEC.home.solutionsHeading) || hasText(page.html, 'Tailored IT Solutions'),
    'Solutions section must display H2 section headline'
  );
});

suite.test('F09-T02: Solutions grid renders IT Support & Helpdesk card', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, 'IT Support & Helpdesk') || hasText(page.html, 'IT Support'),
    'Solutions grid must render IT Support card'
  );
});

suite.test('F09-T03: Solutions grid renders Cloud Solutions card', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, 'Cloud Solutions'),
    'Solutions grid must render Cloud Solutions card'
  );
});

suite.test('F09-T04: Solutions grid renders Software & App Development card', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, 'Software & App Development') || hasText(page.html, 'Software Development'),
    'Solutions grid must render Software Development card'
  );
});

suite.test('F09-T05: Solution cards apply Soft Slate (#ebecef) styling and rounded corners', async () => {
  const page = await getPage('/');
  const hasStyling = page.html.includes('#ebecef') || page.html.includes('rounded-2xl') || page.html.includes('rounded-xl');
  assert(hasStyling, 'Solution cards must apply Soft Slate background and rounded corners');
});
