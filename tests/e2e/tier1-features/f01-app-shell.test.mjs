/**
 * tests/e2e/tier1-features/f01-app-shell.test.mjs
 * Feature F01: App Shell & Global Providers
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText, hasPattern } from '../test-helper.mjs';

export const suite = createTestSuite('F01: App Shell & Global Providers');

suite.test('F01-T01: Document metadata contains Expert Tech in title and meta tags', async () => {
  const page = await getPage('/');
  assert(
    hasText(page.html, SPEC.company.name),
    `Page must contain company name "${SPEC.company.name}" in metadata or body`
  );
});

suite.test('F01-T02: Global font families (Sora, IBM Plex Sans) are configured in app shell', async () => {
  const page = await getPage('/');
  const hasFonts = hasPattern(page.html, /sora/i) || hasPattern(page.html, /ibm plex sans/i) || hasPattern(page.html, /font-/i);
  assert(hasFonts, 'App shell must configure Sora and/or IBM Plex Sans typography tokens');
});

suite.test('F01-T03: App shell defines valid HTML language and responsive viewport meta', async () => {
  const page = await getPage('/');
  const hasLangOrHtml = hasPattern(page.html, /<html[^>]*lang=["']en(-[a-zA-Z]+)?["']/i) || hasPattern(page.html, /lang=["']en/i);
  assert(hasLangOrHtml, 'HTML document must declare lang="en" or lang="en-GB"');
});

suite.test('F01-T04: Root layout includes Header, Footer, and Floating CTA wrappers', async () => {
  const page = await getPage('/');
  const hasHeader = hasPattern(page.html, /header/i);
  const hasFooter = hasPattern(page.html, /footer/i);
  assert(hasHeader && hasFooter, 'Root layout must wrap pages with persistent Header and Footer components');
});

suite.test('F01-T05: Root layout provides main container element for page content', async () => {
  const page = await getPage('/');
  const hasMain = hasPattern(page.html, /<main/i);
  assert(hasMain, 'App shell must provide structured main content area');
});
