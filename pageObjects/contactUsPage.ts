import { Page, expect } from '@playwright/test';
import path from 'path';

export class ContactUs {
  //typescript shorthand - store the page Playwright gives me so my methods can use it. 
  //It creates a new instance of Page once.

  constructor(private page: Page) {}

  async contactUs(){
    await this.page.getByRole('link', { name: 'Contact Us' }).click();
    await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();

    await this.page.locator('input[data-qa="name"]').fill('Dave SJ Williams');
    await this.page.locator('input[data-qa="email"]').fill('davesjwilliams03@yahoo.co.uk');
    await this.page.locator('input[data-qa="subject"]').fill('Playwright Contact Test');
    await this.page.locator('textarea[data-qa="message"]').fill('This is a test message for the contact form.');

    const uploadFilePath = path.resolve('test-data/example-file1.txt');
    await this.page.setInputFiles('input[name="upload_file"]', uploadFilePath);
    
    // Indicates a dialog is expected and prevents the test from failing due to an unhandled dialog.
    //    dialog.accept automatically accepts the dialog and clicks 'OK' when it appears.
    this.page.once('dialog', async dialog => {
        await dialog.accept();
    });
    await this.page.locator('input[name="submit"]').click();

    await expect(this.page.locator('div.status.alert.alert-success', {
        hasText: 'Success! Your details have been submitted successfully.',
    })).toBeVisible();

    await this.page.locator('a.btn.btn-success:has-text("Home")').click();
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.page.getByRole('heading', { name: 'CATEGORY' })).toBeVisible();
 }
}