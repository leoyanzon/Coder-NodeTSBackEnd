const router = require('express').Router();
const ProductsController = require('../../controllers/products/products.controller');

class ProductsRouter {
    constructor(){
        this.productsController = new ProductsController();
    }

    start() {
        router.get('/', this.productsController.getAll);
        router.get('/:id', this.productsController.getById);
        router.post('/', this.productsController.save);
        router.delete('/:id', this.productsController.deleteById);
        router.delete('/', this.productsController.deleteAll);

        return router
    }
}

module.exports = ProductsRouter;