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
});

Then("the updated information should be visible in the profile", async () => {
  const profile = pages("profile").profileComponent;
  const expectedPhone = testData.updatedProfile.phone;
  const expectedStreet = testData.updatedProfile.street;
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
  expect(phoneValue, "❌ El número de teléfono no coincide").to.equal(
    expectedPhone
  );
  expect(streetValue, "❌ La dirección no coincide").to.equal(expectedStreet);
});
