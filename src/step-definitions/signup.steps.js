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

Then("the user should be redirected to the Login page", async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/auth/login"),
    { timeout: 7000, timeoutMsg: "Expected to be redirected to the Login page" }
  );
  expect(await browser.getUrl()).to.contain("/auth/login");
});
