const PagesController = require('../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const authMiddleware = (req, res, next) => {
    if(!req.isAuthenticated()){
        return pagesController.signIn(req, res);
    }
    next();
}

module.exports = authMiddleware;