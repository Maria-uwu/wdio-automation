const BasePage = require("./base.page");
const { CheckoutComponent } = require("../components");

class CheckoutPage extends BasePage {
  constructor() {
    super("/checkout");
    this.checkoutComponent = new CheckoutComponent();
  }
}

module.exports = CheckoutPage;
