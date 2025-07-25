import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    
    private buttonRegisterLocator: Locator;

    constructor(page: Page){
        super(page);
        //this.buttonRegisterLocator = this.page.locator('[data-qa-id="logon-view-alternate-button"]');
        this.buttonRegisterLocator = this.page.getByRole('link', { name: 'sign up' });
    }

    async clickButtonRegister(): Promise<void>{
        await expect(this.buttonRegisterLocator).toBeVisible();
        await expect(this.buttonRegisterLocator).toBeEnabled();
        await this.buttonRegisterLocator.click();
    }
}