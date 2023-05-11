const router = require('express').Router();
const CartController = require('../../controllers/cart/cart.controller');

class CartRouter {
    constructor(){
        this.cartController = CartController.getInstance();
    }

    start() {
        router.get('/', this.cartController.getAll);
        router.post('/:productId', this.cartController.addProduct);
        router.post('/buyCart/:cartId', this.cartController.buyCart);
        return router
    }
}

module.exports = CartRouter;