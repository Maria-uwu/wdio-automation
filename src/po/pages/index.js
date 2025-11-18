const SignupPage = require("./signup.page");
const LoginPage = require('./login.page');
const DashboardPage = require('./dashboard.page');
const ProfilePage = require('./profile.page');
const HomePage = require('./home.page');
const ProductPage = require('./product.page');
const FavoritesPage = require('./favorites.page');
const CheckoutPage = require('./checkout.page');

/**
 * @param name {'signup | login | dashboard | profile | home | product | favorites | checkout'}  
 * @returns {SignupPage | LoginPage | DashboardPage | ProfilePage | HomePage | ProductPage | FavoritesPage | CheckoutPage}
 */

function pages (name){
     const items = {
         signup: new SignupPage(),
         login: new LoginPage(),
         dashboard: new DashboardPage(),
         profile: new ProfilePage(),
         home: new HomePage(),
         product: new ProductPage(),
         favorites: new FavoritesPage(),
         checkout: new CheckoutPage(),

     }
     return items[name.toLowerCase()];
}

module.exports = {
    SignupPage,
    LoginPage,
    DashboardPage,
    ProfilePage,
    HomePage,
    ProductPage,
    CheckoutPage,
    pages, 
}