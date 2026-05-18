import { Page, expect } from '@playwright/test';
import { Helpers } from '../helpers/Helpers';

export class LoginOrSignupPage {
  //typescript shorthand - store the page Playwright gives me so my methods can use it. 
  //It creates a new instance of Page once.

  constructor(private page: Page, private helpers: Helpers) {}

  async loginOrSignupUser(action: string, value1: string, value2: string){     
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    
    if(action == 'Login' || action == 'invLogin'){
      let emailAddress = value1;
      let password = value2;
      await this.loginUser(action, emailAddress, password)
    }

    if(action == 'Signup' || action == 'exLogin'){
      let name = value1;
      let emailAddress = value2;
      await this.signupUser(action, name, emailAddress)
    }
  }

  async loginUser(action: string, emailAddress: string, password: string){
    await this.page.locator('[data-qa="login-email"]').fill(emailAddress);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();

    if(action == 'invLogin'){
      await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
    }else{
      if(action == 'Login'){
        const link = this.page.locator('a').filter({ hasText: 'Logged in as' });
        await expect(link).toContainText('Logged in as Dave Williams');
      }
    }
  }

  async signupUser(action: string, name: string, emailAddress: string){
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(emailAddress);
    await this.page.getByRole('button', { name: 'Signup' }).click();

    if(action == 'exLogin'){
      await expect(this.page.getByText('Email Address already exist!')).toBeVisible();
      return;
    }
  
    await expect(this.page.getByRole('heading', { name: 'ENTER ACCOUNT INFORMATION' })).toBeVisible();
    
    await expect(this.page.locator('[data-qa="name"]')).toHaveValue(name) 
    await expect(this.page.locator('[data-qa="email"]')).toHaveValue(emailAddress) 

    await this.page.locator('input[name="title"][value="Mr"]').check();
    await this.page.locator('[id="password"]').fill('password');
      
    await this.helpers.selectDate(1, 3, 1999)

    await this.page.locator('[data-qa="first_name"]').fill('Dave');
    await this.page.locator('[data-qa="last_name"]').fill('Williams');
    await this.page.locator('[data-qa="company"]').fill('British Aerospace');
    await this.page.locator('[data-qa="address"]').fill('00 No Such Street');
    await this.page.locator('[data-qa="address2"]').fill('Noplace');

    await this.helpers.selectCountry('Canada'); 

    await this.page.locator('[data-qa="state"]').fill('South Yorkshire');
    await this.page.locator('[data-qa="city"]').fill('Rotherham');
    await this.page.locator('[data-qa="zipcode"]').fill('A11 0AB');
    await this.page.locator('[data-qa="mobile_number"]').fill('07941122333');

    await this.page.getByRole('button', { name: 'Create Account' }).click();

    await expect(this.page.getByRole('heading', { name: 'ACCOUNT CREATED' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();

    const link = this.page.locator('a').filter({ hasText: 'Logged in as' });
    await expect(link).toContainText(`Logged in as ${name}`);
  }

  async logOut(){
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  }
}