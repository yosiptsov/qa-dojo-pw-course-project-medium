import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class HeaderComponents extends BaseComponent{
    goToCartLink: Locator;

    constructor(page){
        super(page);
    }
}