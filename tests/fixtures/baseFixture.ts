import { test as base } from "@playwright/test";
import { HomePage } from "../../apps/ui/pages/HomePage";
import { LoginPage } from "../../apps/ui/pages/LoginPage";
import { CartPage } from "../../apps/ui/pages/CartPage";
import { CreateAccountPage } from "../../apps/ui/pages/CreateAccountPage";
import { SearchPage } from "../../apps/ui/pages/SearchPage";

import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import type { Browser, Page } from "playwright";

import fs from "fs";

// Configure plugins
chromium.use(stealth());

type Pages = {
  homePage: HomePage;
  searchPage: SearchPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  createAccountPage: CreateAccountPage;
  // this is for stealth browser
  stealthBrowser: Browser;
};

export const test = base.extend<Pages>({
  stealthBrowser: async ({}, use) => {
    const browser = await chromium.launch({
      args: ["--disable-blink-features=AutomationControlled", "--disable-features=VizDisplayCompositor"],
    });
    await use(browser);
    await browser.close();
  },
  storageState: async ({ stealthBrowser }, use) => {
    const storageStatePath = ".auth/cookies.json";
    const isStorageStateFileExist = fs.existsSync(storageStatePath);

    if (!isStorageStateFileExist) {
      const page = await stealthBrowser.newPage();
      const homePage = new HomePage(page);

      await page.goto("https://www.zara.com/us/", { waitUntil: "commit" });
      await homePage.popupWindowsComponent.clickOptionalCookiesButtonIfExists();
      await homePage.popupWindowsComponent.clickPortalSelectionButtonIfExists();

      await page.context().storageState({ path: storageStatePath as string });
      await page.close();
    }
    await use(storageStatePath);
  },
  page: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();

    // Set Accept-Language header to open site with USA localization
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.goto("/us/", { waitUntil: "commit" });
    await use(page);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  loginPage: async ({ page }, use) => {
    const logonComponent = new LoginPage(page);
    await use(logonComponent);
  },
  createAccountPage: async ({ page }, use) => {
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
});
