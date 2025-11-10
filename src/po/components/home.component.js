const BaseComponent = require("./base.component");

class HomeComponent extends BaseComponent{
    constructor(){
        super('.container');
    }
    get firstProduct(){
        return $('.card-img-top')
    }
}

module.exports = HomeComponent; 