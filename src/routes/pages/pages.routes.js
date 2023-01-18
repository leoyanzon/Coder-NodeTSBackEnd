const router = require('express').Router();
const session = require('express-session');
const authMiddleware = require('../../middlewares/auth.middleware');
const statusCode = require('http-status');

router.get('/signin', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signup');
});

router.get('/error', (_req, res) => {
    res.render('error');
})

router.get('/home', authMiddleware, (_req, res) => {
    res.render('home');
})

router.post('/signout', ( req, res) => {
    req.logout(() => {
        res.redirect('/signin');
    })
});

module.exports = router