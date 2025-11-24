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

When("the user proceeds to checkout", async () => {
  const checkout = pages("checkout").checkoutComponent;
  await checkout.cartIcon.waitForDisplayed({ timeout: 5000 });
  await checkout.cartIcon.click();
  await checkout.checkoutBtn.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn.click();
  await checkout.checkoutBtn2.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn2.click();
});

When("enters valid shipping information", async () => {
  const checkout = pages("checkout").checkoutComponent;
  await checkout.checkoutBtn3.waitForDisplayed({ timeout: 5000 });
  await checkout.checkoutBtn3.click();
});

When("enters valid payment information", async () => {
  await $("#payment-method").selectByVisibleText("Cash on Delivery");
  const checkout = pages("checkout").checkoutComponent;
  await checkout.confirmBtn.waitForDisplayed({ timeout: 5000 });
  await checkout.confirmBtn.click();
  await checkout.confirmPaymentMsg.waitForDisplayed({ timeout: 5000 });
  await checkout.confirmBtn.click();
});

Then("the order should be placed successfully", async () => {
  const checkout = pages("checkout").checkoutComponent;
  await checkout.successMsgOrder.waitForDisplayed({ timeout: 5000 });
});
