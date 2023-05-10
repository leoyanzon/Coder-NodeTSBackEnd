const express = require('express');
const router = express.Router();

const config = require('../config/config');

const infoRouter = require('./info/info.routes');
const sessionRouter = require('./session/session.routes');

const PagesRouter = require('./pages/pages.routes');
const ProductsRouter = require('./products/products.routes');
const CartRouter = require('./cart/cart.routes');

const multerRouter = require('./multer/multer.routes')

router.get("/health", async(req, res)=>{

    res.status(200).json({
        success: true,
        health:'up',
        environment: config.server.ENVIRONMENT || "not found"
    })
})
router.use('/info', infoRouter);


router.use('/api/auth', sessionRouter );
router.use('/uploads', multerRouter);

router.use('/', (new PagesRouter).start() );

//See API Json
router.use('/api/products', (new ProductsRouter).start());
router.use('/api/cart', (new CartRouter).start())


class Router{
    constructor(){
        return router
    }
}

module.exports = Router;