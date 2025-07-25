import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class HeaderComponent extends BaseComponent{
    private goToCartLink: Locator;

    constructor(page: Page){
        super(page);
        this.goToCartLink = this.page.locator("[data-qa-id=layout-header-go-to-cart]")
    }

    async clickGoToCartLink(): Promise<void>{
       await this.goToCartLink.click();
    }
}