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

Given("the user is viewing a product details page", async () => {
  const home = pages("home").home;
  await pages("home").open();
  await home.clickRandomProduct();
});

Then("the basket counter should increase by one", async () => {
  const product = pages("product").product;
  await product.carQuantityNumber.waitForExist({
    timeout: 8000,
    timeoutMsg: "❌ El contador del carrito nunca apareció",
  });
  const newCount = parseInt(await product.carQuantityNumber.getText(), 10);
  const oldCount = this.initialCartCount ?? 0;
  console.log(`📊 Contador: ${oldCount} → ${newCount}`);
  expect(
    newCount,
    "❌ El contador del carrito no incrementó"
  ).to.be.greaterThan(oldCount);
  expect(newCount).to.be.a("number");
  console.log(
    `✅ Basket counter incrementó correctamente: ${oldCount} → ${newCount}`
  );
});
