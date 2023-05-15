const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const ProductServices = require('../../services/product/product.services');
const productServices = new ProductServices();

class SessionController{
    constructor(){}

    static getInstance(){
        if (!this.instance){
            this.instance = new SessionController();
        }
        return this.instance
    }

    signOut = async(req, res) => {
        try{
            req.logout(()=>{});
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
            res.render('signin', { message: message})
        } catch(err){
            res.render('error', err);
        }
    }

    home = async(req, res) => {
        try{
            const userData = await userServices.getById(req.session.passport.user);
            const navBar = [
                { title: "Home", link: "/"},
                { title: "Cart", link: "/cart"},
                { title: "Logout", link: "/api/auth/signout"}
            ];
            const main = {
                user: userData.username,
                isAuthenticated: req.isAuthenticated(),
                products: await productServices.getAll(),
            }
            const message = {
                navBar: navBar,
                main: main,
            }
            res.render('home', {message: message});
        } catch(err) {
            res.render('error', err);
        }
        
    }

    error = async(req, res) => {
        try{
            const error = req.flash('error');
            const userData = await userServices.getById(req.session.passport.user);
            const navBar = [
                { title: "Home", link: "/"},
                { title: "Cart", link: "/cart"},
                { title: "Logout", link: "/api/auth/signout"}
            ];
            const main = {
                user: userData.username,
                isAuthenticated: req.isAuthenticated(),
                products: await productServices.getAll(),
            }
            const message = {
                navBar: navBar,
                main: main,
                errors: error
            }
            res.render('error', {message: message});
        } catch(err) {
            res.render('error', err);
        }
        
    }

}

module.exports = SessionController;