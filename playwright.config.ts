import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  timeout: 60 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: "https://www.zara.com/ua/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    locale: "en-US",
    timezoneId: "America/Los_Angeles",
    geolocation: { longitude: -122.419416, latitude: 37.774929 },
    permissions: ["geolocation"],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      timeout: 60 * 1000,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        extraHTTPHeaders: {
          "Accept-Language": "en-US,en;q=0.9",
        },
        headless: false,
        trace: "on-first-retry",
        locale: "en-US",
        timezoneId: "America/Los_Angeles",
        geolocation: { longitude: -122.419416, latitude: 37.774929 },
        permissions: ["geolocation"],
      },
    },
    {
      name: "chromium-headless",
      timeout: 60 * 1000,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        extraHTTPHeaders: {
          "Accept-Language": "en-US,en;q=0.9",
        },
        headless: true,
        locale: "en-US",
        timezoneId: "America/Los_Angeles",
        geolocation: { longitude: -122.419416, latitude: 37.774929 },
        permissions: ["geolocation"],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
