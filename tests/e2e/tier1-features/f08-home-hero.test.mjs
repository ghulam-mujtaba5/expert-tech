/**
 * tests/e2e/tier1-features/f08-home-hero.test.mjs
 * Feature F08: Home Page Hero Section
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F08: Home Page Hero Section');

suite.test('F08-T01: Hero renders H1 heading "Technology that keeps your business moving."', async () => {
  const page = await getPage('/');
  const hasHeading = 
    hasText(page.html, SPEC.home.hero.heading) || 
    hasText(page.html, 'Technology that keeps your business') ||
    hasText(page.html, 'keeps your business moving');
  assert(hasHeading, 'Home hero must render primary H1 headline');
});

suite.test('F08-T02: Hero renders UK businesses value proposition subheading', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, 'UK businesses') || hasText(page.html, 'proactive support'),
    'Home hero must render tailored value proposition subheading'
  );
});

suite.test('F08-T03: Primary CTA button "Explore Services" links to /services', async () => {
  const page = await getPage('/');
  const hasLink = page.html.includes('href="/services"') || hasText(page.html, 'Explore Services');
  assert(hasLink, 'Hero primary CTA must navigate to /services');
});

suite.test('F08-T04: Secondary CTA button "Talk to Us" links to /contact', async () => {
  const page = await getPage('/');
  const hasLink = page.html.includes('href="/contact"') || hasText(page.html, 'Talk to Us');
  assert(hasLink, 'Hero secondary CTA must navigate to /contact');
});

suite.test('F08-T05: Hero section applies linear gradient from Deep Navy to Royal Blue', async () => {
  const page = await getPage('/');
  const hasGradient = page.html.includes('#0b1c3d') || page.html.includes('#2f80ed') || hasPattern(page.html, /bg-gradient/);
  assert(hasGradient, 'Hero section must apply signature Navy-to-Royal gradient background');
});
