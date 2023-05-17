const passport = require('passport');

const AppError = require('./error.middleware');

const PagesController = require('../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const signInPassportMiddleware = async (req, res, next) => {
    await passport.authenticate('signin', async function(err,user,info){
        if (err) {
            const error = new AppError(err.message, 'Session signin', 'Session Router / Passport', info.message, 500);
            return await pagesController.error(error, req, res); 
        }
        if (!user) {
            const error = new AppError('User not found' , 'Session login', 'Session Router / Passport', info.message , 500);
            return await pagesController.error(error, req, res);
        };
        req.logIn(user, async function(err){ 
            if (err) {
                const error = new AppError(err.message , 'Session login', 'Session Router / Passport', info.message , 500);
                return await pagesController.error(error, req, res);
            }})
        next();
    })(req, res, next)
}

module.exports = signInPassportMiddleware;