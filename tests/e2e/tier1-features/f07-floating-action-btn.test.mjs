/**
 * tests/e2e/tier1-features/f07-floating-action-btn.test.mjs
 * Feature F07: Floating Action Button
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F07: Floating Action Button');

suite.test('F07-T01: Floating action button is fixed positioned at bottom-right viewport', async () => {
  const page = await getPage('/');
  const hasFixed = hasPattern(page.html, /fixed/i) && (hasPattern(page.html, /bottom-/i) || hasPattern(page.html, /right-/i));
  assert(hasFixed, 'Floating CTA button must use fixed positioning at bottom-right');
});

suite.test('F07-T02: Floating CTA contains clickable link to tel:+447565322806', async () => {
  const page = await getPage('/');
  const hasTel = page.html.includes(SPEC.company.telLink) || page.html.includes(SPEC.company.phone);
  assert(hasTel, 'Floating action button must connect to primary telephone +447565322806');
});

suite.test('F07-T03: Floating CTA has high z-index (z-20 or higher) to remain accessible', async () => {
  const page = await getPage('/');
  const hasZIndex = hasPattern(page.html, /z-(20|30|40|50|\d{2})/);
  assert(hasZIndex, 'Floating CTA must maintain high z-index stacking above page content');
});

suite.test('F07-T04: Floating CTA uses rounded circular geometry with phone icon', async () => {
  const page = await getPage('/');
  const hasCircle = hasPattern(page.html, /rounded-full/i);
  assert(hasCircle, 'Floating CTA must render circular container styling');
});

suite.test('F07-T05: Floating CTA is rendered consistently across page views', async () => {
  const homePage = await getPage('/');
  const contactPage = await getPage('/contact');
  assert(
    homePage.html.includes(SPEC.company.telLink) && contactPage.html.includes(SPEC.company.telLink),
    'Floating CTA telephone link must persist across routes via root layout'
  );
});
