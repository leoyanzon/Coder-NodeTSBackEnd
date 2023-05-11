const UsersController = require('../../controllers/users/users.controller');
const usersController = UsersController.getInstance();

const { ProductsFactory } = require('../../dao/factory');
const productFactory = ProductsFactory.getInstance();

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
        const userData = await usersController.getUserById(req.session.passport.user);
        const navBar = [
            { title: "Home", link: "/"},
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

}

module.exports = SessionController;