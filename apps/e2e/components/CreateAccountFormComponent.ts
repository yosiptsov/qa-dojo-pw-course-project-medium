import { expect, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class CreateAccountFormComponent extends BaseComponent {
  
    private getValidationMessageLocator = (createAccountFieldName: string) =>
    this.page.locator(
      `//input[@data-qa-input-qualifier="${createAccountFieldName}"]/..//*[contains(text(), "Required field")]`
    );

  constructor(page: Page) {
    super(page);
  }

  async checkCreateAccountFormValidators(createAccountFields: Array<string> = ['email', 'password', 'firstName', 'lastName']): Promise<void>{
    for(const field of createAccountFields){
        await expect(this.getValidationMessageLocator(field), `Validation message for field ${field} is not displayed`).toBeVisible();
    }
  }
}
