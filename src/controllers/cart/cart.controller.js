const { CartFactory } = require('../../dao/factory');
const { logger } = require('../../services/logger/index');

const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

const { ProductsFactory } = require('../../dao/factory');
const productFactory = ProductsFactory.getInstance();
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

    cart = async(req, res) => {
        const userData = await usersController.getUserById(req.session.passport.user);
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Logout", link: "/api/auth/signout"}
        ];
        const main = {
            user: userData.message.username,
            isAuthenticated: req.isAuthenticated(),
            cart: await this.cartFactory.getAll(),
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.render('cart', {message: message});
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
}

module.exports = CartController;