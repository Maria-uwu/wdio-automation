// ============================================================
// 🧭 IMPORTS Y CONFIGURACIÓN BASE
// ============================================================
import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect as wdioExpect } from "@wdio/globals";
const chai = require("chai"); // 👈 100% compatible
const { expect, assert } = chai;
chai.should();
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
  const actions = {
    Login: () => pages("login").loginComponent.clickLogin(),
    Register: () => pages("signup").signupComponent.clickRegister(),
    Save: () => pages("profile").profileComponent.clickSave(),
    "Add to cart": async () => {
      const product = pages("product").product;
      const exists = await product.carQuantityNumber.isExisting();

      // Guardamos el contador inicial (si existe)
      this.initialCartCount = exists
        ? parseInt(await product.carQuantityNumber.getText(), 10)
        : 0;

      console.log(`🛒 Contador inicial: ${this.initialCartCount}`);

      // Ejecutar la acción
      await pages("product").productComponent.clickAddToCart();
    },
    "Add to favorites": async () =>
      pages("product").productComponent.clickAddToFavorites(),
  };

  const action = actions[buttonText];
  if (!action) throw new Error(`Unknown button: ${buttonText}`);

  await action();
  //await browser.pause(5000); // pausa 5 segundos
});

Then("the user should be redirected to the Login page", async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    { timeout: 7000, timeoutMsg: "Expected to be redirected to the Login page" }
  );
  expect(await browser.getUrl()).to.contain("/auth/login");
});

// ============================================================
// 🧩 BACKGROUND/SCENARIO 2: Login before user actions
// ============================================================

Given("the user is on the login page", async () => {
  await pages("login").open();
  await pages("login").waitUntilLoaded();
});

When("the user enters a valid email and password", async () => {
  const { email, password } = JSON.parse(
    fs.readFileSync(sessionDataPath, "utf8")
  );
  await pages("login").performLogin(email, password);
});

Then("the user should see the dashboard", async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    {
      timeout: 7000,
      timeoutMsg: "Expected to be redirected to the Dashboard page",
    }
  );
  wdioExpect(await browser.getUrl()).toContain("/account");
  /*await browser.waitUntil(
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
  expect(await browser.getUrl()).toContain("/account");*/
});

Then("their name should appear in the navigation bar", async () => {
  const dashboard = pages("dashboard").dashboard;

  // Espera condicional solo para Safari
  const browserName = (await browser.capabilities.browserName).toLowerCase();
  if (browserName.includes("safari")) {
    await browser.pause(5000); //  da tiempo extra
  }

  await dashboard.userNameMenu.waitForDisplayed({
    timeout: 45000,
    timeoutMsg: "#menu (userNameMenu) no apareció en el tiempo esperado",
  });

  const text = await dashboard.userNameMenu.getText();
  expect(text.length).to.be.greaterThan(0);
  expect(text.toLowerCase()).to.include(testData.user.firstName.toLowerCase());
});

// ============================================================
// 🧩 SCENARIO 3: User updates profile information
// ============================================================

Given("the user is logged in and on the Profile page", async () => {
  await pages("dashboard").open();
  await pages("dashboard").dashboard.userNameMenu.waitForDisplayed();
  await pages("dashboard").dashboard.userNameMenu.click();
  await pages("dashboard").dashboard.userNameMenu.waitForClickable({
    timeout: 5000,
  });
  await pages("dashboard").dashboard.myProfile.click();
});

When("the user updates their phone number and address", async () => {
  const profile = pages("profile").profileComponent;
  await browser.pause(1500);

  //await profile.input("phone").waitForDisplayed();
  await profile.input("phone").clearValue();
  await profile.input("phone").setValue(testData.updatedProfile.phone);
  await profile.input("street").clearValue();
  await profile.input("street").setValue(testData.updatedProfile.street);
});

Then("a confirmation message should be displayed", async () => {
  const profile = pages("profile").profileComponent;
  await profile.successMsg.waitForDisplayed({ timeout: 5000 });
  const text = await profile.successMsg.getText();
  text.should.include("successfully");
  //expect(text.toLowerCase()).toContain("successfully");
});

Then("the updated information should be visible in the profile", async () => {
  const profile = pages("profile").profileComponent;
  const expectedPhone = "3209876543";
  const expectedStreet = "Calle 123 #45-67, Bogotá";

  await profile.input("phone").waitForDisplayed();
  await profile.input("street").waitForDisplayed();

  await browser.waitUntil(
    async () =>
      (await profile.input("phone").getValue()) === expectedPhone &&
      (await profile.input("street").getValue()) === expectedStreet,
    {
      timeout: 10000,
      interval: 500,
      timeoutMsg: "❌ Los valores del perfil no se actualizaron correctamente",
    }
  );

  const phoneValue = await profile.input("phone").getValue();
  const streetValue = await profile.input("street").getValue();

  //expect(phoneValue).toBe(expectedPhone);
  //expect(streetValue).toBe(expectedStreet);
  expect(phoneValue, "❌ El número de teléfono no coincide").to.equal(
    expectedPhone
  );
  expect(streetValue, "❌ La dirección no coincide").to.equal(expectedStreet);
});

// ============================================================
// 🧩 SCENARIO 4: User adds a product to favorites
// ============================================================


/*Then("a success message should be displayed", async () => {
  const product = pages("product").product;

  await product.toastMessage.waitForDisplayed({ timeout: 5000 });
  await browser.pause(5000);

  const toastText = (await product.toastMessage.getText()).trim();
  console.log(toastText);

  toastText.should.not.be.empty;
  toastText.should.contain.oneOf([
    "added to your favorites",
    "added to shopping cart",
    "successfully",
    "Product already in your favorites"
  ]);

  console.log(`✅ Success message displayed: "${toastText}"`);
});*/
Then("a success message should be displayed", async () => {
  const product = pages("product").product;
  await product.toastMessage.waitForDisplayed({ timeout: 8000 });
  await browser.pause(5000);
  const toastText = (await product.toastMessage.getText()).trim();

  console.log(`✅ Success message visible: "${toastText}"`);
  expect(toastText.length > 0, "❌ No se mostró ningún mensaje de éxito").to.be.true;
});


Then("the product should appear in My favorites", async () => {
  await pages("dashboard").open();
  await pages("dashboard").dashboard.userNameMenu.waitForDisplayed();
  await pages("dashboard").dashboard.userNameMenu.click();

  const favorites = pages("favorites").favoritesComponent;
  await favorites.favoritesOption.click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account/favorites"),
    {
      timeout: 10000,
      timeoutMsg: "La URL no cambió a /account/favorites",
    }
  );

  await favorites.favoriteProductCard.waitForDisplayed({ timeout: 5000 });

  const productName = await favorites.favoriteProductCard.getText();
  const productImg = favorites.favoriteImg;

  expect(productName).to.contain("Combination Pliers");

  const isImageVisible = await productImg.isDisplayed();
  expect(isImageVisible).to.be.true;
});
// ============================================================
// 🧩 SCENARIO 5: User adds a product to the basket
// ============================================================

Given("the user is viewing a product details page", async () => {
  await pages("home").open();
  await pages("home").home.firstProduct.waitForDisplayed();
  await pages("home").home.firstProduct.click();
});

Then("the basket counter should increase by one", async () => {
  /*const product = pages("product").product;
  await product.carQuantityNumber.waitForDisplayed();

  const count = parseInt(await product.carQuantityNumber.getText(), 10);
  expect(count).toBeGreaterThan(0);*/
  const product = pages("product").product;

  await product.carQuantityNumber.waitForExist({
    timeout: 8000,
    timeoutMsg: "❌ El contador del carrito nunca apareció",
  });

  const newCount = parseInt(await product.carQuantityNumber.getText(), 10);
  const oldCount = this.initialCartCount ?? 0;

  console.log(`📊 Contador: ${oldCount} → ${newCount}`);

  // 🧪 Validación con Chai
  expect(
    newCount,
    "❌ El contador del carrito no incrementó"
  ).to.be.greaterThan(oldCount);
  expect(newCount).to.be.a("number");

  console.log(
    `✅ Basket counter incrementó correctamente: ${oldCount} → ${newCount}`
  );
});

// ============================================================
// 🧩 SCENARIO 6: User adds a product to favorites
// ============================================================

When("the user proceeds to checkout", async () => {
  const checkout = pages("checkout").checkoutComponent;
  await checkout.cartIcon.waitForDisplayed({ timeout: 5000 });
  await checkout.cartIcon.click();
  await checkout.checkoutBtn.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn.click();
  await checkout.checkoutBtn2.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn2.click();

  //const cartIcon = await $('[data-test="nav-cart"]');
  //await cartIcon.waitForDisplayed();
  //await cartIcon.click();
  //const checkoutBtn = await $('[data-test="proceed-1"]');
  //await checkoutBtn.waitForDisplayed({ timeout: 7000 });
  //await checkoutBtn.click();
  //const checkoutBtn2 = await $('[data-test="proceed-2"]');
  //await checkoutBtn2.waitForDisplayed({ timeout: 7000 });
  //await checkoutBtn2.click();
});

When("enters valid shipping information", async () => {
  //await $('[data-test="street"]').setValue("Calle 123 #45-67");
  //await $('[data-test="city"]').setValue("Bogotá");
  //await $('[data-test="state"]').setValue("Cundinamarca");
  //await $('[data-test="country"]').setValue("Colombia");
  //await $('[data-test="postal_code"]').setValue("122345");

  const checkout = pages("checkout").checkoutComponent;
  await checkout.checkoutBtn3.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn3.click();

  //const checkoutBtn3 = await $('[data-test="proceed-3"]');
  //await checkoutBtn3.waitForDisplayed({ timeout: 7000 });
  //await checkoutBtn3.click();
});

When("enters valid payment information", async () => {
  await $("#payment-method").selectByVisibleText("Cash on Delivery");

  const checkout = pages("checkout").checkoutComponent;
  await checkout.confirmBtn.waitForDisplayed({ timeout: 5000 });
  await checkout.confirmBtn.click();

  await checkout.confirmPaymentMsg.waitForDisplayed({ timeout: 5000 });
  await checkout.confirmBtn.click();

  //const confirmBtn = await $('[data-test="finish"]');
  //await confirmBtn.waitForDisplayed({ timeout: 7000 });
  //await confirmBtn.click();

  //const confirmPaymentMsg = await $(".alert.alert-success.ng-star-inserted");
  //await confirmPaymentMsg.waitForDisplayed();
  //await confirmBtn.click();
});

Then("the order should be placed successfully", async () => {
  const checkout = pages("checkout").checkoutComponent;
  await checkout.successMsgOrder.waitForDisplayed({ timeout: 5000 });

  //const successMsg = await $("#order-confirmation");
  //await successMsg.waitForDisplayed();
});

// ============================================================
// 🧩 SCENARIO 7: User searchs a product
// ============================================================

Given("the user is in the home page", async () => {
  await pages("home").open();
  await pages("home").home.firstProduct.waitForDisplayed();
});

When("the user types {string} into the search bar", async (productName) => {
  const home = pages("home").homeComponent;
  await home.searchInput.waitForDisplayed({ timeout: 5000 });

  //const searchInput = await $('[data-test="search-query"]');
  //await searchInput.waitForDisplayed({ timeout: 5000 });
  await home.searchInput.setValue(productName);
});

When("clicks the search icon", async () => {
  const home = pages("home").homeComponent;
  await home.searchBtn.waitForDisplayed({ timeout: 5000 });
  await home.searchBtn.click();

  //const searchBtn = await $('[data-test="search-submit"]');
  //await searchBtn.waitForClickable({ timeout: 5000 });
  //await searchBtn.click();
});

Then(
  "the search results should display only the {string} product",
  async (expectedProduct) => {
    const home = pages("home").homeComponent;
    await home.resultsContainer.waitForDisplayed({ timeout: 5000 });

    //const resultsContainer = await $('[data-test="search_completed"]');
    //await resultsContainer.waitForDisplayed({ timeout: 7000 });

    const productTitles = await home.productTitles;
    expect(productTitles.length).to.be.greaterThan(0);

    //const productTitles = await $$('[data-test="product-name"]');
    //expect(productTitles.length).toBeGreaterThan(0);

    for (const title of productTitles) {
      const text = (await title.getText()).trim();
      expect(text.toLowerCase()).to.contain(expectedProduct.toLowerCase());
    }
  }
);

// ============================================================
// 🧩 SCENARIO 8: User changes language
// ============================================================

When(
  "the user selects a different language from the language dropdown",
  async () => {
    const home = pages("home").homeComponent;
    await home.langDropdown.waitForDisplayed({ timeout: 5000 });
    await home.langDropdown.click();

    await home.spanishOption.waitForDisplayed({ timeout: 5000 });
    await home.spanishOption.click();

    //const langDropdown = await $('[data-test="language-select"]');
    //await langDropdown.waitForDisplayed({ timeout: 5000 });
    //await langDropdown.click();

    //const spanishOption = await $('[data-test="lang-es"]');
    //await spanishOption.waitForDisplayed({ timeout: 5000 });
    //await spanishOption.click();
  }
);

Then("the interface text should change to Spanish", async () => {
  const home = pages("home").homeComponent;
  await home.navbar.waitForDisplayed({ timeout: 5000 });

  //const navbar = await $("nav");
  //await navbar.waitForDisplayed({ timeout: 7000 });

  await browser.waitUntil(
    async () => {
      const text = (await home.navbar.getText()).toLowerCase();
      return text.includes("inicio");
    },
    {
      timeout: 10000,
      timeoutMsg: "El idioma no cambió a español dentro del tiempo esperado",
    }
  );

  /*await browser.waitUntil(
    async () => {
      const text = (await navbar.getText()).toLowerCase();
      return text.includes("inicio");
    },
    {
      timeout: 10000,
      timeoutMsg: "El idioma no cambió a español dentro del tiempo esperado",
    }
  );*/

  const finalText = (await home.navbar.getText()).toLowerCase();
  // 1️⃣ Assert — validación fuerte
  assert.include(
    finalText,
    "inicio",
    "❌ No se encontró el texto 'Inicio' en la interfaz"
  );

  // 2️⃣ Should — estilo más legible tipo lenguaje natural
  finalText.should.not.include("home", "❌ Aún aparece texto en inglés");
  finalText.should.match(
    /inicio|categorías|contacto/,
    "❌ No se detectó ningún texto en español"
  );
  //expect(finalText.toLowerCase()).to.contain("inicio");

  //const finalText = await navbar.getText();
  //expect(finalText.toLowerCase()).toContain("inicio");
});

Then("the language preference should remain active after refresh", async () => {
  await browser.refresh();
  await browser.pause(2000);

  const home = pages("home").homeComponent;
  await home.homeLink.waitForDisplayed({ timeout: 5000 });

  //const homeLink = await $("=Inicio");
  //await homeLink.waitForDisplayed({ timeout: 7000 });

  const text = (await home.homeLink.getText()).trim();
  expect(text).to.contain("Inicio");

  //const text = (await homeLink.getText()).trim();
  //expect(text).toContain("Inicio");
});
