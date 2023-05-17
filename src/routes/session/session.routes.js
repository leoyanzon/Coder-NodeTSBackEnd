const router = require('express').Router();

const passport = require('passport');

const PagesController = require('../../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

const AppError = require('../../middlewares/error.middleware');

const { logger } = require('../../utils/logger/index');

router.post('/signup',
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    async (req, res, next) => {
    await passport.authenticate('signup', async function(err,user,info){
        if (err) {
            const error = new AppError(err.message, 'Session register', 'Session Router / Passport', info.message, 500);
            return await pagesController.error(error, req, res); 
        }
        if (!user) {
            const error = new AppError('Error registering user' , 'Session register', 'Session Router / Passport', info.message , 500);
            return await pagesController.error(error, req, res);
        };
        req.logIn(user, async function(err){ 
            if (err) {
                const error = new AppError(err.message , 'Session register', 'Session Router / Passport', info.message , 500);
                return await pagesController.error(error, req, res);
            }})
        next();
    })(req, res, next)},
    async (req, res, next) => {
        return await pagesController.home(req, res);
});

router.post('/signin', async (req, res, next) => {
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
    })(req, res, next)},
    async (req, res, next) => {
        return await pagesController.home(req, res);
});

router.get('/signout', 
    async (req, res) => {
        req.logout(async ()=>{
            logger.info('Passport: user logged out successfully');
            return await pagesController.signOut(req , res);
        });
});

router.post('/error',
    async(err, req, res) => {
        return await pagesController.error(err, req, res);
});

module.exports = router;