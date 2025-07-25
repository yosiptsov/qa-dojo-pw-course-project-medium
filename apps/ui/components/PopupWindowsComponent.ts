import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

// export type CookiesButton = "Reject optional cookies" | "Accept all cookies";
// export type PortalSelectionButton = "Close" | "Yes, stay on United States" | "getByRole('button', { name: 'No, go to the Україна /' })";

export class PopupWindowsComponent extends BaseComponent {
  private cookiesPopupLocator: Locator;
  private portalSelectionPopupLocator: Locator;
  private optionalCookiesButtonRejectLocator: Locator;
  private portalSelectionButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.cookiesPopupLocator = this.page.getByText("We use first-party and third-");
    this.portalSelectionPopupLocator = this.page.getByText("Hello,Yes, stay on United");
    this.optionalCookiesButtonRejectLocator = this.page.locator('button#onetrust-reject-all-handler');
    this.portalSelectionButtonLocator = this.page.locator('[data-qa-action="stay-in-store"]');
    
  }

  async clickOptionalCookiesButtonIfExists(): Promise<void> {
      await this.optionalCookiesButtonRejectLocator.click();
  }

  async clickPortalSelectionButtonIfExists(): Promise<void> {
      await this.portalSelectionButtonLocator.click();
  }
}
