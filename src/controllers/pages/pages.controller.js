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
            const error = new AppError( 'signIn(req, res) error' , 'Sign in page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
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
            const error = new AppError( 'signUp(req, res) error' , 'Sign up page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
        
    }

    signOut = async(req, res) => {
        try{
            const message = createMessage('signIn', req);
            res.render('signin', { message: message }); 
        } catch(err) {
            const error = new AppError( 'signOut(req, res) error' , 'Sign out page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }      
    }

    home = async(req, res) => {
        try{
            const products = await productServices.getAll();
            const userId = req.session.passport.user;
            const user = await userServices.getById(userId);
            const message = createMessage('home', req, { user, products });
            res.render('home', {message: message});
        } catch(err) {
            const error = new AppError( 'home(req, res) error' , 'Home page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
    }

    cart = async(req, res) => {
        try{
            const userId = req.session.passport.user;
            const cart = await cartServices.getLastCart(userId);
            const user = await userServices.getById(userId); 
            const message = createMessage('cart', req, { user,  cart })
            res.render('cart', {message: message});
        } catch(err) {
            const error = new AppError( 'cart(req, res) error' , 'Cart page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
    }

    error = async(err, req, res) => {
        try{
            const userId = req.session?.passport?.user ? req.session.passport.user : null;
            const user = await userServices.getById(userId);
            const message = createMessage('error', req, { user, err });
            res.render('error', {message: message});
        } catch(err) {
            const error = new AppError( 'error(req, res) error' , 'Error page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }   
    }
}

module.exports = PagesController;