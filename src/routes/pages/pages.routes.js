const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const statusCode = require('http-status');

const PagesController = require('../../controllers/pages/pages.controller');
class PagesRouter {
    constructor(){
        this.pagesController = new PagesController();
    }

    start() {
        router.get('/home', authMiddleware, this.pagesController.home);

        router.get('/signin', this.pagesController.signIn);
        router.get('/signup', this.pagesController.signUp);
        router.get('/signout', this.pagesController.signOut);
        router.get('/error', this.pagesController.error);

        return router
    }
}

module.exports = PagesRouter;