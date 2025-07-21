import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CreateAccountPage extends BasePage {
  private buttonCreateUserAccountLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonCreateUserAccountLocator = this.page.locator('[data-qa-action="sign-up-submit"]');
  }

  async buttonCreateUserAccountClick(): Promise<void> {
    //await expect(this.buttonCreateUserAccountLocator).toBeVisible();
    await expect(this.buttonCreateUserAccountLocator).toBeEnabled();
    await this.buttonCreateUserAccountLocator.click();
  }
}
