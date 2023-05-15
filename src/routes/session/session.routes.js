const router = require('express').Router();

const passport = require('passport');

const SessionController = require('../../controllers/session/session.controller');
const sessionController = SessionController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true
    }), 
    async(err, req, res) => {
        sessionController.home(err, req,res);
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true
    }), 
    async(err, req, res) => {
        if (err){
            req.flash('error', 'User signin error');
            sessionController.error(err, req, res);
        }
        sessionController.home(err, req,res);
    }
});

router.get('/signout', 
    (req, res) => {
        sessionController.signOut(req,res);
});

router.post('/error',
    async(req, res) => {
        sessionController.error(req,res);
});

module.exports = router;