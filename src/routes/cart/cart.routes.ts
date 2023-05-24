import { Router } from 'express';
import CartController from '../../controllers/cart/cart.controller.js'

class CartRouter {
    private cartController: CartController;

    constructor(){
        this.cartController = CartController.getInstance();
    }

    public start() : Router {
        const router = Router();
        router.get('/', async(req, res) => this.cartController.getAll);
        router.post('/:productId', async(req, res) => this.cartController.addProduct);
        router.post('/buyCart/:cartId', async(req, res) => this.cartController.buyCart);
        return router;
    }
}

export default CartRouter;