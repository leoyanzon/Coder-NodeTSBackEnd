const router = require('express').Router();
const CartController = require('../../controllers/cart/cart.controller');

class CartRouter {
    constructor(){
        this.cartController = CartController.getInstance();
    }

    start() {
        router.get('/', this.cartController.getAll);
        router.post('/:_id', this.cartController.save);
        return router
    }
}

module.exports = CartRouter;