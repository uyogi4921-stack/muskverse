import { test, expect } from '@playwright/test';

test('landing hero loads with title and sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('MUSKVERSE');
  await expect(page.locator('#origins')).toBeAttached();
  await expect(page.locator('#spacex')).toBeAttached();
  await expect(page.locator('#tribute')).toBeAttached();
});

test('timeline API serves events spanning 1971 to 2026', async ({
  request,
}) => {
  const res = await request.get('/api/timeline');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.success).toBe(true);
  expect(body.meta.range).toEqual({ start: 1971, end: 2026 });
  expect(body.data.length).toBeGreaterThanOrEqual(30);
});

test('subscribe API rejects invalid email', async ({ request }) => {
  const res = await request.post('/api/subscribe', {
    data: { email: 'not-an-email' },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.success).toBe(false);
});

test('subscribe API rejects malformed body', async ({ request }) => {
  const res = await request.post('/api/subscribe', {
    headers: { 'Content-Type': 'application/json' },
    data: 'garbage',
  });
  expect(res.status()).toBe(400);
});
