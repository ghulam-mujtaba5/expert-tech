#!/usr/bin/env node
/**
 * scripts/run-e2e-tests.mjs
 * 
 * Master test runner for Expert Tech E2E Test Suite (Tiers 1-4).
 * Discovers and executes all test cases across:
 *   - tests/e2e/tier1-features/    (110 tests)
 *   - tests/e2e/tier2-boundaries/  (110 tests)
 *   - tests/e2e/tier3-combinations/(22 tests)
 *   - tests/e2e/tier4-scenarios/   (11 tests)
 * 
 * Usage:
 *   node scripts/run-e2e-tests.mjs [--tier 1|2|3|4] [--file <pattern>] [--port 3000]
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Parse command line arguments
const args = process.argv.slice(2);
let filterTier = null;
let filterPattern = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tier' && args[i + 1]) {
    filterTier = args[++i];
  } else if (args[i] === '--file' && args[i + 1]) {
    filterPattern = args[++i];
  } else if (args[i] === '--port' && args[i + 1]) {
    process.env.BASE_URL = `http://localhost:${args[++i]}`;
  }
}

const ROOT_DIR = process.cwd();
const TESTS_DIR = path.join(ROOT_DIR, 'tests', 'e2e');

const TIERS = [
  { id: '1', name: 'Tier 1: Feature Coverage (F01-F22)', dir: 'tier1-features' },
  { id: '2', name: 'Tier 2: Boundary & Corner Cases (F01-F22)', dir: 'tier2-boundaries' },
  { id: '3', name: 'Tier 3: Cross-Feature Combinations', dir: 'tier3-combinations' },
  { id: '4', name: 'Tier 4: Real-World User Scenarios', dir: 'tier4-scenarios' },
];

/**
 * Collect all test files for a tier directory
 */
function getTestFiles(tierDirName) {
  const dirPath = path.join(TESTS_DIR, tierDirName);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((file) => file.endsWith('.test.mjs'))
    .sort()
    .map((file) => path.join(dirPath, file));
}

async function main() {
  const overallStart = Date.now();

  console.log('='.repeat(75));
  console.log('   Expert Tech — Comprehensive E2E Automated Test Suite (Tiers 1-4)');
  console.log('='.repeat(75));
  console.log(`Working Directory: ${ROOT_DIR}`);
  console.log(`Base URL:          ${process.env.BASE_URL || 'http://localhost:3000 (with static fallback)'}`);
  if (filterTier) console.log(`Tier Filter:       Tier ${filterTier}`);
  if (filterPattern) console.log(`File Filter:       ${filterPattern}`);
  console.log('-'.repeat(75));

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const tierSummaries = [];
  const allFailures = [];

  for (const tier of TIERS) {
    if (filterTier && tier.id !== filterTier) continue;

    const files = getTestFiles(tier.dir).filter((filePath) => {
      if (!filterPattern) return true;
      return path.basename(filePath).toLowerCase().includes(filterPattern.toLowerCase());
    });

    console.log(`\n📦 ${tier.name} [${files.length} test suites found]`);

    let tierTotal = 0;
    let tierPassed = 0;
    let tierFailed = 0;

    for (const filePath of files) {
      const fileUrl = pathToFileURL(filePath).href;
      try {
        const module = await import(fileUrl);
        const suite = module.suite || module.default;

        if (suite && typeof suite.run === 'function') {
          const result = await suite.run();
          tierTotal += result.total;
          tierPassed += result.passed;
          tierFailed += result.failed;

          if (result.failed > 0 && result.failures) {
            for (const f of result.failures) {
              allFailures.push({
                tier: tier.name,
                suite: result.suiteName,
                test: f.test,
                error: f.error,
              });
            }
          }
        } else {
          console.warn(`  ⚠ Warning: No runnable test suite exported from ${path.basename(filePath)}`);
        }
      } catch (err) {
        console.error(`  ✗ Error loading test file ${path.basename(filePath)}: ${err.message}`);
        tierFailed++;
        tierTotal++;
        allFailures.push({
          tier: tier.name,
          suite: path.basename(filePath),
          test: 'Module Load',
          error: err.message,
        });
      }
    }

    tierSummaries.push({
      name: tier.name,
      total: tierTotal,
      passed: tierPassed,
      failed: tierFailed,
    });

    totalTests += tierTotal;
    totalPassed += tierPassed;
    totalFailed += tierFailed;
  }

  const durationSec = ((Date.now() - overallStart) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(75));
  console.log('                 E2E TEST EXECUTION SUMMARY REPORT');
  console.log('='.repeat(75));

  for (const ts of tierSummaries) {
    const status = ts.failed === 0 ? '✓ PASS' : '✗ FAIL';
    console.log(`  ${status}  ${ts.name.padEnd(48)}: ${ts.passed}/${ts.total} passed`);
  }

  console.log('-'.repeat(75));
  console.log(`  TOTAL TESTS EXECUTED: ${totalTests}`);
  console.log(`  TOTAL PASSED:         ${totalPassed}`);
  console.log(`  TOTAL FAILED:         ${totalFailed}`);
  console.log(`  EXECUTION DURATION:   ${durationSec}s`);
  console.log('='.repeat(75));

  if (totalFailed > 0) {
    console.log('\nFAILED TESTS BREAKDOWN:');
    for (const f of allFailures) {
      console.log(`  - [${f.tier}] ${f.suite} -> ${f.test}`);
      console.log(`    Error: ${f.error}`);
    }
    console.log('\n❌ RESULT: TEST SUITE FAILED (non-zero exit code)');
    process.exit(1);
  } else {
    console.log('\n🎉 RESULT: ALL TEST CASES PASSED CLEANLY (exit code 0)');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal execution error in run-e2e-tests.mjs:', err);
  process.exit(1);
});
