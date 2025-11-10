const BasePage = require("./base.page");
const { DashboardComponent } = require('../components');

class DashboardPage extends BasePage{
    
    constructor(){
        super('/account');
        this.dashboardComponent = new DashboardComponent();
    }
}

module.exports = DashboardPage;