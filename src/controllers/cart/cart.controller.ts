import { Request , Response } from 'express';
import { Session } from 'express-session'
import CartServices from '../../services/cart/cart.services';
import { logger } from '../../utils/logger/index';

import UserServices from '../../services/user/user.services';
const userServices = new UserServices();

import ProductServices from '../../services/product/product.services';
const productServices = new ProductServices();

import PagesController from '../pages/pages.controller';
const pagesController = PagesController.getInstance();

import httpStatus from 'http-status';



class CartController{
    public static instance : CartController;
    public cartServices : CartServices;
    constructor(){
        this.cartServices = new CartServices();
    }

    public static getInstance() : CartController{
        if (!this.instance){
            this.instance = new CartController();

        }
        return this.instance
    }

    getAll = async(_req : Request, res : Response) : Promise<Response> =>{
        try {
            const data = await this.cartServices.getAll();
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            
            return res.status(200).json({
                success: true,
                message:data
            });

        } catch(err : any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    addProduct = async(req : Request, res : Response) : Promise<void> => {
        try {
            let userId : string = "";
            const { productId } = req.params;
            if (!req.isAuthenticated()) userId = req.session?.passport?.user;
            const productToAppend = await productServices.getById(productId);
            const data = await this.cartServices.append(userId, productToAppend );
            if (!data) {
                return pagesController.error(req, res);
            }
            return pagesController.cart(req, res);
        } catch(err : any){
            logger.error(err);
            return pagesController.error(req, res);
        }
    }

    buyCart = async(req : Request, res : Response) : Promise<void> =>{
        try{
            const { cartId } = req.params;
        const data = await this.cartServices.buyCart(cartId);
            if (!data) {
                return pagesController.error(req, res);
            }
            return pagesController.cart(req, res);
        } catch(err : any){
            logger.error(err);
            return pagesController.error(req, res);
        }
    }

    getById = async(req: Request, res: Response) : Promise<Response> =>{
        try {
            const id = req.params.id;
            const data = await this.cartServices.getById(id);
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }

            return res.status(200).json({
                success: true,
                message: data
            });

        } catch(err: any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req : Request, res : Response) : Promise<Response> =>{
        try {
            const id = req.params.id;
            const data = await this.cartServices.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: `Product ${data} deleted from cart`
            });
        } catch(err: any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req : Request, res : Response) : Promise<Response> =>{
        try {
            const data = await this.cartServices.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: `All products deleted from Cart`
            });
        } catch(err: any){
            logger.error(err);
            return res.send({
                success: false,
                message: err
            });
        }
    }

    cart = async(_req : Request, res : Response) : Promise<void> => {
        return res.redirect('/cart');
    }
}

export default CartController;