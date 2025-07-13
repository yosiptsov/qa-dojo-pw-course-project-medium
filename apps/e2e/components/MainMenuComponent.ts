import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { ProductCardComponent } from "./ProductCardComponent";

export class MainMenuComponent extends BaseComponent{
    productCard: ProductCardComponent;

    constructor(page: Page){
        super(page);
        this.productCard = new ProductCardComponent(this.page);
    }
    
    async openMainMenu(){
        await this.page.getByRole('button', { name: 'Відкрити меню' }).click();
    }

    async clickProductInMainMenu(productName: string){
        await this.page.getByRole('link', { name: productName }).click();
        //await expect(this.productCard.productMediaImage.nth(0)).toBeVisible();
        await expect(this.productCard.productMediaImageLocator.last()).toBeVisible();
    }
 }