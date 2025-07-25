import { Locator, Page } from "@playwright/test";
import { ProductCardComponent } from "./ProductCardComponent";

export class ProductInCartComponent extends ProductCardComponent {
  private removeOrderProductLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.removeOrderProductLocator = page.locator("[data-qa-id=remove-order-item-unit]");
  }

  async removeOrderItemByNumber(productNumber: number): Promise<void> {
    this.removeOrderProductLocator.nth(productNumber).click();
  }

  async removeEachSecondProductFromCart(numberOfProducts: number): Promise<void>{
    // count how many time we need to click Remove to delete each second product
    const numberOfTimesToClickRemove = numberOfProducts / Math.trunc(2);
    for(let i = 0; i < numberOfTimesToClickRemove; i++){
      await this.removeOrderProductLocator.nth(1).click();
    }
  }
}
