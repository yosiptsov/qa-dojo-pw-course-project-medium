import test, { expect } from "@playwright/test";
import { MainMenuComponent } from "../apps/e2e/components/MainMenuComponent";
import { HeaderComponents } from "../apps/e2e/components/HeaderComponent";
import { SearchPage } from "../apps/e2e/pages/SearchPage";
import { ProductInCartComponent } from '../apps/e2e/components/ProductInCartComponent';

test("open zara and add cookies", async ({ page, context }) => {
  // test data setup
  const testOptions = {
    productName: "КАРДИГАНИ | СВЕТРИ",
    numberOfNeededSizes: 4,
  };
  const mainMenuComponent = new MainMenuComponent(page);
  const searchPage = new SearchPage(page);
  const headerComponents = new HeaderComponents(page);
  const productInCartComponent = new ProductInCartComponent(page);

  await page.goto("/", { waitUntil: "commit" });

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

  // add cookies to close popup window 'Cookies Consent'
  await context.addCookies([
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
  ]);

  await page.goto("/ua/");
  await mainMenuComponent.openMainMenu();
  await mainMenuComponent.clickProductInMainMenu(testOptions.productName);
  const firstProductWithAvailableSizes = await searchPage.findFirstProductWithAvailableSizesMoreThan(
    testOptions.numberOfNeededSizes
  );
  
  await searchPage.addAllAvailableSizesToCartByNumber(firstProductWithAvailableSizes);
  await headerComponents.clickGoToCartLink();
  await productInCartComponent.removeEachSecondProductFromCart(firstProductWithAvailableSizes.numberOfSizesToClick);


  //const productTilesCount = await searchPage.getNumberOfProductsOnPage();
  //console.log(productTilesCount);
  //const productTilesCount = await page.locator('[data-qa-action=product-grid-open-size-selector]').count();
  //console.log(productTilesCount);
});
