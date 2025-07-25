import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export type CookiesButton = "Reject optional cookies" | "Accept all cookies";
export type PortalSelectionButton = "Close" | "Yes, stay on United States" | "getByRole('button', { name: 'No, go to the Україна /' })";

export class PopupWindowsComponent extends BaseComponent {
  private cookiesPopupLocator: Locator;
  private portalSelectionPopupLocator: Locator;
  private portalSelectionPopupCloseLocator: Locator;
  private portalSelectionYesLocator: Locator;
  private portalSelectionNoLocator: Locator;

  private async optionalCookiesButtonLocator(CookiesButtonName: CookiesButton): Promise<Locator> {
    return this.page.getByRole("button", { name: `${CookiesButtonName}` });
  }

private async portalSelectionButtonLocator(PortalSelectionButtonName: PortalSelectionButton): Promise<Locator> {
    return this.page.getByRole("button", { name: `${PortalSelectionButtonName}` });
  }

  constructor(page: Page) {
    super(page);
    this.cookiesPopupLocator = this.page.getByText("We use first-party and third-");
    this.portalSelectionPopupLocator = this.page.getByText("Hello,Yes, stay on United");
  }

  private async isCookiesPopupVisible(): Promise<boolean> {
    return await this.cookiesPopupLocator.isVisible();
  }

  private async isPortalSelectionPopupVisible(): Promise<boolean> {
    return await this.portalSelectionPopupLocator.isVisible();
  }

  async clickOptionalCookiesButton(CookiesButtonName: CookiesButton): Promise<void> {
    if (await this.isCookiesPopupVisible()) {
      const cookieButtonLocator = await this.optionalCookiesButtonLocator(CookiesButtonName);
      await cookieButtonLocator.click();
    }
  }

  async clickPortalSelectionButton(PortalSelectionButtonName: PortalSelectionButton): Promise<void> {
    if (await this.isPortalSelectionPopupVisible()) {
      const portalSelectionButtonLocator = await this.portalSelectionButtonLocator(PortalSelectionButtonName);
      await portalSelectionButtonLocator.click();
    }
  }

}
