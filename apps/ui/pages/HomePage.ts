import { BasePage } from "./BasePage";
import { MainMenuComponent } from '../components/MainMenuComponent';
import { PopupWindowsComponent } from '../components/PopupWindowsComponent';
import { Page } from "@playwright/test";

export class HomePage extends BasePage{
    public mainMenuComponent: MainMenuComponent;
    public popupWindowsComponent: PopupWindowsComponent;

    constructor(page: Page) {
        super(page);
        this.mainMenuComponent = new MainMenuComponent(this.page);
        this.popupWindowsComponent = new PopupWindowsComponent(this.page);
    }

}