import { Page, expect } from '@playwright/test';

export class TestCasePage {
  //typescript shorthand - store the page Playwright gives me so my methods can use it. 
  //It creates a new instance of Page once.
  constructor(private page: Page) {}

  async testCases(){
    await this.page.getByRole('link', { name: 'Test Cases' }).first().click();

    const testCasesHeader = this.page.locator('h2', { hasText: 'Test Cases' });
    await expect(testCasesHeader).toBeVisible();

    const panelGroups = this.page.locator('div.panel-group');
    const count = await panelGroups.count();
    expect(count - 1).toBe(26);


  }
}