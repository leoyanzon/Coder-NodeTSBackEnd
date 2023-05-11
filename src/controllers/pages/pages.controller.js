//const PagesApi = require('../../api/pages/pages.api);
const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

const { ProductsFactory } = require('../../dao/factory');
const productFactory = ProductsFactory.getInstance();

const { CartFactory } = require('../../dao/factory');
const cartFactory = CartFactory.getInstance();

const CartController = require('../cart/cart.controller');
const cartController = CartController.getInstance();

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
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Register", link: "/signup"}
        ];
        const main = {
            user: "",
            isAuthenticated: req.isAuthenticated(),
            products: "",
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.render('signin', { message: message});
    }

    signUp = async(req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Signin", link: "/signin"}
        ];
        const main = {
            user: "",
            isAuthenticated: req.isAuthenticated(),
            products: "",
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.render('signup', { message: message});
    }

    error = async(_req, res) => {
        res.render('error');
    }

    signOut = async(req, res) => {
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Register", link: "/signup"}
        ];
        const main = {
            user: "",
            isAuthenticated: req.isAuthenticated(),
            products: "",
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.redirect('/signin', { message: message})
    }

    home = async(req, res) => {
        const userData = await usersController.getUserById(req.session.passport.user);
        const navBar = [
            { title: "Home", link: "/"},
            { title: "Cart", link: "/cart"},
            { title: "Logout", link: "/api/auth/signout"}
        ];
        const main = {
            user: userData.message.username,
            isAuthenticated: req.isAuthenticated(),
            products: await productFactory.getAll(),
        }
        const message = {
            navBar: navBar,
            main: main,
        }

        res.render('home', {message: message});
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
            cart: await cartFactory.getLastCart(req.session.passport.user),
        }
        const message = {
            navBar: navBar,
            main: main,
        }
        res.render('cart', {message: message});
    }

}

module.exports = PagesController;