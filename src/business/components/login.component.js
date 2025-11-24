const BaseComponent = require("./base.component");

class LoginComponent extends BaseComponent {
  constructor() {
    super(".container.auth-container");
  }
  get loginBtn() {
    return this.rootEl.$("[data-test='login-submit']");
  }

  /**
   * @param name {'username' | 'password'}
   * @returns
   */

  input(name) {
    const selectors = {
      email: "#email",
      password: "#password",
    };
    return this.rootEl.$(selectors[name]);
  }
  async login(email, password) {
    await this.input("email").waitForDisplayed();
    await this.input("email").setValue(email);
    await this.input("password").setValue(password);
  }

  async clickLogin() {
    await this.loginBtn.waitForClickable({ timeout: 5000 });
    await this.loginBtn.click();
  }
}

module.exports = LoginComponent;
