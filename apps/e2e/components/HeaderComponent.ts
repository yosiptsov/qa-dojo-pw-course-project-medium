import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class HeaderComponents extends BaseComponent{
    private goToCartLink: Locator;

    constructor(page){
        super(page);
        this.goToCartLink = this.page.locator("[data-qa-id=layout-header-go-to-cart]")
    }

    async clickGoToCartLink(){
       await this.goToCartLink.click();
    }
}