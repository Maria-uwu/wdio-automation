const { SignupComponent, LoginComponent, DashboardComponent, ProfileComponent, HomeComponent, ProductComponent, FavoritesComponent, CheckoutComponent } = require("../components");

class BasePage{
    constructor(url){
        this.url = url;
        this.signup = new SignupComponent();
        this.login = new LoginComponent();       
        this.dashboard = new DashboardComponent();  
        this.profile = new ProfileComponent();
        this.home = new HomeComponent();
        this.product = new ProductComponent();
        this.favorites = new FavoritesComponent();
        this.checkout = new CheckoutComponent();
        

    }
    open(){
        return browser.url(this.url);
    }
}

module.exports = BasePage;