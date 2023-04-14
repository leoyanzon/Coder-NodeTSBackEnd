const router = require('express').Router();
const ProductsRestController = require('../../controllers/products/products.rest.controller');

class ProductsRouter {
    constructor(){
        this.productsRestController = ProductsRestController.getInstance();
    }

    start() {
        router.get('/', this.productsRestController.getAll);
        router.get('/:id', this.productsRestController.getById);
        router.post('/', this.productsRestController.save);
        router.delete('/:id', this.productsRestController.deleteById);
        router.delete('/', this.productsRestController.deleteAll);

        return router
    }
}

module.exports = ProductsRouter;