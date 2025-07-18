import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { ProductCardComponent } from "./ProductCardComponent";

export class MainMenuComponent extends BaseComponent{
    private productCard: ProductCardComponent;
    private buttonOpenMenuLocator: Locator;

    constructor(page: Page){
        super(page);
        this.productCard = new ProductCardComponent(this.page);
        this.buttonOpenMenuLocator = this.page.locator('[data-qa-id="layout-header-toggle-menu"]');
    }
    
    async openMainMenu(): Promise<void>{
        await expect(this.buttonOpenMenuLocator).toBeVisible();
        await this.buttonOpenMenuLocator.click();
    }

    async clickProductInMainMenu(productName: string): Promise<void>{
        await expect(this.page.getByRole('link', {name: productName})).toBeVisible();
        await this.page.getByRole('link', { name: productName }).click();
        await expect(this.productCard.productMediaImageLocator.last()).toBeVisible();
    }
 }