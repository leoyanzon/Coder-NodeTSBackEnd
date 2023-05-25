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
        router.get('/', () => authMiddleware, (req, res) => this.pagesController.home);
        router.get('/cart', () => authMiddleware, (req, res) => this.pagesController.cart);
        router.get('/signin', (req, res) => this.pagesController.signIn);
        router.get('/signup', (req, res) => this.pagesController.signUp);
        router.get('/signout', (req, res) => this.pagesController.signOut);
        router.get('/error', (req, res) => this.pagesController.error);

        return router
    }
}
