const BaseComponent = require("./base.component");

class SignupComponent extends BaseComponent{
    constructor(){
        super('.container.auth-container');
    }
    get registernBtn(){
        return this.rootEl.$('#btnSubmit.mb-3')
    }

    /**
     * @param name {'firstName' | 'lastName' | 'dateOfBirth' | 'street' | 'postalCode' | 'city' | 'state' | 'country' | 'email' | 'password' }  
     * @returns 
     */

    input(name){
        const selectors = {
            firstName: '#first_name',
            lastName: '#last_name',
            dateOfBirth: '#dob',
            street: '#street',
            postalCode: '#postal_code',
            city: '#city',
            state: '#state',
            country: '#country',
            phone: '#phone',
            email: '#email',
            password: '#password'   
        };
        return this.rootEl.$(selectors[name]); 
    }
}

module.exports = SignupComponent; 