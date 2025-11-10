const BaseComponent = require("./base.component");

class DashboardComponent extends BaseComponent{
    constructor(){
        super('body');
    }
    get userNameMenu(){
        return $('#menu')
    }
    get myProfile(){
        return $('[data-test="nav-my-profile"]')
    }
}

module.exports = DashboardComponent; 