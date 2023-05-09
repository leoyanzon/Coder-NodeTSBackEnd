const validationMiddleware = (req, res, next)=> {
    const {
        fullName,
        username,
        address,
        age,
        email,
        password
    } = req.body;

    const success = true;

    if (!success){
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
        return res.render('error', {message: message});
    }
    next();
}

module.exports = validationMiddleware;