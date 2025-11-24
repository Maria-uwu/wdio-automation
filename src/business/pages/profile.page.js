const BasePage = require("./base.page");
const { ProfileComponent } = require("../components");

class ProfilePage extends BasePage {
  constructor() {
    super("/account/profile");
    this.profileComponent = new ProfileComponent();
  }
}

module.exports = ProfilePage;
