const BaseComponent = require("./base.component");

class SignupComponent extends BaseComponent {
  constructor() {
    super(".container.auth-container");
  }
  get registerBtn() {
    return this.rootEl.$("[data-test='register-submit']");
  }

  /**
   * @param name {'firstName' | 'lastName' | 'dateOfBirth' | 'street' | 'postalCode' | 'city' | 'state' | 'country' | 'email' | 'password' }
   * @returns
   */

  input(name) {
    const selectors = {
      firstName: "#first_name",
      lastName: "#last_name",
      dateOfBirth: "#dob",
      street: "#street",
      postalCode: "#postal_code",
      city: "#city",
      state: "#state",
      country: "#country",
      phone: "#phone",
      email: "#email",
      password: "#password",
    };
    return this.rootEl.$(selectors[name]);
  }
  async clickRegister() {
    await this.registerBtn.waitForClickable({ timeout: 5000 });
    await this.registerBtn.click();
  }
}

module.exports = SignupComponent;
