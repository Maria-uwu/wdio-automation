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

Given("the user is in the home page", async () => {
  const home = pages("home").home;
  await pages("home").open();
  await browser.waitUntil(async () => (await home.productCards).length > 0, {
    timeout: 10000,
    timeoutMsg: "❌ No se encontraron productos en la página principal",
  });
  console.log(
    `🏠 Usuario en Home: ${await (
      await home.productCards
    ).length} productos visibles`
  );
});

When("the user types {string} into the search bar", async (productName) => {
  const home = pages("home").homeComponent;
  await home.searchInput.waitForDisplayed({ timeout: 5000 });
  await home.searchInput.setValue(productName);
});

When("clicks the search icon", async () => {
  const home = pages("home").homeComponent;
  await home.searchBtn.waitForDisplayed({ timeout: 5000 });
  await home.searchBtn.click();
});

Then(
  "the search results should display only the {string} product",
  async (expectedProduct) => {
    const home = pages("home").homeComponent;
    await home.resultsContainer.waitForDisplayed({ timeout: 5000 });
    const productTitles = await home.productTitles;
    expect(productTitles.length).to.be.greaterThan(0);
    for (const title of productTitles) {
      const text = (await title.getText()).trim();
      expect(text.toLowerCase()).to.contain(expectedProduct.toLowerCase());
    }
  }
);
