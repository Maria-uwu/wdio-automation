const BaseComponent = require("./base.component");

class ProductComponent extends BaseComponent{
    constructor(){
        super('.container');
    }
    get addToCartBtn(){
        return $('[data-test="add-to-cart"]')
    }

    get carQuantityNumber(){
        return $('[data-test="cart-quantity"]')
    }

    get toastMessage(){
        return $('#toast-container')
    }
}

module.exports = ProductComponent; 