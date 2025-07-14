import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { RollingCartComponent } from '../components/RollingCartComponent';

export class SearchPage extends BasePage {
  private productCardComponent: ProductCardComponent;
  private rollingCartComponent: RollingCartComponent;

  constructor(page: Page) {
    super(page);
    this.productCardComponent = new ProductCardComponent(this.page);
    this.rollingCartComponent = new RollingCartComponent(this.page);
  }

  private async getNumberOfProductsOnPage(): Promise<number> {
    const productTilesCount = await this.productCardComponent.productMediaImageLocator.count();
    return productTilesCount;
  }

  async findFirstProductWithAvailableSizesMoreThan(numberOfAvailableSizes: number): Promise<number | string> {
    // counts number of products on page
    const getNumberOfProductsOnPage = await this.getNumberOfProductsOnPage();

    for (let i = 0; i < getNumberOfProductsOnPage; i++) {
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
    await this.productCardComponent.productPriceLocator.nth(productNumber).click();
    
    const numberOfAvailableSizes = await this.productCardComponent.availableSizeSelectorLocator.count();
    for(let i=0; i < numberOfAvailableSizes; i++){
        await this.productCardComponent.buttonOpenSizeSelectorLocator.nth(productNumber).click();
        await this.productCardComponent.availableSizeSelectorLocator.nth(i).click();
        await this.rollingCartComponent.closeRollingCart();
        console.log(i);
        console.log(numberOfAvailableSizes);
    }
  }
}
