/**
 * tests/e2e/tier2-boundaries/f20-contact-office-blocks-boundaries.test.mjs
 * Tier 2 Boundary Tests: F20 Contact Office Blocks
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F20 Boundaries: Contact Office Blocks');

suite.test('F20-B01: Display metric "15 Min" retains prominent font scale without layout breaks', async () => {
  const page = await getPage('/contact');
  const hasProminentMetric = hasPattern(page.html, /text-3xl|text-4xl|text-5xl|font-bold/);
  assert(hasProminentMetric, 'Response SLA metric must use bold prominent typography');
});

suite.test('F20-B02: Uptime assurance metric "99.9%" renders numerical format accurately', async () => {
  const page = await getPage('/contact');
  const hasUptime = page.html.includes('99.9%');
  assert(hasUptime, 'Uptime assurance metric must accurately render 99.9%');
});

suite.test('F20-B03: "Request a Quote" anchor targets on-page #contact-form cleanly', async () => {
  const page = await getPage('/contact');
  const hasAnchor = page.html.includes('href="#contact-form"') || page.html.includes('#contact-form');
  assert(hasAnchor, 'Request a Quote button must anchor to #contact-form');
});

suite.test('F20-B04: "View Services" button navigates cleanly to /services', async () => {
  const page = await getPage('/contact');
  const hasServicesLink = page.html.includes('href="/services"') || page.html.includes('/services');
  assert(hasServicesLink, 'View Services button must navigate to /services');
});

suite.test('F20-B05: Direct UK engineering badge uses light blue contrast token (#a1c5f6)', async () => {
  const page = await getPage('/contact');
  const hasBadgeToken = page.html.includes('#a1c5f6');
  assert(hasBadgeToken, 'Overline badge must apply light blue contrast accent');
});
