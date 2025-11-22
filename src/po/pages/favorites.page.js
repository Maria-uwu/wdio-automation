const BasePage = require("./base.page");
const { FavoritesComponent } = require("../components");

class FavoritesPage extends BasePage {
  constructor() {
    super("/account/favorites");
    this.favoritesComponent = new FavoritesComponent();
  }
}

module.exports = FavoritesPage;
