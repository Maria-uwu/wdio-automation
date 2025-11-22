const BaseComponent = require("./base.component");

class HomeComponent extends BaseComponent {
  constructor() {
    super(".container");
  }

  /*get firstProduct() {
    return $(".card-img-top");
  }*/
  get productCards() {
    return $$(".card-img-top");
  }

  async clickRandomProduct() {
    await browser.waitUntil(
      async () => (await $$(".card-img-top")).length > 0,
      {
        timeout: 10000,
        timeoutMsg: "❌ No se encontraron productos en el home",
      }
    );
    const products = await $$(".card-img-top");
    const titles = await $$(".card-title");
    console.log(`📦 Se encontraron ${products.length} productos`);
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    const selectedTitle = await titles[randomIndex].getText();
    global.selectedProductName = selectedTitle;
    console.log(`🛍️ Producto aleatorio seleccionado: índice ${randomIndex}`);
    await randomProduct.scrollIntoView();
    await randomProduct.waitForDisplayed({ timeout: 5000 });
    await randomProduct.click();
  }

  get searchInput() {
    return $('[data-test="search-query"]');
  }

  get searchBtn() {
    return $('[data-test="search-submit"]');
  }

  get resultsContainer() {
    return $('[data-test="search_completed"]');
  }

  get productTitles() {
    return $$('[data-test="product-name"]');
  }
}

module.exports = HomeComponent;
