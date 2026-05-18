import { Page, expect } from '@playwright/test';

export class Helpers {
  constructor(private page: Page) {}

  async selectDate(
    day: number,
    month: number,
    year: number
  ): Promise<void> {
    await this.page.selectOption('[data-qa="days"]', String(day));
    await this.page.selectOption('[data-qa="months"]', String(month));
    await this.page.selectOption('[data-qa="years"]', String(year));
  }

  async selectCountry(name: string): Promise<void> {
    await this.page.selectOption('[data-qa="country"]', name);
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(this.page.getByRole('heading', { name: 'ACCOUNT DELETED!' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}