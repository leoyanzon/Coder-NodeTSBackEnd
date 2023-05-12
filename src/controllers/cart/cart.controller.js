const { CartFactory } = require('../../dao/factory');
const { logger } = require('../../utils/logger/index');

const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

const { ProductsFactory } = require('../../dao/factory');
const productFactory = ProductsFactory.getInstance();

const httpStatus = require('http-status');

const sendEmail = require('../../utils/nodeMailer/nodeMailer.service');
const sendWhatsappAsync = require('../../utils/twilio/whatsapp.services');

class CartController{
    constructor(){
        this.cartFactory = CartFactory.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new CartController();

        }
        return this.instance
    }

    getAll = async(_req, res) =>{
        try {
            const data = await this.cartFactory.getAll();
            
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

        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    createCart = async(req, res) => {
        try {
            const userId = req.session.passport.user;
            const newCart = {
                userId: userId,
                products: [],
                completed: false,
            }

            const cartId = await this.cartFactory.save(newCart);
            if (!cartId) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return cartId
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    addProduct = async(req, res) => {
        try {
            const { productId } = req.params;
            const userId = req.session.passport.user;
            const productSelected = await productFactory.getById(productId);
            let cartSelected = await this.cartFactory.getLastCart(userId);
            if (typeof cartSelected == 'undefined' || cartSelected.completed){
                const cartId = await this.createCart(req, res);
                cartSelected = await this.cartFactory.getLastCart(userId);
            }
            cartSelected.products.push(productSelected);
            const data = await this.cartFactory.update(cartSelected);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            this.cart(req, res);
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    buyCart = async(req, res) =>{
        const { cartId } = req.params;
        let cartSelected = await this.cartFactory.getById(cartId);
        cartSelected.completed = true;
        const data = await this.cartFactory.update(cartSelected);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            const whatsapp = await sendWhatsappAsync(`Cart ${cartId} booked successfully`);
            if (whatsapp.success) logger.info(`Whatsapp message sent with sid:${whatsapp.message}`);
            const email = await sendEmail(`Cart ${cartId} booked successfully`, 'leoyanzon@gmail.com');
            if (email.success) logger.info(`Email message sent:${email.message}`)
            this.cart(req, res);

    }

    getById = async(req, res) =>{
        try {
            const id = req.params.id;
            const data = await this.cartFactory.getById(id);
            
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

        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    save = async(req, res) =>{
        try {
            const { _id } = req.params;
            const productSelected = await productFactory.getById(_id);
            const data = await this.cartFactory.save(productSelected);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            this.cart(req, res);
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req, res) =>{
        try {
            const id = req.params.id;
            const data = await this.cartFactory.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} deleted from cart`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req, res) =>{
        try {
            const data = await this.cartFactory.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `All products deleted from Cart`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    cart = async(req, res) => {
        const userData = await usersController.getUserById(req.session.passport.user);
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Cart", link: "/cart"},
            { title: "Logout", link: "/api/auth/signout"}
        ];
        const main = {
            user: userData.message.username,
            isAuthenticated: req.isAuthenticated(),
            cart: await this.cartFactory.getLastCart(req.session.passport.user),
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.render('cart', {message: message});
    }
}

module.exports = CartController;