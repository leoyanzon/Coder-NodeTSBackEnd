const router = require('express').Router();
const _ = require('lodash');

const authMiddleware = require('../../middlewares/auth.middleware');
const passport = require('passport');


router.post('/signin', passport.authenticate('signin', {failureRedirect: '/error'}), async( _req, res) => {
    res.redirect('/home');
})

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/error'}), async( _req, res) => {
    res.redirect('/home');
})

router.get('/signout', (req, res) => {
    req.logout(()=> {
        res.redirect('/signin');
    })
})

module.exports = router;