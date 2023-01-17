const router = require('express').Router();
const session = require('express-session');
const authMiddleware = require('../../middlewares/auth.middleware');
const statusCode = require('http-status');

router.post('/signin', (req, res) => {
    const USRNAME = process.env.USRNAME;
    const PASSWORD = process.env.PASSWORD;
    const { usernameInput , passwordInput } = req.body;
   
    if (!usernameInput || !passwordInput){
        return res.render('error', {message: `${statusCode[400]}, username or password missing`})
    }
    if (usernameInput != USRNAME || passwordInput != PASSWORD ){
        return res.render('error', {message: `${statusCode[403]}, bad username or password`})
    }
    req.session.username = usernameInput;
    req.session.password = passwordInput;
    const message = {
        username: req.session.username,
        contador: req.session.contador || 0
    }
    res.render('home', {message});
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            res.render('signin')
            return
        }
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

router.get('/', authMiddleware, (req, res) => {
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