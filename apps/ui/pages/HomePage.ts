import { BasePage } from "./BasePage";
import { MainMenuComponent } from '../components/MainMenuComponent';
import { Page } from "@playwright/test";

export class HomePage extends BasePage{
    public mainMenuComponent: MainMenuComponent;

    constructor(page: Page) {
        super(page);
        this.mainMenuComponent = new MainMenuComponent(this.page);
    }

}