const express = require('express');
const router = express.Router();

const config = require('../loaders/config.loader')();

const infoRouter = require('./info/info.routes');
const sessionRouter = require('./session/session.routes');

const PagesRouter = require('./pages/pages.routes');
const ProductsRouter = require('./products/products.routes');
const CartRouter = require('./cart/cart.routes').default;

const multerRouter = require('./multer/multer.routes')
class RouterClass{
    constructor(){
        //General info Routers
        router.use('/info', infoRouter);
        router.get("/health", async(req, res)=>{
            res.status(200).json({
                success: true,
                health:'up',
                environment: config.server.ENVIRONMENT || "not found"
            })
        })

        //Autentication router
        router.use('/api/auth', sessionRouter );

        //Client HTML Router
        router.use('/', (new PagesRouter).start() );

        //API Routers
        router.use('/api/products', (new ProductsRouter).start());
        router.use('/api/cart', (new CartRouter).start())

        //Services Router
        router.use('/uploads', multerRouter);
        return router
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new Router();
        }
        return this.instance
    }

}

module.exports = RouterClass;