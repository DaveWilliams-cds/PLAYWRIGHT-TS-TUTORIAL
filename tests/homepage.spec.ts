import { test, expect } from '@playwright/test';
import { LoginOrSignupPage } from '../pageObjects/loginSignupPage';
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

test.beforeEach(async ({ page }) => {
  helpers = new Helpers(page);
  loginOrSignupPage = new LoginOrSignupPage(page, helpers);

  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle(/Automation Exercise/);
  await page.getByRole('button', { name: 'Consent' }).click();
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

test('Register with existing email shows error', async () => {
  const { name, email } = TEST_CREDENTIALS.existingEmail;
  await loginOrSignupPage.loginOrSignupUser('exLogin', name, email);
});

