/**
 * tests/e2e/tier3-combinations/cta-interconnectivity.test.mjs
 * Tier 3 Cross-Feature Combination Tests: CTA Link Interconnectivity across Pages
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T3: Cross-Page CTA Interconnectivity');

suite.test('T3-CTA01: Home hero primary CTA connects to Services page (/services)', async () => {
  const homePage = await getPage('/');
  const hasServicesLink =
    homePage.html.includes('href="/services"') ||
    homePage.html.includes("href='/services'") ||
    homePage.html.includes('href: "/services"') ||
    homePage.html.includes("href: '/services'");
  assert(
    hasServicesLink,
    'Home hero CTA must link to /services'
  );
});

suite.test('T3-CTA02: Home hero secondary CTA connects to Contact page (/contact)', async () => {
  const homePage = await getPage('/');
  const hasContactLink =
    homePage.html.includes('href="/contact"') ||
    homePage.html.includes("href='/contact'") ||
    homePage.html.includes('href: "/contact"') ||
    homePage.html.includes("href: '/contact'");
  assert(
    hasContactLink,
    'Home secondary CTA must link to /contact'
  );
});

suite.test('T3-CTA03: Services page bottom quote CTA connects to Contact page (/contact)', async () => {
  const servicesPage = await getPage('/services');
  const hasContactLink =
    servicesPage.html.includes('href="/contact"') ||
    servicesPage.html.includes("href='/contact'") ||
    servicesPage.html.includes('href: "/contact"') ||
    servicesPage.html.includes("href: '/contact'");
  assert(
    hasContactLink,
    'Services bottom CTA must navigate to /contact'
  );
});

suite.test('T3-CTA04: Contact page hero "View Services" button navigates back to Services (/services)', async () => {
  const contactPage = await getPage('/contact');
  const hasServicesLink = 
    contactPage.html.includes('href="/services"') || 
    contactPage.html.includes("href='/services'") ||
    contactPage.html.includes('href: "/services"') ||
    contactPage.html.includes('href: \'/services\'');
  assert(hasServicesLink, 'Contact hero secondary CTA must navigate to /services');
});

suite.test('T3-CTA05: Home bottom CTA and Floating CTA both trigger direct dialer to +447565322806', async () => {
  const homePage = await getPage('/');
  assert(
    homePage.html.includes(SPEC.company.telLink),
    'Both Home bottom CTA and Floating CTA must trigger tel:+447565322806'
  );
});
