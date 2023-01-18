const authMiddleware = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.render('signin')
    }
    next();
}

module.exports = authMiddleware;