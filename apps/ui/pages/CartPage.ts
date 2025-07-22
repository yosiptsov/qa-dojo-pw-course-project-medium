import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage{
    
    private buttonContinueLocator: Locator;

    constructor(page: Page){
        super(page);
        this.buttonContinueLocator = this.page.locator('button[data-qa-id="shop-continue"]');
    }

    async clickContinueButton(): Promise<void>{
        await this.buttonContinueLocator.click();
    }
}