import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

let server, origin;
test.beforeAll(async () => {
  server = spawn(process.execPath, ['tests/server.mjs'], { stdio: ['ignore', 'pipe', 'inherit'] });
  const [data] = await once(server.stdout, 'data');
  origin = `http://127.0.0.1:${data.toString().match(/PORT=(\d+)/)[1]}`;
});
test.afterAll(() => server?.kill());

test('800 native controls support independent mouse and keyboard selection', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(origin);
  const buttons = page.getByRole('button');
  await expect(buttons).toHaveCount(800);
  await expect(page.getByRole('listitem')).toHaveCount(800);
  const first = page.getByRole('button', { name: 'tiny navy apple', exact: true });
  const second = page.getByRole('button', { name: 'tiny blue apple', exact: true });
  const selected = page.locator('.SelectedItems');
  await expect(selected).toHaveText('Selected items: None');
  await first.click();
  await second.focus();
  await page.keyboard.press('Space');
  await expect(selected).toContainText('tiny navy apple, tiny blue apple');
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expect(second).toHaveClass(/List__item--selected/);
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('aria-pressed', 'false');
  await first.click();
  await expect(selected).toHaveText('Selected items: None');
  expect(errors).toEqual([]);
});

test('narrow viewport retains readable controls and resets on reload', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(origin);
  const first = page.getByRole('button').first();
  await first.click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(page.locator('.SelectedItems')).toHaveText('Selected items: None');
});
