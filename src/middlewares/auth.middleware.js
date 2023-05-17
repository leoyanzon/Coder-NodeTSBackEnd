const authMiddleware = (req, res, next) => {
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