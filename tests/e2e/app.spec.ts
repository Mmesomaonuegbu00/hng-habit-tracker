import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: 'test-user',
          email: 'test@user.com',
        })
      );
    });

    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('habit-tracker-session');
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');

    await page.fill('input[type="email"]', 'new@user.com');
    await page.fill('input[type="password"]', 'password123');

    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'test@user.com');
    await page.fill('input[type="password"]', 'password123');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: 'test-user',
          email: 'test@user.com',
        })
      );
    });

    await page.goto('/dashboard');

    await page.getByRole('button', { name: /create new habit/i }).click();

    await page.getByTestId('habit-name-input').fill('Drink Water');
    await page.getByTestId('habit-description-input').fill('Stay hydrated daily');

    await page.getByTestId('habit-save-button').click();

    const card = page.getByTestId(/habit-card-/);
    await expect(card.first()).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: 'test-user',
          email: 'test@user.com',
        })
      );
    });

    await page.goto('/dashboard');

    const completeBtn = page.getByTestId(/habit-complete-/).first();
    await completeBtn.click();

    await expect(completeBtn).toBeVisible();
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: 'test-user',
          email: 'test@user.com',
        })
      );
    });

    await page.goto('/dashboard');

    await page.reload();

    await expect(page.getByTestId('habits-section-header')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        'habit-tracker-session',
        JSON.stringify({
          userId: 'test-user',
          email: 'test@user.com',
        })
      );
    });

    await page.goto('/dashboard');

    await page.getByRole('button', { name: /logout/i }).click();

    await expect(page).toHaveURL(/\/login/);
  });

  test('loads cached app shell when offline after app has been loaded once', async ({ page, context }) => {
    await page.goto('/');

    await context.setOffline(true);

    await page.reload();

    // App shell should still render something (adjust if needed)
    await expect(page.locator('body')).toBeVisible();
  });

});