const router = require('express').Router();

const passport = require('passport');

const PagesController = require('../../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

const AppError = require('../../middlewares/error.middleware');

const { logger } = require('../../utils/logger/index');

const signInPassportMiddleware = require('../../middlewares/signin.passport.middleware');
const signUpPassportMiddleware = require('../../middlewares/signup.passport.middleware');

/*router.post('/signin', 
    async (req, res, next) => await signInPassportMiddleware(req, res, next),
    async (req, res ) => {
        return await pagesController.home(req, res);
});*/

router.post('/signin',
    passport.authenticate('signin', {failureRedirect: '/error'}), 
    async(req, res) => {
        await pagesController.home(req,res);
});

/*router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    async (req, res, next) => await signUpPassportMiddleware(req, res, next),
    async (req, res ) => {
        return await pagesController.home(req, res);
});*/

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {failureRedirect: '/error'}), 
    async(req, res) => {
        await pagesController.home(req,res);
});

router.get('/signout', 
    async (req, res) => {
        req.logOut(async ()=>{
            logger.info('Passport: user logged out successfully'); 
            return await pagesController.signOut(req , res);
        });
        
        
});

router.post('/error',
    async(err, req, res) => {
        return await pagesController.error(err, req, res);
});

module.exports = router;