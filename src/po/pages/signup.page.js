const BasePage = require("./base.page");
const { SignupComponent } = require("../components");

class SignupPage extends BasePage {
  constructor() {
    super("/auth/register");
    this.signupComponent = new SignupComponent();
  }
}

module.exports = SignupPage;
