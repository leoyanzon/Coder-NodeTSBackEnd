const express = require('express');
const router = express.Router();

const config = require('../config/config');

const PagesRouter = require('./pages/pages.routes');
const ProductsRouter = require('./products/products.routes');
const sessionRouter = require('./session/session.routes');
const infoRouter = require('./info/info.routes');
const childProcessRouter = require('./childProcess/childProcess.routes')
const multerRouter = require('./multer/multer.routes')

router.get("/health", async(req, res)=>{

    res.status(200).json({
        success: true,
        health:'up',
        environment: config.server.ENVIRONMENT || "not found"
    })
})

router.use('/api/auth', sessionRouter );
router.use('/api/randoms', childProcessRouter);
router.use('/', (new PagesRouter).start() );
router.use('/info', infoRouter);
router.use('/uploads', multerRouter);
router.use('/products', (new ProductsRouter).start());


class Router{
    constructor(){
        return router
    }
}

module.exports = Router;