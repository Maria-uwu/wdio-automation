const BaseComponent = require("./base.component");

class CheckoutComponent extends BaseComponent{
    constructor(){
        super('.container');
    }
    get cartIcon(){
        return $('[data-test="nav-cart"]')
    }

    get checkoutBtn(){
        return $('[data-test="proceed-1"]')
    }

    get checkoutBtn2(){
        return $('[data-test="proceed-2"]')
    }

    get checkoutBtn3(){
        return $('[data-test="proceed-3"]')
    }

    get confirmBtn(){
        return $('[data-test="finish"]')
    }

    get confirmPaymentMsg(){
        return $(".alert.alert-success.ng-star-inserted")
    }
    
    get successMsgOrder(){
        return $("#order-confirmation")
    }

}

module.exports = CheckoutComponent; 