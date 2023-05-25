import express , {  Router } from 'express';
const router : Router = express.Router();

import ProductsRestController from '../../controllers/products/products.rest.controller';

export default class ProductsRouter {
    productsRestController : ProductsRestController;

    constructor(){
        this.productsRestController = ProductsRestController.getInstance();
    }

    start() {
        router.get('/', () => this.productsRestController.getAll);
        router.get('/:id', () => this.productsRestController.getById);
        router.post('/', () => this.productsRestController.append);
        router.delete('/:id', () => this.productsRestController.deleteById);
        router.delete('/', () => this.productsRestController.deleteAll);

        return router
    }
}
