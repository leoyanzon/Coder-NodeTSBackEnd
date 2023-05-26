import express , {  Router } from 'express';
const router : Router = express.Router();

import ProductsRestController from '../../controllers/products/products.rest.controller';

export default class ProductsRouter {
    productsRestController : ProductsRestController;

    constructor(){
        this.productsRestController = ProductsRestController.getInstance();
    }

    start() {
        router.get('/', async(req : any, res: any) => await this.productsRestController.getAll(req, res));
        router.get('/:id', async(req : any, res: any) => await this.productsRestController.getById(req, res));
        router.post('/', async(req : any, res: any) => await this.productsRestController.append(req, res));
        router.delete('/:id', async(req : any, res: any) => await this.productsRestController.deleteById(req, res));
        router.delete('/', async(req : any, res: any) => await this.productsRestController.deleteAll(req, res));

        return router
    }
}
