const createMessage = ( page , req , products = [], cart = [], err = "") => {
    const navBar = [{ title: "Home", link: "/"}];
    const authenticated = (typeof req.isAuthenticated == 'boolean') ? req.isAuthenticated : false;
    const username = ( req.session?.passport?.user ) ? req.session.passport.user : null;
    let main = {
        user: username,
        isAuthenticated : authenticated,
        products : products,
        cart: cart
    };

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
    }

    const error = err 

    const message = {
        navBar: navBar,
        main: main,
        errors: error
    }
    return message
}

module.exports = createMessage