const { SignupComponent, LoginComponent, DashboardComponent, ProfileComponent, HomeComponent, ProductComponent } = require("../components");

class BasePage{
    constructor(url){
        this.url = url;
        this.signup = new SignupComponent();
        this.login = new LoginComponent();       
        this.dashboard = new DashboardComponent();  
        this.profile = new ProfileComponent();
        this.home = new HomeComponent();
        this.product = new ProductComponent();

    }
    open(){
        return browser.url(this.url);
    }
}

module.exports = BasePage;