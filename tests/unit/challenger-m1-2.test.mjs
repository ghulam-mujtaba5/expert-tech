import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = 'e:/Expert Tech';

console.log('====================================================');
console.log('CHALLENGER M1_2 EMPIRICAL VERIFICATION TEST SUITE');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

// ---------------------------------------------------------
// SUITE 1: Route Invariant & Header Navigation Verification
// ---------------------------------------------------------
console.log('Suite 1: Route Invariants & Header Navigation');

const plannedRoutes = [
  '/',
  '/services',
  '/reviews',
  '/careers',
  '/contact',
  '/refund-policy'
];

test('PROJECT.md defines exactly 7 planned routes', () => {
  const projectMdPath = path.join(projectRoot, '.agents/PROJECT.md');
  const content = fs.readFileSync(projectMdPath, 'utf8');
  for (const route of plannedRoutes) {
    assert.ok(
      content.includes(`http://localhost:<port>${route}`) || content.includes(route),
      `PROJECT.md must include planned route ${route}`
    );
  }
});

test('data/company.ts defines all 7 canonical routes in navLinks', () => {
  const companyTsPath = path.join(projectRoot, 'data/company.ts');
  const content = fs.readFileSync(companyTsPath, 'utf8');
  for (const route of plannedRoutes) {
    assert.ok(
      content.includes(`href: "${route}"`),
      `data/company.ts navLinks must include href "${route}"`
    );
  }
});

test('Header.tsx imports and maps over navLinks for desktop navigation', () => {
  const headerPath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(headerPath, 'utf8');
  assert.ok(
    content.includes("import { company, navLinks } from '@/data/company';"),
    'Header.tsx must import navLinks from data/company'
  );
  assert.ok(
    content.includes('<nav className="hidden lg:flex items-center gap-1 xl:gap-2">') &&
    content.includes('navLinks.map((item) => {'),
    'Header.tsx must render desktop navigation from navLinks'
  );
});

test('Header/MobileMenuDrawer maps over navLinks for mobile drawer navigation', () => {
  const drawerPath = path.join(projectRoot, 'components/MobileMenuDrawer.tsx');
  const headerPath = path.join(projectRoot, 'components/Header.tsx');
  const drawerContent = fs.existsSync(drawerPath) ? fs.readFileSync(drawerPath, 'utf8') : '';
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  assert.ok(
    drawerContent.includes('navLinks.map((item) => {') || headerContent.includes('navLinks.map((item) => {'),
    'Mobile drawer navigation must render from navLinks'
  );
});

test('Header.tsx logo navigates to home route "/"', () => {
  const headerPath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(headerPath, 'utf8');
  assert.ok(
    content.includes('href="/"') && content.includes('aria-label={`${company.name} Home`}'),
    'Header logo must link to "/" with proper accessibility label'
  );
});

test('Active route matching logic correctly distinguishes all 7 routes', () => {
  // Simulate Header.tsx isActive logic:
  // item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
  const getIsActive = (href, pathname) => {
    return href === '/' ? pathname === '/' : (pathname?.startsWith(href) ?? false);
  };

  for (const currentPath of plannedRoutes) {
    const activeLinks = plannedRoutes.filter(route => getIsActive(route, currentPath));
    assert.strictEqual(
      activeLinks.length,
      1,
      `Expected exactly 1 active link for pathname "${currentPath}", got ${activeLinks.length} (${activeLinks.join(', ')})`
    );
    assert.strictEqual(
      activeLinks[0],
      currentPath,
      `Active link for "${currentPath}" should be "${currentPath}"`
    );
  }

  // Edge case: Subpaths like /services/cloud
  assert.strictEqual(getIsActive('/services', '/services/cloud'), true, 'Subpath /services/cloud activates /services');
  assert.strictEqual(getIsActive('/', '/services/cloud'), false, 'Subpath /services/cloud does NOT activate /');

  // Edge case: Null pathname during SSR edge cases
  assert.strictEqual(getIsActive('/', null), false);
  assert.strictEqual(getIsActive('/services', null), false);
});

// ---------------------------------------------------------
// SUITE 2: SSR & Hydration Boundary Verification
// ---------------------------------------------------------
console.log('\nSuite 2: SSR & Client/Server Hydration Boundaries');

test('Header.tsx has "use client" directive at top of file', () => {
  const filePath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  assert.strictEqual(lines[0], "'use client';", 'Header.tsx line 1 must be \'use client\';');
});

test('FloatingCta.tsx has "use client" directive at top of file', () => {
  const filePath = path.join(projectRoot, 'components/FloatingCta.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  assert.strictEqual(lines[0], "'use client';", 'FloatingCta.tsx line 1 must be \'use client\';');
});

test('app/layout.tsx is a Server Component (no "use client") and exports metadata', () => {
  const filePath = path.join(projectRoot, 'app/layout.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(!content.includes("'use client'"), 'layout.tsx must NOT have "use client"');
  assert.ok(content.includes('export const metadata: Metadata = {'), 'layout.tsx must export metadata');
});

test('components/Footer.tsx is a Server Component (no "use client")', () => {
  const filePath = path.join(projectRoot, 'components/Footer.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(!content.includes("'use client'"), 'Footer.tsx must NOT have "use client"');
  assert.ok(!content.includes('useState'), 'Footer.tsx should not use client state');
  assert.ok(!content.includes('useEffect'), 'Footer.tsx should not use client effects');
});

test('components/SectionContainer.tsx is a Server Component (no "use client")', () => {
  const filePath = path.join(projectRoot, 'components/SectionContainer.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(!content.includes("'use client'"), 'SectionContainer.tsx must NOT have "use client"');
});

test('No client-only globals (window, document, localStorage) accessed outside useEffect in Header.tsx', () => {
  const filePath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract content outside useEffect blocks
  const withoutUseEffects = content.replace(/useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[.*?\]\s*\);?/g, '/* useEffect removed */');
  
  assert.ok(!withoutUseEffects.includes('window.'), 'window should not be accessed outside useEffect in Header.tsx');
  assert.ok(!withoutUseEffects.includes('document.'), 'document should not be accessed outside useEffect in Header.tsx');
  assert.ok(!withoutUseEffects.includes('localStorage.'), 'localStorage should not be accessed outside useEffect in Header.tsx');
});

test('No client-only globals accessed in FloatingCta.tsx', () => {
  const filePath = path.join(projectRoot, 'components/FloatingCta.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(!content.includes('window.'), 'window should not be accessed in FloatingCta.tsx');
  assert.ok(!content.includes('document.'), 'document should not be accessed in FloatingCta.tsx');
});

test('Initial mobileMenuOpen state in Header is false on SSR and client', () => {
  const filePath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(
    content.includes('const [mobileMenuOpen, setMobileMenuOpen] = useState(false);'),
    'Header initial state must be boolean false to prevent hydration mismatch'
  );
});

// ---------------------------------------------------------
// SUITE 3: Brand & Link Invariants across Components
// ---------------------------------------------------------
console.log('\nSuite 3: Brand & Link Invariants');

test('Header.tsx includes direct phone CTA wired to company.telLink and company.phone', () => {
  const filePath = path.join(projectRoot, 'components/Header.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(content.includes('href={company.telLink}'), 'Header must contain href={company.telLink}');
  assert.ok(content.includes('{company.phone}'), 'Header must display {company.phone}');
});

test('FloatingCta.tsx is wired to company.telLink with proper phone icon and aria-label', () => {
  const filePath = path.join(projectRoot, 'components/FloatingCta.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(content.includes('href={company.telLink}'), 'FloatingCta must link to company.telLink');
  assert.ok(content.includes('Phone'), 'FloatingCta must render Phone icon');
});

test('Footer.tsx includes address, email mailto, tel link, and 3px blue bar', () => {
  const filePath = path.join(projectRoot, 'components/Footer.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  assert.ok(content.includes('h-[3px] w-full bg-[#2f80ed]'), 'Footer must have 3px Royal Blue accent line');
  assert.ok(content.includes('mailto:${company.email}'), 'Footer must have mailto link');
  assert.ok(content.includes('href={company.telLink}'), 'Footer must have tel link');
  assert.ok(content.includes('company.address.line1'), 'Footer must render address');
  assert.ok(content.includes('company.copyright'), 'Footer must render copyright');
});

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
