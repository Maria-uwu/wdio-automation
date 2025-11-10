const BasePage = require("./base.page");
const { LoginComponent } = require('../components');

class LoginPage extends BasePage{
    
    constructor(){
        super('/auth/login');
        this.loginComponent = new LoginComponent();
    }
}

module.exports = LoginPage;