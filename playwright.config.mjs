import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { browserName: 'chromium', launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {} },
  reporter: 'list',
});
