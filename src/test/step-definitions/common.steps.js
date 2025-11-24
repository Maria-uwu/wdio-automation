import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect as wdioExpect } from "@wdio/globals";
const chai = require("chai"); // 👈 100% compatible
const { expect, assert } = chai;
chai.should();
const { pages } = require("../../business/pages");
const { testData, generateRandomEmail } = require("../../core/utils/testData");
const fs = require("fs");
const path = require("path");
const sessionDataPath = path.join(__dirname, "../../core/utils/sessionData.json");

When("clicks the {string} button", async (buttonText) => {
  const actions = {
    Login: () => pages("login").loginComponent.clickLogin(),
    Register: () => pages("signup").signupComponent.clickRegister(),
    Save: () => pages("profile").profileComponent.clickSave(),
    "Add to cart": async () => {
      const product = pages("product").product;
      const exists = await product.carQuantityNumber.isExisting();
      this.initialCartCount = exists
        ? parseInt(await product.carQuantityNumber.getText(), 10)
        : 0;
      console.log(`🛒 Contador inicial: ${this.initialCartCount}`);
      await pages("product").productComponent.clickAddToCart();
    },
    "Add to favorites": async () =>
      pages("product").productComponent.clickAddToFavorites(),
  };
  const action = actions[buttonText];
  if (!action) throw new Error(`Unknown button: ${buttonText}`);
  await action();
});

Then("a success message should be displayed", async () => {
  const product = pages("product").product;
  const toast = product.toastMessage;
  // Espera a que el contenedor exista
  await toast.waitForExist({ timeout: 10000 });
  console.log("⏳ Esperando que aparezca el toast...");
  // Espera a que sea visible
  await browser.waitUntil(async () => await toast.isDisplayed(), {
    timeout: 10000,
    interval: 300,
    timeoutMsg: "❌ El toast nunca fue visible (ni siquiera fugazmente)",
  });
  console.log("✅ Toast detectado (aparición confirmada)");
  // Captura texto o estado visible como validación mínima
  let toastText = "";
  try {
    toastText = (await toast.getText()).trim();
  } catch {
    toastText = "(sin texto visible, validado por existencia)";
  }
  console.log(`🎉 Toast validado: ${toastText}`);
  expect(await toast.isExisting(), "❌ No se encontró el toast").to.be.true;
});
