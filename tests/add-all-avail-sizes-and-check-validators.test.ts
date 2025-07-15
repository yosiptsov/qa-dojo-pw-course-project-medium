import { expect } from "@playwright/test";
import { test } from './fixtures/baseFixture'

test.use({});

test(
  "TST-01: Open product category list, add all available sizes if they are more than set value, remove needed from cart and check validators in create account",
  { tag: "@search, @createAccountValidation, @cart" },
  async ({ mainMenuComponent, searchPage, headerComponents, productInCartComponent, cartPage, logonComponent, createAccountFormComponent, createAccountPage }) => {
    
    // test data setup
    const testOptions = {
      productName: "СУКНІ",
      numberOfNeededSizes: 4,
    };

    await test.step("Open main menu and select needed product", async () => {
      await mainMenuComponent.openMainMenu();
      await mainMenuComponent.clickProductInMainMenu(testOptions.productName);
    });

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
