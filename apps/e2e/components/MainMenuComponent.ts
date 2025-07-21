import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { ProductCardComponent } from "./ProductCardComponent";

export class MainMenuComponent extends BaseComponent {
  private productCard: ProductCardComponent;
  private buttonOpenMenuLocator: Locator;

  private getProductInMenuLocator = (productName: string) => this.page.getByRole("link", { name: productName });

  constructor(page: Page) {
    super(page);
    this.productCard = new ProductCardComponent(this.page);
    this.buttonOpenMenuLocator = this.page.locator('[data-qa-id="layout-header-toggle-menu"]');
  }

  async openMainMenu(): Promise<void> {
    await expect(this.buttonOpenMenuLocator).toBeVisible();
    await expect(this.buttonOpenMenuLocator).toBeEnabled();
    await this.buttonOpenMenuLocator.click();
  }

  async clickProductInMainMenu(productName: string, maxRetries: number = 3): Promise<void> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await this.getProductInMenuLocator(productName).click();
        await expect(this.productCard.productMediaImageLocator.last()).toBeVisible();
        break;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt === maxRetries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }
}
