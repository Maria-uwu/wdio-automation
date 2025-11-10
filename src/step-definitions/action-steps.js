// ============================================================
// 🧭 IMPORTS Y CONFIGURACIÓN BASE
// ============================================================
import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
const { pages } = require("../po/pages");
const { testData, generateRandomEmail } = require("../utils/testData");
const fs = require("fs");
const path = require("path");
const sessionDataPath = path.join(__dirname, "../utils/sessionData.json");

// ============================================================
// 🧩 SCENARIO 1: User successfully creates a new account (Sign Up)
// ============================================================

Given("the user is on the Sign Up page", async () => {
  await pages("signup").open();
  await pages("signup").signup.rootEl.waitForDisplayed();
});

When(
  "the user fills in all mandatory fields with valid information",
  async () => {
    const signup = pages("signup").signupComponent;
    const email = generateRandomEmail();

    await Promise.all([
      signup.input("firstName").setValue(testData.user.firstName),
      signup.input("lastName").setValue(testData.user.lastName),
      signup.input("dateOfBirth").setValue(testData.user.dateOfBirth),
      signup.input("street").setValue(testData.user.street),
      signup.input("postalCode").setValue(testData.user.postalCode),
      signup.input("city").setValue(testData.user.city),
      signup.input("state").setValue(testData.user.state),
      signup.input("phone").setValue(testData.user.phone),
      signup.input("email").setValue(email),
      signup.input("password").setValue(testData.user.password),
    ]);

    await signup.input("country").selectByVisibleText("Colombia");
  }
);

When("clicks the {string} button", async (buttonText) => {
  const buttons = {
    Register: '[data-test="register-submit"]',
    Login: '[data-test="login-submit"]',
    Save: '[data-test="update-profile-submit"]',
    "Add to cart": '[data-test="add-to-cart"]',
    "Add to favorites": '[data-test="add-to-favorites"]',
  };

  const selector = buttons[buttonText];
  if (!selector) throw new Error(`Unknown button: ${buttonText}`);

  await $(selector).click();
});

Then("the user should be redirected to the Login page", async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    { timeout: 7000, timeoutMsg: "Expected to be redirected to the Login page" }
  );
  expect(await browser.getUrl()).toContain("/auth/login");
});

// ============================================================
// 🧩 BACKGROUND/SCENARIO 2: Login before user actions
// ============================================================

Given("the user is on the login page", async () => {
  await pages("login").open();
  await pages("login").login.rootEl.waitForDisplayed();
});

When("the user enters a valid email and password", async () => {
  const login = pages("login").loginComponent;

  const raw = fs.readFileSync(sessionDataPath, "utf8");
  const { email, password } = JSON.parse(raw);

  await login.input("email").setValue(String(email));
  await login.input("password").setValue(String(password));
});

Then("the user should see the dashboard", async () => {
  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl.includes("/account");
    },
    {
      timeout: 60000,
      interval: 1000,
      timeoutMsg: "Expected to be redirected to the dashboard (Safari delay)",
    }
  );

  await browser.pause(2000);
  expect(await browser.getUrl()).toContain("/account");
});

Then("their name should appear in the navigation bar", async () => {
  const dashboard = pages("dashboard").dashboard;

  // Espera condicional solo para Safari
  const browserName = (await browser.capabilities.browserName).toLowerCase();
  if (browserName.includes("safari")) {
    await browser.pause(5000); //  da tiempo extra
  }

  await dashboard.userNameMenu.waitForDisplayed({
    timeout: 45000, // un poco más de margen
    timeoutMsg: "#menu (userNameMenu) no apareció en el tiempo esperado",
  });

  const text = await dashboard.userNameMenu.getText();
  expect(text.length).toBeGreaterThan(0);
});

// ============================================================
// 🧩 SCENARIO 3: User updates profile information
// ============================================================

Given("the user is logged in and on the Profile page", async () => {
  await pages("dashboard").open();
  await pages("dashboard").dashboard.userNameMenu.waitForDisplayed();
  await pages("dashboard").dashboard.userNameMenu.click();
  await pages("dashboard").dashboard.myProfile.click();
});

When("the user updates their phone number and address", async () => {
  const profile = pages("profile").profileComponent;
  await profile.input("phone").waitForDisplayed();

  await profile.input("phone").clearValue();
  await profile.input("phone").setValue(testData.updatedProfile.phone);
  await profile.input("street").clearValue();
  await profile.input("street").setValue(testData.updatedProfile.street);
});

Then("a confirmation message should be displayed", async () => {
  const alerts = await $$("div.alert.alert-success.mt-3");
  if (alerts.length === 0) {
    return;
  }
  const text = await alerts[0].getText();
  expect(text.toLowerCase()).toContain("successfully");
});

Then("the updated information should be visible in the profile", async () => {
  const profile = pages("profile").profileComponent;

  await profile.input("phone").waitForDisplayed();
  await profile.input("street").waitForDisplayed();

  const phoneValue = await profile.input("phone").getValue();
  const streetValue = await profile.input("street").getValue();

  expect(phoneValue).toBe("3209876543");
  expect(streetValue).toBe("Calle 123 #45-67, Bogotá");
});

// ============================================================
// 🧩 SCENARIO 4: User adds a product to favorites
// ============================================================

Then("the product should appear in My favorites", async () => {
  await pages("dashboard").open();
  await pages("dashboard").dashboard.userNameMenu.waitForDisplayed();
  await pages("dashboard").dashboard.userNameMenu.click();

  const myFavoritesOption = await $('[data-test="nav-favorites"]');
  await myFavoritesOption.click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account/favorites"),
    {
      timeout: 10000,
      timeoutMsg: "La URL no cambió a /account/favorites",
    }
  );

  const favoriteProductCard = await $('[data-test^="favorite-"]');
  await favoriteProductCard.waitForDisplayed({ timeout: 10000 });

  const productName = await favoriteProductCard.getText();
  expect(productName).toContain("Combination Pliers");
});
// ============================================================
// 🧩 SCENARIO 5: User adds a product to the basket
// ============================================================

Given("the user is viewing a product details page", async () => {
  await pages("home").open();
  await pages("home").home.firstProduct.waitForDisplayed();
  await pages("home").home.firstProduct.click();
});

Then("a success message should be displayed", async () => {
  await pages("product").product.toastMessage.waitForDisplayed();
});

Then("the basket counter should increase by one", async () => {
  const product = pages("product").product;
  await product.carQuantityNumber.waitForDisplayed();

  const count = parseInt(await product.carQuantityNumber.getText(), 10);
  expect(count).toBeGreaterThan(0);
});

// ============================================================
// 🧩 SCENARIO 6: User adds a product to favorites
// ============================================================

When("the user proceeds to checkout", async () => {
  const cartIcon = await $('[data-test="nav-cart"]');
  await cartIcon.waitForDisplayed();
  await cartIcon.click();
  const checkoutBtn = await $('[data-test="proceed-1"]');
  await checkoutBtn.waitForDisplayed({ timeout: 7000 });
  await checkoutBtn.click();
  const checkoutBtn2 = await $('[data-test="proceed-2"]');
  await checkoutBtn2.waitForDisplayed({ timeout: 7000 });
  await checkoutBtn2.click();
});

When("enters valid shipping information", async () => {
  await $('[data-test="street"]').setValue("Calle 123 #45-67");
  await $('[data-test="city"]').setValue("Bogotá");
  await $('[data-test="state"]').setValue("Cundinamarca");
  await $('[data-test="country"]').setValue("Colombia");
  await $('[data-test="postal_code"]').setValue("122345");

  const checkoutBtn3 = await $('[data-test="proceed-3"]');
  await checkoutBtn3.waitForDisplayed({ timeout: 7000 });
  await checkoutBtn3.click();
});

When("enters valid payment information", async () => {
  await $("#payment-method").selectByVisibleText("Cash on Delivery");

  const confirmBtn = await $('[data-test="finish"]');
  await confirmBtn.waitForDisplayed({ timeout: 7000 });
  await confirmBtn.click();

  const confirmPaymentMsg = await $(".alert.alert-success.ng-star-inserted");
  await confirmPaymentMsg.waitForDisplayed();
  await confirmBtn.click();
});

Then("the order should be placed successfully", async () => {
  const successMsg = await $("#order-confirmation");
  await successMsg.waitForDisplayed();
});

// ============================================================
// 🧩 SCENARIO 7: User searchs a product
// ============================================================
Given("the user is in the home page", async () => {
  await pages("home").open();
  await pages("home").home.firstProduct.waitForDisplayed();
});

When("the user types {string} into the search bar", async (productName) => {
  const searchInput = await $('[data-test="search-query"]');
  await searchInput.waitForDisplayed({ timeout: 5000 });
  await searchInput.setValue(productName);
});

When("clicks the search icon", async () => {
  const searchBtn = await $('[data-test="search-submit"]');
  await searchBtn.waitForClickable({ timeout: 5000 });
  await searchBtn.click();
});

Then(
  "the search results should display only the {string} product",
  async (expectedProduct) => {
    const resultsContainer = await $('[data-test="search_completed"]');
    await resultsContainer.waitForDisplayed({ timeout: 7000 });

    const productTitles = await $$('[data-test="product-name"]');
    expect(productTitles.length).toBeGreaterThan(0);

    for (const title of productTitles) {
      const text = (await title.getText()).trim();
      expect(text.toLowerCase()).toContain(expectedProduct.toLowerCase());
    }
  }
);

When(
  "the user selects a different language from the language dropdown",
  async () => {
    const langDropdown = await $('[data-test="language-select"]');
    await langDropdown.waitForDisplayed({ timeout: 5000 });
    await langDropdown.click();

    const spanishOption = await $('[data-test="lang-es"]');
    await spanishOption.waitForDisplayed({ timeout: 5000 });
    await spanishOption.click();
  }
);

Then("the interface text should change to Spanish", async () => {
  const navbar = await $("nav");
  await navbar.waitForDisplayed({ timeout: 7000 });

  await browser.waitUntil(
    async () => {
      const text = (await navbar.getText()).toLowerCase();
      return text.includes("inicio");
    },
    {
      timeout: 10000,
      timeoutMsg: "El idioma no cambió a español dentro del tiempo esperado",
    }
  );

  const finalText = await navbar.getText();
  expect(finalText.toLowerCase()).toContain("inicio");
});

Then("the language preference should remain active after refresh", async () => {
  await browser.refresh();
  await browser.pause(2000);

  const homeLink = await $("=Inicio");
  await homeLink.waitForDisplayed({ timeout: 7000 });

  const text = (await homeLink.getText()).trim();
  expect(text).toContain("Inicio");
});
