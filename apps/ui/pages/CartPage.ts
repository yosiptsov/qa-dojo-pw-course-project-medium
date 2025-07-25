import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductInCartComponent } from "../components/ProductInCartComponent";

export class CartPage extends BasePage{
    productInCartComponent: ProductInCartComponent;
    private buttonContinueLocator: Locator;

    constructor(page: Page){
        super(page);
        this.productInCartComponent = new ProductInCartComponent(this.page);
        this.buttonContinueLocator = this.page.locator('button[data-qa-id="shop-continue"]');
    }

    async clickContinueButton(): Promise<void>{
        await this.buttonContinueLocator.click();
    }
}