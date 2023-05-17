const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const createMessage = async ( page , req , { products = null, cart = null, err = null } = {}) => {
    const navBar = [{ title: "Home", link: "/"}];
    const authenticated = req.isAuthenticated();
    const userId = authenticated ? req.session.passport.user : null;
    const username = authenticated ? (await userServices.getById(userId)).username : null;
    
    const main = {
        user: username,
        isAuthenticated : authenticated,
    };
    if (products !== null) main.products = products;
    if (cart !== null) main.cart = cart;

    if (page === 'signIn'){
        navBar.push({ title: "Register", link: "/signup"});
    }
    if (page === 'signUp'){
        navBar.push({ title: "Signin", link: "/signin"});
    }
    if (page === 'signOut'){
        navBar.push({ title: "Register", link: "/signup"});
    }
    if (page === 'home' || page === 'cart'){
        navBar.push({ title: "Cart", link: "/cart"});
        navBar.push({ title: "Logout", link: "/api/auth/signout"});
    }
    if (page === 'error' && authenticated){
        navBar.push({ title: "Cart", link: "/cart"});
        navBar.push({ title: "Logout", link: "/api/auth/signout"});
    }
    if (page === 'error' && !authenticated){
        navBar.push({ title: "Signin", link: "/signin"});
        navBar.push({ title: "Register", link: "/signup"});
    }

    const message = {
        navBar: navBar,
        main: main,
        errors: err
    }
    return message
}

module.exports = createMessage