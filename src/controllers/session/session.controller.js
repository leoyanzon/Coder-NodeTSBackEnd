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
    error = async(_req, res) => {
        res.render('error');
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
            res.render('error');
        }
    }

    home = async(req, res) => {
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
    }

}

module.exports = SessionController;