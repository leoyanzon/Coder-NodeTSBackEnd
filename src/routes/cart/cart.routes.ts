import { Router } from 'express';
import CartController from '../../controllers/cart/cart.controller.js'

class CartRouter {
    private cartController: CartController;

    constructor(){
        this.cartController = CartController.getInstance();
    }

    public start() : Router {
        const router = Router();
        router.get('/', this.cartController.getAll);
        router.post('/:productId', this.cartController.addProduct);
        router.post('/buyCart/:cartId', this.cartController.buyCart);
        return router;
    }
}

export default CartRouter;