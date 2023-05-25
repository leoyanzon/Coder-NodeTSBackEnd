import express , {  Router, Request, Response, IRouter } from 'express';

import configLoader from '../loaders/config.loader';
const config = configLoader();

import infoRouter from './info/info.routes';
import sessionRouter from './session/session.routes';

import PagesRouter from './pages/pages.routes';
import ProductsRouter from './products/products.routes';
import CartRouter from './cart/cart.routes';

import multerRouter from './multer/multer.routes';

export default class RouterClass {
    private router : Router = express.Router();
    public static instance : RouterClass;

    constructor(){
        //General info Routers
        this.router.use('/info', infoRouter);
        this.router.get("/health", async(req, res)=>{
            res.status(200).json({
                success: true,
                health:'up',
                environment: config.server.ENVIRONMENT || "not found"
            })
        })

        //Autentication router
        this.router.use('/api/auth', sessionRouter );

        //Client HTML Router
        this.router.use('/', (new PagesRouter).start() );

        //API Routers
        this.router.use('/api/products', (new ProductsRouter).start());
        this.router.use('/api/cart', (new CartRouter).start())

        //Services Router
        this.router.use('/uploads', multerRouter);
    }

    public getRouter() : Router{
        return this.router
    }

    static getInstance() : Router {
        if (!this.instance){
            this.instance = new RouterClass();
        }
        return this.instance.getRouter()
    }

}