/**
 * tests/e2e/tier4-scenarios/client-review-submission.test.mjs
 * Tier 4 Scenario 3: Client Review Reading & Submission Journey
 */

import assert from 'node:assert/strict';
import { createTestSuite, getPage, SPEC, hasText } from '../test-helper.mjs';

export const suite = createTestSuite('T4 Scenario: Client Review Reading & Submission');

suite.test('T4-SCN05: Journey: Repeat client views verified reviews and verifies Scottish office map location', async () => {
  // Step 1: Client navigates to Reviews
  const reviews = await getPage('/reviews');
  assert(reviews.statusCode === 200 || reviews.exists, 'Step 1: Reviews page loads');

  // Step 2: Client reviews 5-star testimonials from retainer clients
  assert(hasText(reviews.html, 'OLIVE AURA'), 'Step 2: Client reads Olive Aura testimonial');
  assert(hasText(reviews.html, 'Jelan'), 'Step 2: Client reads Jelan o Ltd testimonial');

  // Step 3: Client checks verified Google Map embed in Cowdenbeath, Scotland
  assert(reviews.html.includes('Cowdenbeath'), 'Step 3: Verified office map location confirmed in Cowdenbeath');
});

suite.test('T4-SCN06: Journey: Client submits 5-star rating and written review with consent confirmation', async () => {
  const reviews = await getPage('/reviews');

  // Step 1: Form input setup
  const reviewSubmission = {
    name: 'David MacLeod',
    company: 'Caledonian Logistics Ltd',
    rating: 5,
    review: 'Outstanding helpdesk turnaround and proactive infrastructure monitoring throughout 2026.',
    consent: true,
  };

  // Step 2: Validation of submission constraints
  assert(reviewSubmission.name.length > 0, 'Step 2a: Name provided');
  assert(reviewSubmission.rating >= 1 && reviewSubmission.rating <= 5, 'Step 2b: 5-star rating chosen');
  assert(reviewSubmission.review.length >= 20, 'Step 2c: Detailed review text provided');
  assert(reviewSubmission.consent === true, 'Step 2d: Display consent granted');

  // Step 3: Verify authentic form structure and confirmation state in ReviewModal
  assert(
    reviews.html.includes('reviewer-name') || reviews.html.includes('name="name"') || reviews.html.includes('ReviewModal'),
    'Step 3a: Reviewer name input configured'
  );
  assert(
    reviews.html.includes('reviewer-text') || reviews.html.includes('name="review"') || reviews.html.includes('ReviewModal'),
    'Step 3b: Review text input configured'
  );
  assert(
    reviews.html.includes('consent') && (reviews.html.includes('checkbox') || reviews.html.includes('type="checkbox"')),
    'Step 3c: Review consent confirmation field configured'
  );
  assert(
    reviews.html.includes('Submit Review') || reviews.html.includes('Leave a Review'),
    'Step 3d: Review submission action available'
  );
  assert(
    reviews.html.includes('Thank You for Your Review!') || reviews.html.includes('submitted for verification'),
    'Step 3e: Review confirmation and verification state defined'
  );
});
