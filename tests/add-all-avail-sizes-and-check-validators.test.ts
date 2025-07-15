import test, { expect } from "@playwright/test";
import { MainMenuComponent } from "../apps/e2e/components/MainMenuComponent";
import { HeaderComponents } from "../apps/e2e/components/HeaderComponent";
import { SearchPage } from "../apps/e2e/pages/SearchPage";
import { ProductInCartComponent } from "../apps/e2e/components/ProductInCartComponent";
import { CartPage } from "../apps/e2e/pages/CartPage";
import { CreateAccountFormComponent } from "../apps/e2e/components/CreateAccountFormComponent";
import { LogonComponent } from "../apps/e2e/components/LogonComponent";
import { CreateAccountPage } from "../apps/e2e/pages/CreateAccountPage";

test(
  "TST-01: Open product category list, add all available sizes if they are more than set value, remove needed from cart and check validators in create account",
  { tag: "@search, @createAccountValidation, @cart" },
  async ({ page, context }) => {
    // test data setup
    const testOptions = {
      productName: "СУКНІ",
      numberOfNeededSizes: 4,
    };

    const mainMenuComponent = new MainMenuComponent(page);
    const searchPage = new SearchPage(page);
    const headerComponents = new HeaderComponents(page);
    const productInCartComponent = new ProductInCartComponent(page);
    const cartPage = new CartPage(page);
    const logonComponent = new LogonComponent(page);
    const createAccountFormComponent = new CreateAccountFormComponent(page);
    const createAccountPage = new CreateAccountPage(page);

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

    await test.step("Open main menu and select needed product", async () => {
      await page.goto("/ua/");
      await mainMenuComponent.openMainMenu();
      await mainMenuComponent.clickProductInMainMenu(testOptions.productName);
    });

    // const firstProductWithAvailableSizes = await searchPage.findFirstProductWithAvailableSizesMoreThan(
    //   testOptions.numberOfNeededSizes
    // );

    const firstProductWithAvailableSizes =
      await test.step("Find a first product with available sizes more than set number and store its value", async () => {
        return await searchPage.findFirstProductWithAvailableSizesMoreThan(testOptions.numberOfNeededSizes);
      });

    await test.step("Add all available sizes to the cart, then open it and remove each second product", async () => {
      await searchPage.addAllAvailableSizesToCartByNumber(firstProductWithAvailableSizes);
      await headerComponents.clickGoToCartLink();
      await productInCartComponent.removeEachSecondProductFromCart(firstProductWithAvailableSizes.numberOfSizesToClick);
    });

    await test.step("Open create a new account from the cart and check validation messages are displayed for each field", async () => {
      await cartPage.clickContinueButton();
      await logonComponent.clickButtonRegister();
      await createAccountPage.buttonCreateUserAccountClick();
      await createAccountFormComponent.checkCreateAccountFormValidators();
    });
  }
);
