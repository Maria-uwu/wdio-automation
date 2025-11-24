class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }

  get cartIcon() {
    return $('[data-test="nav-cart"]');
  }

  get userNameMenu() {
    return $("#menu");
  }

  get myProfile() {
    return $('[data-test="nav-my-profile"]');
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

  get carQuantityNumber() {
    return $('[data-test="cart-quantity"]');
  }
}

module.exports = BaseComponent;
