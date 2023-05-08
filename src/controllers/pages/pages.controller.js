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
        res.render('signin');
    }

    signUp = async(req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        res.render('signup');
    }

    error = async(_req, res) => {
        res.render('error');
    }

    signOut = async(req, res) => {
        req.logout(()=>{
            res.redirect('/signin')
        })
    }

    home = async(req, res) => {
        const userData = await usersController.getUserById(req.session.passport.user);
        console.info(userData)
        const message = {
            user: userData.message.username,
            products: productFactory.getAll(),
        }
        res.render('home', {message: message});
    }
}

module.exports = PagesController;