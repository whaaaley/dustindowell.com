import { defineConfig, devices } from '@playwright/test'

// E2E config for the personal site.
// The dev server runs over self-signed HTTPS (basicSsl), so ignoreHTTPSErrors is required.
// One worker keeps the run deterministic and the serial output readable.
export default defineConfig({
  testDir: './src',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'https://localhost:5173',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Reuse a dev server if one is already running, otherwise start one.
  webServer: {
    command: 'npm run dev',
    url: 'https://localhost:5173',
    ignoreHTTPSErrors: true,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
