import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
import { ProductCardComponent } from "./ProductCardComponent";

export class MainMenuComponent extends BaseComponent {
  private productCard: ProductCardComponent;
  private buttonOpenMenuLocator: Locator;
  private buttonCloseMenuLocator: Locator;

  private getProductInMenuLocator = (productName: string) => this.page.getByRole("link", { name: productName, exact: true });

  constructor(page: Page) {
    super(page);
    this.productCard = new ProductCardComponent(this.page);
    this.buttonOpenMenuLocator = this.page.locator('[data-qa-id="layout-header-toggle-menu"]');
    this.buttonCloseMenuLocator = this.page.locator('[data-qa-id="layout-header-close-menu"]');
  }

  async openMainMenuAndSelectProduct(productName: string, maxRetries: number = 3): Promise<void> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await this.buttonOpenMenuLocator.click({ timeout: 3000 });
        await this.getProductInMenuLocator(productName).click({ timeout: 3000 });
        await expect(this.productCard.productMediaImageLocator.last()).toBeVisible();
        break;
      } catch (error) {
        if (attempt === maxRetries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }
}
