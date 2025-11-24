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
  console.log(`🧾 Producto en favoritos: "${productName}"`);
  console.log(`🎯 Producto esperado: "${global.selectedProductName}"`);
  expect(productName.toLowerCase()).to.include(
    global.selectedProductName.toLowerCase(),
    `❌ El producto "${global.selectedProductName}" no se encontró en favoritos`
  );
  const isImageVisible = await productImg.isDisplayed();
  expect(isImageVisible, "❌ La imagen del producto no se muestra").to.be.true;
});
