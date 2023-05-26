import { Request, Response } from 'express';

import UserServices from '../../services/user/user.services';
const userServices = new UserServices();

import ProductServices from '../../services/product/product.services';
const productServices = new ProductServices();

import CartServices from '../../services/cart/cart.services';
const cartServices = new CartServices();

import createMessage from '../../utils/pages/pages.utils';

import AppError from '../../middlewares/error.middleware';
import { FullCartInterface } from '../../interfaces/cart.interfaces';
import { FullUserInterface } from '../../interfaces/user.interfaces';

class PagesController {
    public static instance : PagesController;

    constructor(){}
    
    static getInstance() : PagesController{
        if (!this.instance){
            this.instance = new PagesController();

        }
        return this.instance
    }

    signIn = async(req: Request, res: Response) : Promise<void>=> {
        try{
            const authenticated = req.isAuthenticated();
            if (authenticated){
                return res.redirect('/')
            }
            const message = createMessage('signIn', req);
            res.render('signin', { message: message});
        } catch(err : any) {
            const error = new AppError( 'signIn(req, res) error' , 'Sign in page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
    }

    signUp = async(req: Request, res: Response) : Promise<void> => {
        try{
            const authenticated = req.isAuthenticated();
            if (authenticated){
                return res.redirect('/')
            }
            const message = createMessage('signUp', req);
            res.render('signup', { message: message });
        } catch(err : any) {
            const error = new AppError( 'signUp(req, res) error' , 'Sign up page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
        
    }

    signOut = async(req : Request, res: Response) : Promise<void> => {
        try{
            const message = createMessage('signIn', req);
            res.render('signin', { message: message }); 
        } catch(err: any) {
            const error = new AppError( 'signOut(req, res) error' , 'Sign out page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }      
    }

    home = async(req : Request, res: Response) : Promise<void> => {
        try{
            const products = await productServices.getAll();
            const userId = req.session.passport.user;
            const user = await userServices.getById(userId);
            const message = createMessage('home', req, { user, products });
            res.render('home', {message: message});
        } catch(err: any) {
            const error = new AppError( 'home(req, res) error' , 'Home page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
    }

    cart = async(req : Request, res: Response) : Promise<void> => {
        try{
            const userId = req.session.passport.user;
            const cart : FullCartInterface | null = await cartServices.getLastCart(userId);
            const user : FullUserInterface | null = await userServices.getById(userId); 
            const message = createMessage('cart', req, { user,  cart })
            res.render('cart', {message: message});
        } catch(err : any) {
            const error = new AppError( 'cart(req, res) error' , 'Cart page', 'Pages Controller', err.message , 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', { message: message })
        }
    }

    error = async( req: Request, res: Response) : Promise<void> => {
        try{
            const userId : string | null = req.session?.passport?.user ? req.session.passport.user : null;
            const user = await userServices.getById(userId);
            const { code } = req.query;
            let error;
            if (req.err) error = req.err;
            if (typeof code == 'string') {
                let codeNumber = parseInt(code);
                error = new AppError( 'error(req, res)' , 'Error page', 'Pages Controller', 'HTML query error', codeNumber);
            } else {
                error = new AppError( 'error(req, res)' , 'Error page', 'Pages Controller', 'Unknown', 500);
            }
            const message = createMessage('error', req, { user, err: error });
            res.render('error', {message: message});
        } catch(err: any) {
            const error = new AppError( 'error(req, res) error' , 'Error page','Pages Controller', err.message, 500);
            const message = createMessage('error', req, { err: error })
            res.render('error', {message: message});
        }   
    }
}

export default PagesController;