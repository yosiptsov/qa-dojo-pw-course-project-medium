import { test as base } from "@playwright/test";
import { MainMenuComponent } from "../../apps/ui/components/MainMenuComponent";
import { HeaderComponents } from "../../apps/ui/components/HeaderComponent";
import { LogonComponent } from "../../apps/ui/components/LogonComponent";
import { ProductInCartComponent } from "../../apps/ui/components/ProductInCartComponent";
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
  mainMenuComponent: MainMenuComponent;
  searchPage: SearchPage;
  headerComponents: HeaderComponents;
  productInCartComponent: ProductInCartComponent;
  cartPage: CartPage;
  logonComponent: LogonComponent;
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
      //prepare dates for cookie values:
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDay(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      );

      const page = await stealthBrowser.newPage();
      
      // // Set Accept-Language header to open site with Ukrainian localization
      // await page.setExtraHTTPHeaders({
      //   "Accept-Language": "en-US,en;q=0.9",
      //   //"Accept-Language": "uk-UA,uk;q=0.9,en;q=0.8",
      // });
      await page.goto("https://www.zara.com/us/", { waitUntil: "commit" });

      // add cookies to close popup window 'Cookies Consent'
      await page.context().addCookies([
        {
          name: "OptanonAlertBoxClosed",
          value: currentDate.toISOString(),
          domain: ".www.zara.com",
          path: "/",
          expires: expirationDate.getTime() / 1000,
          sameSite: "Lax",
        },
        {
          name: "OptanonConsent",
          value:
            "consentId=a6b5bed5-7019-4e4f-b385-b54c45fa1bdc&datestamp=Sun+Jul+13+2025+13%3A14%3A08+GMT%2B0300+(Eastern+European+Summer+Time)&version=202505.2.0&interactionCount=1&isAnonUser=1&isGpcEnabled=0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&intType=1",
          domain: ".www.zara.com",
          path: "/",
          expires: expirationDate.getTime() / 1000,
          sameSite: "Lax",
        },
        {
          name: "storepath",
          value: "us%2Fen",
          domain: ".zara.com",
          path: "/",
          expires: expirationDate.getTime() / 1000,
        },
        {
          name: "selectedRegion",
          value: "us",
          domain: ".zara.com",
          path: "/us",
          expires: expirationDate.getTime() / 1000,
        },
      ]);
      await page.context().storageState({ path: storageStatePath as string });
      await page.close();
    }
    await use(storageStatePath);
  },
  page: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();

    // Set Accept-Language header to open site with Ukrainian localization
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      //"Accept-Language": "uk-UA,uk;q=0.9,en;q=0.8",
    });

    await page.goto("/", { waitUntil: "commit" });
    await use(page);
  },
  mainMenuComponent: async ({ page }, use) => {
    const mainMenuComponent = new MainMenuComponent(page);
    await use(mainMenuComponent);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  headerComponents: async ({ page }, use) => {
    const headerComponents = new HeaderComponents(page);
    await use(headerComponents);
  },
  productInCartComponent: async ({ page }, use) => {
    const productInCartComponent = new ProductInCartComponent(page);
    await use(productInCartComponent);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  logonComponent: async ({ page }, use) => {
    const logonComponent = new LogonComponent(page);
    await use(logonComponent);
  },
  createAccountPage: async ({ page }, use) => {
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
});
