const BasePage = require("./base.page");
const { LoginComponent } = require("../components");

class LoginPage extends BasePage {
  constructor() {
    super("/auth/login");
    this.loginComponent = new LoginComponent();
  }
  async waitUntilLoaded() {
    await this.loginComponent.rootEl.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Login page did not load in time"
    });
  }

  async performLogin(email, password) {
    await this.waitUntilLoaded();
    await this.loginComponent.login(email, password);
  }
}

module.exports = LoginPage;
