import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class RollingCartComponent extends BaseComponent{
    private buttonCloseLocator: Locator;

    constructor(page){
        super(page);
        this.buttonCloseLocator = this.page.getByRole('button', { name: 'Закрити' });
    }

    async closeRollingCart(){
        await this.buttonCloseLocator.click();
    }

} 