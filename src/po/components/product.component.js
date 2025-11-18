const BaseComponent = require("./base.component");

class ProductComponent extends BaseComponent {
  constructor() {
    super(".container");
  }

  get addToCartBtn() {
    return $('[data-test="add-to-cart"]');
  }

  get addToFavoritesBtn() {
    return $('[data-test="add-to-favorites"]');
  }

  get carQuantityNumber() {
    return $('[data-test="cart-quantity"]');
  }

  get toastMessage() {
    return $("#toast-container");
  }

  async clickAddToCart() {
    await this.addToCartBtn.waitForClickable({ timeout: 5000 });
    await this.addToCartBtn.click();
  }

  async clickAddToFavorites() {
    await this.addToFavoritesBtn.waitForClickable({ timeout: 5000 });
    await this.addToFavoritesBtn.click();
  }
}

module.exports = ProductComponent;
