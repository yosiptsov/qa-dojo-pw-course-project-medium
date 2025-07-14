import { Page, Locator } from "@playwright/test";

export abstract class BasePage{
    page: Page;
    copyrightTextLocator: Locator;

    constructor(page: Page){
        this.page = page;
        this.copyrightTextLocator = this.page.getByText('© All rights reserved');
    }

    async scrollToEndOfPage(){
        await this.copyrightTextLocator.click();
    }
}