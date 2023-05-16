const authMiddleware = (req, res, next) => {
    console.info('authmiddleware', req.isAuthenticated());
    if(!req.isAuthenticated()){
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
        return res.render('signin', {message: message});
    }
    next();
}

module.exports = authMiddleware;