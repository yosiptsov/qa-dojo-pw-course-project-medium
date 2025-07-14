import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { RollingCartComponent } from '../components/RollingCartComponent';

export type Product = {
    productNumber: number,
    numberOfSizesToClick: number;
}
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

  //async findFirstProductWithAvailableSizesMoreThan(numberOfAvailableSizes: number): Promise<Array<number> | undefined> {
  async findFirstProductWithAvailableSizesMoreThan(numberOfAvailableSizes: number): Promise<Product> {
    // products are loaded in chunks by 28 items, so we need to scroll down of the page to load all products.
    //? Is it ok to use a function from the BasePage class in such a way?
    await this.scrollToEndOfPage();
    
    // let's counts number of products on page to know maximum for the loop
    const getNumberOfProductsOnPage = await this.getNumberOfProductsOnPage();
    // check each product sequentially to find the first one which has set number of sizes
    for (let i = 0; i < getNumberOfProductsOnPage; i++) {
      await this.productCardComponent.buttonOpenSizeSelectorLocator.nth(i).click({ timeout: 5000 });
      //just in case will add an expect between opening list of sizes for different products.
      await expect(this.productCardComponent.productListOfSizesLocator).toBeVisible();

      // return the first find element with sizes > 'numberOfAvailableSizes'
      let currentProdSizes = await this.productCardComponent.availableSizeSelectorLocator.count();
      if (currentProdSizes >= numberOfAvailableSizes) {
        // return position and sizes quantity
        return { productNumber: i, numberOfSizesToClick: currentProdSizes }
      }
    }
    throw new Error('No products with set number of sizes were found.');
  }


  async addAllAvailableSizesToCartByNumber(product: Product): Promise<void> {
    // products are loaded in chunks by 28 items, so we need to scroll down of the page to load all products.
    await this.scrollToEndOfPage();
    
    // open the product card and add all available sizes
    for(let i=0; i < product.numberOfSizesToClick; i++){
        await this.productCardComponent.buttonOpenSizeSelectorLocator.nth(product.productNumber).click();
        await this.productCardComponent.availableSizeSelectorLocator.nth(i).click();
        await this.rollingCartComponent.closeRollingCart();
    }
  }
}
