import { test, expect } from '@playwright/test';
import { LoginOrSignupPage } from '../pageObjects/loginSignupPage';
import { ProductsPage } from '../pageObjects/productsPage';
import { Helpers } from '../helpers/Helpers';

const TEST_CREDENTIALS = {
  validUser: {
    email: 'davesjwilliams@yahoo.co.uk',
    password: 'password',
  },
  newUser: {
    name: 'Dave SJ Williams',
    email: 'davesjwilliams03@yahoo.co.uk',
  },
  invalidUser: {
    email: 'davesjwilliams@gmail.com',
    password: 'password',
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

test('Login with valid credentials', async () => {
  const { email, password } = TEST_CREDENTIALS.validUser;
  await loginOrSignupPage.loginOrSignupUser('Login', email, password);
});

test('Login with invalid credentials shows error', async () => {
  const { email, password } = TEST_CREDENTIALS.invalidUser;
  await loginOrSignupPage.loginOrSignupUser('invLogin', email, password);
});

test('Logout user after login', async () => {
  const { email, password } = TEST_CREDENTIALS.validUser;
  await loginOrSignupPage.loginOrSignupUser('Login', email, password);
  await loginOrSignupPage.logOut();
});


