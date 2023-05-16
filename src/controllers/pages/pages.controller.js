const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const ProductServices = require('../../services/product/product.services');
const productServices = new ProductServices();

const CartServices = require('../../services/cart/cart.services');
const cartServices = new CartServices();

const createMessage = require('../../utils/pages/pages.utils');

const AppError = require('../../middlewares/error.middleware');

const { logger } = require('../../utils/logger/index');

class PagesController {
    constructor(){
        //this.pagesApi = new PagesApi();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new PagesController();

        }
        return this.instance
    }

    signIn = async(req, res) => {
        try{
            const authenticated = req.isAuthenticated();
            if (authenticated){
                return res.redirect('/')
            }
            const message = createMessage('signIn', req);
            res.render('signin', { message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req)
            res.render('error', { message: message })
        }
    }

    signUp = async(req, res) => {
        try{
            const authenticated = req.isAuthenticated();
            if (authenticated){
                return res.redirect('/')
            }
            const message = createMessage('signUp', req);
            res.render('signup', { message: message });
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req);
            res.render('error', { message: message });
        }
        
    }

    signOut = async(req, res) => {
        try{
            req.logout(()=>{});
            const message = createMessage('signin', req);
            res.render('signin', { message: message }); 
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req);
            res.render('error', { message: message });
        }      
    }

    home = async(req, res) => {
        try{
            const products = await productServices.getAll();
            const message = createMessage('home', req, products);
            res.render('home', {message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req, [], [], err);
            res.render('error', { message: message });
        }
    }

    cart = async(req, res) => {
        try{
            const userId = req.session.passport.user;
            const cart = await cartServices.getLastCart(userId);
            const message = createMessage('cart', req, [] , cart)
            res.render('cart', {message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req, [], [], err);
            res.render('error', { message: message });
        }
    }

    error = async(err, req, res) => {
        try{
            const message = createMessage('error', req, [], [], err);
            res.render('error', {message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req, [], [], err);
            res.render('error', { message: message });
        }   
    }
}

module.exports = PagesController;