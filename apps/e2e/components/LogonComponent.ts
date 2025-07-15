import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class LogonComponent extends BaseComponent{
    
    private buttonRegisterLocator: Locator;

    constructor(page: Page){
        super(page);
        this.buttonRegisterLocator = this.page.locator('[data-qa-id="logon-view-alternate-button"]');
    }

    async clickButtonRegister(): Promise<void>{
        await expect(this.buttonRegisterLocator).toBeVisible();
        await expect(this.buttonRegisterLocator).toBeEnabled();
        await this.buttonRegisterLocator.click();
    }
}