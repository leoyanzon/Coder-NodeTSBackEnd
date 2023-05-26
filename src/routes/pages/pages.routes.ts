import express , {  Router } from 'express';
const router : Router = express.Router();

import authMiddleware from '../../middlewares/auth.middleware';

import PagesController from '../../controllers/pages/pages.controller';

export default class PagesRouter {
    public pagesController : PagesController;

    constructor(){
        this.pagesController = PagesController.getInstance();

    }

    start() {
        router.get('/', async(req : any, res : any, next : any) => await authMiddleware(req, res, next), async(req : any, res : any, next : any) => await this.pagesController.home(req, res));
        router.get('/cart', async(req : any, res : any, next : any) => await authMiddleware(req, res, next), async(req : any, res : any, next : any) => await this.pagesController.cart(req, res));
        router.get('/signin', async(req : any, res : any, next : any) => await this.pagesController.signIn(req, res));
        router.get('/signup', async(req : any, res : any, next : any) => await this.pagesController.signUp(req, res));
        router.get('/signout', async(req : any, res : any, next : any) => await this.pagesController.signOut(req, res));
        router.get('/error', async(req : any, res : any, next : any) => await this.pagesController.error(req, res));

        return router
    }
}
