class CartDTO {
    constructor(cartData){
        this._id = cartData._id;
        this.userId = cartData.userId;
        this.products = cartData.products;
        this.completed = cartData.completed;
    }

    build(){
        return this;
    };
}

module.exports = CartDTO;