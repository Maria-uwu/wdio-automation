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

When(
  "the user selects a different language from the language dropdown",
  async () => {
    const home = pages("home").homeComponent;
    await home.langDropdown.waitForDisplayed({ timeout: 5000 });
    await home.langDropdown.click();
    await home.spanishOption.waitForDisplayed({ timeout: 5000 });
    await home.spanishOption.click();
  }
);

Then("the interface text should change to Spanish", async () => {
  const home = pages("home").homeComponent;
  await home.navbar.waitForDisplayed({ timeout: 5000 });
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
  const finalText = (await home.navbar.getText()).toLowerCase();
  assert.include(
    finalText,
    "inicio",
    "❌ No se encontró el texto 'Inicio' en la interfaz"
  );
  finalText.should.not.include("home", "❌ Aún aparece texto en inglés");
  finalText.should.match(
    /inicio|categorías|contacto/,
    "❌ No se detectó ningún texto en español"
  );
});

Then("the language preference should remain active after refresh", async () => {
  await browser.refresh();
  await browser.pause(2000);
  const home = pages("home").homeComponent;
  await home.homeLink.waitForDisplayed({ timeout: 5000 });
  const text = (await home.homeLink.getText()).trim();
  expect(text).to.contain("Inicio");
});
