const BaseComponent = require("./base.component");

class LoginComponent extends BaseComponent{
    constructor(){
        super('.container.auth-container');
    }
    get loginBtn(){
        return this.rootEl.$('#btnSubmit')
    }

    /**
     * @param name {'username' | 'password'}  
     * @returns 
     */

    input(name){
        const selectors = {
            email: '#email',
            password: '#password'   
        };
        return this.rootEl.$(selectors[name]); 
    }
}

module.exports = LoginComponent; 