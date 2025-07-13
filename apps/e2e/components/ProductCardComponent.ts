import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class ProductCardComponent extends BaseComponent {
  // properties
  buttonOpenSizeSelectorLocator: Locator;
  availableSizeSelectorLocator: Locator;
  productMediaImageLocator: Locator;
  productListOfSizesLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonOpenSizeSelectorLocator = this.page.locator("[data-qa-action=product-grid-open-size-selector]");
    this.availableSizeSelectorLocator = this.page.locator("[data-qa-action=size-in-stock]");
    this.productMediaImageLocator = this.page.locator("[data-qa-qualifier=media-image]");
    this.productListOfSizesLocator = this.page.locator("[class=size-selector-sizes]");
  }
}
