const BasePage = require("./base.page");
const { ProductComponent } = require("../components");

class ProductPage extends BasePage {
  constructor() {
    super("/product/01K9G5B4XGMJHSGM13DDQKFP9Y");
    this.productComponent = new ProductComponent();
  }
}

module.exports = ProductPage;
