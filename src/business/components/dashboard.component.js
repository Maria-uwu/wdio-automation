const BaseComponent = require("./base.component");

class DashboardComponent extends BaseComponent {
  constructor() {
    super("body");
  }
  get profile() {
    return $('[data-test="nav-profile"]');
  }
  get favorites() {
    return $('[data-test="nav-favorites"]');
  }
}

module.exports = DashboardComponent;
