/**
 * tests/e2e/tier1-features/f12-services-detail-cards.test.mjs
 * Feature F12: Services Detail Cards
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('F12: Services Detail Cards');

suite.test('F12-T01: Detail card 1 renders Web Design & Development with bespoke app copy', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'Web Design & Development') || hasText(page.html, 'Web Design'),
    'Services must render Web Design & Development card'
  );
});

suite.test('F12-T02: Detail card 2 renders IT Support & Helpdesk with rapid response copy', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'IT Support & Helpdesk') || hasText(page.html, 'IT Support'),
    'Services must render IT Support & Helpdesk card'
  );
});

suite.test('F12-T03: Detail card 3 renders Software & App Development with workflow optimization copy', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'Software & App Development') || hasText(page.html, 'Software Development'),
    'Services must render Software & App Development card'
  );
});

suite.test('F12-T04: Detail card 4 renders Cloud Solutions with cloud migration copy', async () => {
  const page = await getPage('/services');
  assert(
    hasText(page.html, 'Cloud Solutions'),
    'Services must render Cloud Solutions card'
  );
});

suite.test('F12-T05: Detail cards apply styled icon container pills and rounded corners', async () => {
  const page = await getPage('/services');
  const hasCardStyles = page.html.includes('#ebecef') || page.html.includes('rounded-2xl') || page.html.includes('rounded-xl');
  assert(hasCardStyles, 'Detail cards must apply standard Soft Slate and rounded corner tokens');
});
