import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CreateAccountPage extends BasePage {
  private buttonCreateUserAccountLocator: Locator;
  private getValidationMessageLocator = (createAccountFieldName: string) =>
    this.page.locator(
      `//input[@data-qa-input-qualifier="${createAccountFieldName}"]/..//*[contains(text(), "Required field")]`
    );

  constructor(page: Page) {
    super(page);
    this.buttonCreateUserAccountLocator = this.page.locator('[data-qa-action="sign-up-submit"]');
  }

  async buttonCreateUserAccountClick(): Promise<void> {
    //await expect(this.buttonCreateUserAccountLocator).toBeVisible();
    await expect(this.buttonCreateUserAccountLocator).toBeEnabled();
    await this.buttonCreateUserAccountLocator.click();
  }

  async checkCreateAccountFormValidators(
    createAccountFields: Array<string> = ["email", "password", "firstName", "lastName"]
  ): Promise<void> {
    for (const field of createAccountFields) {
      await expect(
        this.getValidationMessageLocator(field),
        `Validation message for field ${field} is not displayed`
      ).toBeVisible();
    }
  }
}
