import { Router } from 'express';
import CartController from '../../controllers/cart/cart.controller.js'

class CartRouter {
    public cartController: CartController;

    constructor(){
        this.cartController = CartController.getInstance();
    }

    public start() : Router {
        const router = Router();
        router.get('/', async(req : any, res : any) => await this.cartController.getAll(req, res));
        router.post('/:productId', async(req : any, res : any) => await this.cartController.addProduct(req, res));
        router.post('/buyCart/:cartId', async(req : any, res : any) => await this.cartController.buyCart(req, res));
        return router;
    }
}

export default CartRouter;