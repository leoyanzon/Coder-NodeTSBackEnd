const router = require('express').Router();

const passport = require('passport');

const SessionController = require('../../controllers/session/session.controller');
const sessionController = SessionController.getInstance();

router.post('/signin', 
    passport.authenticate('signin', {failureRedirect: '/error'}), 
    async(req, res) => {
        sessionController.home(req,res);
})

router.post('/signup', 
    passport.authenticate('signup', {failureRedirect: '/error'}),
    async( req, res) => {
        sessionController.home(req,res);
})

router.get('/signout', 
    (req, res) => {
        sessionController.signOut(req,res);
})

module.exports = router;