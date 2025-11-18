const BaseComponent = require("./base.component");

class FavoritesComponent extends BaseComponent{
    constructor(){
        super('.container');
    }
    get favoritesOption(){
        return $('[data-test="nav-favorites"]')
    }

    get favoriteProductCard(){
        return $('[data-test^="favorite-"]')
    }

    get favoriteImg(){
        return $(".card-img")
    }
}

module.exports = FavoritesComponent; 