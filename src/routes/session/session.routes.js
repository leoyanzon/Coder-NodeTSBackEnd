const router = require('express').Router();

const passport = require('passport');

const PagesController = require('../../controllers/pages/pages.controller');
const pagesController = PagesController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

const AppError = require('../../middlewares/error.middleware');

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true
    }), 
    async(err, req, res) => {
        pagesController.home(err, req,res);
});

router.post('/signin', async (req, res, next) => {
    await passport.authenticate('signin', async function(err,user,info){
        if (err) {
            const error = new AppError(err.message, 'Session signin', 'Session Router', info, 500);
            return await pagesController.error(error, req, res); 
        }
        if (!user) {
            const err = new AppError(info , 'Session login', 'Session Router / Passport', 'User not found', 500);
            return await pagesController.error(err, req, res);
        };
        console.info('isauth antes', req.isAuthenticated());
        req.logIn(user, function(err){ if (err) console.info('errrorrrrr')})
        console.info('isauth despues', req.isAuthenticated());
        next();
        
    })(req, res, next)},
    async (req, res, next) => {
        console.info('last middleware in router', req.isAuthenticated());
        return await pagesController.home(req, res);
    });

router.post('/signin2', function(req, res, next) {
    passport.authenticate('signin', function(err, user, info) {
        if (err) {
            const error = new AppError(err.message, 'Session signin', 'Session Router', info, 500);
            return pagesController.error(error, req, res); 
        }
        if (!user) {
            const err = new AppError('User not found', 'Session signin', 'Session Router', info, 500);
            return pagesController.error(err, req, res);
        };
        console.info('auth', req.isAuthenticated());
        next();
    })(err, req, res, next);
}, async (req, res) => {
    console.info('auth', req.isAuthenticated());
    await pagesController.home(req, res);});

router.get('/signout', 
    (req, res) => {
        return pagesController.signOut(req,res);
});

router.post('/error',
    async(err, req, res) => {
        return pagesController.error(err, req, res);
});

module.exports = router;