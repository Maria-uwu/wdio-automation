const BaseComponent = require("./base.component");

class ProfileComponent extends BaseComponent{
    constructor(){
        super('body');
    }
    get updateBtn(){
        return $('[data-test="update-profile-submit"]')
    }
    get successMsg(){
        return $('.alert.alert-success.mt-3')
    }

    /**
     * @param name {'username' | 'password'}  
     * @returns 
     */

    input(name){
        const selectors = {
            firstName: '#first_name',
            lastName: '#last_name',
            email: '#email',
            phone: '#phone',
            street: '#street',
            postalCode: '#postal_code',
            city: '#city',
            state: '#state',
            country: '#country',
        };
        return this.rootEl.$(selectors[name]); 
    }
}

module.exports = ProfileComponent; 