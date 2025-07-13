import { Page } from "@playwright/test";

export abstract class BaseComponent{
    protected page: Page;

    constructor (page: Page){
        this.page = page;
    }
}