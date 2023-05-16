const ProductServices = require('../../services/product/product.services');
const productServices = new ProductServices();

const createMessage = require('../../utils/pages/pages.utils');

const AppError = require('../../middlewares/error.middleware');

const { logger } = require('../../utils/logger/index');

class SessionController{
    constructor(){}

    static getInstance(){
        if (!this.instance){
            this.instance = new SessionController();
        }
        return this.instance
    }

    signOut = async(req, res) => {
        const message = createMessage('signin', req);
        res.redirect('/signin', { message: message});  
    }

    home = async(req, res) => {
        try{
            const products = await productServices.getAll();
            const message = createMessage('home', req, products);
            res.render('home', {message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req);
            res.render('error', { message: message });
        }
    }

    error = async(err, req, res) => {
        try{
            const message = createMessage('error', req, [] , [] , err);
            console.info(err); 
            res.render('error', {message: message});
        } catch(err) {
            logger.error(err);
            const message = createMessage('error', req);
            res.render('error', { message: message });
        }   
    }
}

module.exports = SessionController;