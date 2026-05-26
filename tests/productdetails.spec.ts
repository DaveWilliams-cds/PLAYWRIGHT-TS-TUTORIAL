import { test, expect } from '@playwright/test';
import { LoginOrSignupPage } from '../pageObjects/loginSignupPage';
import { ProductsPage } from '../pageObjects/productsPage';

let loginOrSignupPage: LoginOrSignupPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  productsPage = new ProductsPage(page);

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

test('Verify All Products and product detail page', async ({ page }) => {
  // Navigate to ALL PRODUCTS page and verify
  await productsPage.navigateToAllProducts();

  // Verify the products list is visible
  await productsPage.verifyProductsListVisible();

  // Click on View Product of first product
  await productsPage.clickViewProductOfFirstProduct();

  // Verify product detail page and all details are visible
  await productsPage.verifyProductDetailPage();
});

