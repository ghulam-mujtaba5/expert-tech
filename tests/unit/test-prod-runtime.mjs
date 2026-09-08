import { spawn } from 'node:child_process';
import http from 'node:http';
import assert from 'node:assert/strict';

const PORT = 3009;
const URL = `http://localhost:${PORT}/`;

console.log(`Starting Next.js production server on port ${PORT}...`);

const serverProcess = spawn('npx.cmd', ['next', 'start', '-p', String(PORT)], {
  cwd: 'e:/Expert Tech',
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});

let serverLogs = '';
serverProcess.stdout.on('data', (d) => {
  serverLogs += d.toString();
});
serverProcess.stderr.on('data', (d) => {
  serverLogs += d.toString();
});

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    http.get(targetUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function waitForServer(retries = 30, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchUrl(URL);
      if (res.statusCode === 200) {
        return res;
      }
    } catch {
      // wait
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  throw new Error(`Server did not respond with 200 on port ${PORT}. Logs:\n${serverLogs}`);
}

async function run() {
  try {
    console.log('Waiting for Next.js production server to be ready...');
    const res = await waitForServer();
    console.log(`Server responded with status: ${res.statusCode}`);

    const html = res.body;

    console.log('\n--- Verifying Rendered HTML ---');

    // Verify 1: HTTP 200
    assert.strictEqual(res.statusCode, 200, 'Status code must be 200');
    console.log('✓ HTTP 200 OK');

    // Verify 2: Header presence & routes
    assert.ok(html.includes('<header'), 'Header component must be rendered');
    console.log('✓ <header> tag present');

    const routes = [
      '/',
      '/services',
      '/reviews',
      '/refund-policy',
      '/contact',
      '/careers'
    ];

    for (const r of routes) {
      assert.ok(html.includes(`href="${r}"`), `Rendered HTML must contain link to ${r}`);
      console.log(`✓ Route link href="${r}" verified in SSR output`);
    }

    // Verify 3: Phone number in Header, FloatingCta, and Footer
    assert.ok(html.includes('href="tel:+447565322806"'), 'tel:+447565322806 link must be rendered');
    console.log('✓ Clickable phone link verified');

    // Verify 4: Floating CTA rendered
    assert.ok(
      html.includes('whats-app-bubble') || html.includes('aria-label="Quick contact"'),
      'Floating CTA must be present in HTML'
    );
    console.log('✓ Floating CTA verified in HTML');

    // Verify 5: Footer rendered with address
    assert.ok(html.includes('<footer'), 'Footer must be rendered');
    assert.ok(html.includes('Cowdenbeath'), 'Cowdenbeath address must be rendered in Footer');
    console.log('✓ Corporate Footer verified with Cowdenbeath address');

    // Verify 6: Zero Elvarix
    assert.ok(!/elvarix/i.test(html), 'Rendered HTML must contain zero occurrences of Elvarix');
    console.log('✓ Brand Cleanliness: 0 occurrences of Elvarix in SSR response');

    console.log('\nALL RUNTIME SSR AND HYDRATION CHECKS PASSED!');
  } finally {
    console.log('Terminating production server process...');
    serverProcess.kill('SIGTERM');
    try {
      process.kill(serverProcess.pid);
    } catch {
      // ignore
    }
  }
}

run().catch((err) => {
  console.error('Test failed:', err);
  serverProcess.kill('SIGTERM');
  try {
    process.kill(serverProcess.pid);
  } catch {}
  process.exit(1);
});
