import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductCardComponent } from "../components/ProductCardComponent";

export class SearchPage extends BasePage {
  productCardComponent: ProductCardComponent;

  constructor(page: Page) {
    super(page);
    this.productCardComponent = new ProductCardComponent(this.page);
  }

  private async getNumberOfProductsOnPage(): Promise<number> {
    const productTilesCount = await this.productCardComponent.productMediaImageLocator.count();
    return productTilesCount;
  }

  async findFirstProductWithAvailableSizesMoreThan(numberOfAvailableSizes: number): Promise<number | string> {
    // counts number of products on page
    const getNumberOfProductsOnPage = await this.getNumberOfProductsOnPage();

    for (let i = 0; i <= getNumberOfProductsOnPage; i++) {
      await this.productCardComponent.buttonOpenSizeSelectorLocator.nth(i).click({ timeout: 5000 });
      //just in case will add an expect between opening list of sizes for different products.
      await expect(this.productCardComponent.productListOfSizesLocator).toBeVisible();

      // return the first find element with sizes > 'numberOfAvailableSizes'
      if ((await this.productCardComponent.availableSizeSelectorLocator.count()) >= numberOfAvailableSizes) {
        return i;
      }
    }
    return "No products with set number of sizes were found";
  }

  async addAllAvailableSizesToCartByNumber(productNumber: number): Promise<void> {
    await this.productCardComponent.buttonOpenSizeSelectorLocator.nth(productNumber).click();
  }
}
