import { test, expect } from '@playwright/test';
import { LoginOrSignupPage } from '../pageObjects/loginSignupPage';
import { ProductsPage } from '../pageObjects/productsPage';
import { Helpers } from '../helpers/Helpers';

const TEST_CREDENTIALS = {
  newUser: {
    name: 'Dave SJ Williams',
    email: 'davesjwilliams03@yahoo.co.uk',
  },
  existingEmail: {
    name: 'Dave SJ Williams',
    email: 'nosuchemail00@gmail.com',
  },
} as const;

let helpers: Helpers;
let loginOrSignupPage: LoginOrSignupPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  helpers = new Helpers(page);
  productsPage = new ProductsPage(page);
  loginOrSignupPage = new LoginOrSignupPage(page, helpers);

  await page.goto('/'); //utilises baseURL in Playwright.config
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Cookie Consent button behaves differently in CI vs local. Playwright can expose the CI environment setup
  if (process.env.CI) {
    // Running in GitHub Actions — consent may not appear, skip it
    const consentButton = page.getByRole('button', { name: 'Consent' });
    if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await consentButton.click();
    }else{
      console.log('CI Information: Cookie Consent button not present — skipping');
    }
  } else {
    // Running locally — consent MUST appear, fail clearly if it doesn't
    await page.getByRole('button', { name: 'Consent' }).click();
  }

  await expect(page.getByRole('heading', { name: 'CATEGORY' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'FEATURES ITEMS' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Register a new user', async () => {
  const { name, email } = TEST_CREDENTIALS.newUser;
  await loginOrSignupPage.loginOrSignupUser('Signup', name, email);
  await helpers.deleteAccount();
});

test('Register with existing email shows error', async () => {
  const { name, email } = TEST_CREDENTIALS.existingEmail;
  await loginOrSignupPage.loginOrSignupUser('exLogin', name, email);
});