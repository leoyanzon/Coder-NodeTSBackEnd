//const PagesApi = require('../../api/pages/pages.api);
const { ProductsFactory } = require('../../dao/factory');
const productFactory = ProductsFactory.getInstance();

const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

class PagesController {
    constructor(){
        //this.pagesApi = new PagesApi();
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
            { title: "Logout", link: "/api/auth/signout"}
        ];
        const main = {
            user: userData.message.username,
            products: await productFactory.getAll(),
        }
        const message = {
            navBar: navBar,
            main: main,
        }

        res.render('home', {message: message});
    }
}

module.exports = PagesController;