const BaseComponent = require("./base.component");

class HomeComponent extends BaseComponent {
  constructor() {
    super(".container");
  }
  get firstProduct() {
    return $(".card-img-top");
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

  get langDropdown() {
    return $('[data-test="language-select"]');
  }

  get spanishOption() {
    return $('[data-test="lang-es"]');
  }

  get navbar() {
    return $("nav");
  }

  get homeLink() {
    return $("=Inicio");
  }
}

module.exports = HomeComponent;
