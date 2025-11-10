const SignupPage = require("./signup.page");
const LoginPage = require('./login.page');
const DashboardPage = require('./dashboard.page');
const ProfilePage = require('./profile.page');
const HomePage = require('./home.page');
const ProductPage = require('./product.page');

/**
 * @param name {'signup | login | dashboard | profile | home | product'}  
 * @returns {SignupPage | LoginPage | DashboardPage | ProfilePage | HomePage | ProductPage}
 */

function pages (name){
     const items = {
         signup: new SignupPage(),
         login: new LoginPage(),
         dashboard: new DashboardPage(),
         profile: new ProfilePage(),
         home: new HomePage(),
         product: new ProductPage(),
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
    pages, 
}