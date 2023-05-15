const router = require('express').Router();

const passport = require('passport');

const SessionController = require('../../controllers/session/session.controller');
const sessionController = SessionController.getInstance();

const { userValidationChain, userValidationMiddleware } = require('../../middlewares/user.validation.middleware');

router.post('/signup', 
    userValidationChain,
    async (req, res, next) => await userValidationMiddleware(req, res, next),
    passport.authenticate('signup', {failureRedirect: '/error'}), 
    async(req, res) => {
        sessionController.home(req,res);
});

router.post('/signin',
    passport.authenticate('signin', {failureRedirect: '/error'}), 
    async(req, res) => {
        sessionController.home(req,res);
});

router.get('/signout', 
    (req, res) => {
        sessionController.signOut(req,res);
});

module.exports = router;