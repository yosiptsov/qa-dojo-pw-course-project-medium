import { expect, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class RollingCartComponent extends BaseComponent{
    private buttonCloseLocator: Locator;

    constructor(page){
        super(page);
        this.buttonCloseLocator = this.page.getByRole('button', { name: 'Закрити' });
    }

    async closeRollingCart(): Promise<void>{
        await expect(this.buttonCloseLocator).toBeEnabled();
        await expect(this.buttonCloseLocator).toBeVisible();
        await this.buttonCloseLocator.click();
    }

} 