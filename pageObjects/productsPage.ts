import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async navigateToAllProducts() {
    // Click on Products button
    await this.page.getByRole('link', { name: 'Products' }).click();

    // Verify user is navigated to ALL PRODUCTS page successfully
    await expect(this.page.getByRole('heading', { name: 'ALL PRODUCTS' })).toBeVisible();
  }

  async verifyProductsListVisible() {
    // The products list is visible
    const productsList = this.page.locator('div.single-products');
    await expect(productsList.first()).toBeVisible();
  }

  async clickViewProductOfFirstProduct() {
    // Click on View Product of first product
    const firstProductViewButton = this.page.getByRole('link', { name: 'View Product' }).first();
    await firstProductViewButton.click();
  }

  async verifyProductDetailPage() {
    // User is landed to product detail page
    await expect(this.page.getByRole('heading', { name: 'Category' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Brands' })).toBeVisible();

    // Verify that detail is visible: product name, category, price, availability, condition, brand
    await expect(this.page.locator('div.product-information h2')).toBeVisible(); // Product name
    //await this.page.locator('input[name="title"][value="Mr"]').check();
    await expect(this.page.getByText('Category:')).toBeVisible();
    await expect(this.page.getByText('Availability:')).toBeVisible();
    await expect(this.page.getByText('Condition:')).toBeVisible();
    await expect(this.page.getByText('Brand:')).toBeVisible();
  }
}
