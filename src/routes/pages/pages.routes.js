const router = require('express').Router();
const session = require('express-session');
const authMiddleware = require('../../middlewares/auth.middleware');
const statusCode = require('http-status');

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/error', (req, res) => {
    res.render('error');
})

router.get('/home', authMiddleware, (req, res) => {
    if(!req.session.contador){
        req.session.contador = 0;
    }
    req.session.contador = req.session.contador+1;
    const message = {
        username: req.session.username,
        contador: req.session.contador
    }
    res.render('home', {message});
})

module.exports = router