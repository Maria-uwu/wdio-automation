const BasePage = require("./base.page");
const { HomeComponent } = require("../components");

class HomePage extends BasePage {
  constructor() {
    super("/");
    this.homeComponent = new HomeComponent();
  }
}

module.exports = HomePage;
