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
});

Then("their name should appear in the navigation bar", async () => {
  const dashboard = pages("dashboard").dashboard;
  const browserName = (await browser.capabilities.browserName).toLowerCase();
  if (browserName.includes("safari")) {
    await browser.pause(5000);
  }
  await dashboard.userNameMenu.waitForDisplayed({
    timeout: 45000,
    timeoutMsg: "#menu (userNameMenu) no apareció en el tiempo esperado",
  });
  const text = await dashboard.userNameMenu.getText();
  expect(text.length).to.be.greaterThan(0);
  expect(text.toLowerCase()).to.include(testData.user.firstName.toLowerCase());
});
