const express = require('express');
const router = express.Router();
const statusCode = require('http-status');
require('dotenv').config();
const path=require('path');

let oneStepBack=path.join(__dirname,'../', '../', '../public');

const authMiddleware = require('../../middlewares/auth.middleware');

router.use(express.static('public'))

router.get('/', authMiddleware, (req, res) => {
    if(!req.session.contador){
        req.session.contador = 0;
    }
    req.session.contador = req.session.contador+1;
    res.status(200).send(`Usted ha ingresado ${req.session.contador} veces`);
})

router.post('/signin', (req, res) => {
    const USER = process.env.USER;
    const PASSWORD = process.env.PASSWORD;
    const { username , password } = req.body;
    if (!username || !password){
        return res.status(400).json({
            success: false,
            message: `${statusCode[400]}, username or password missing`
        })
    }
    if (username != USER || password != PASSWORD ){
        return res.status(403).json({
            success: false,
            message: `${statusCode[403]}, bad username or password`
        })
    }
    req.session.username = username;
    req.session.password = password;
    res.sendFile('logged.html', {root: oneStepBack})
    // return res.status(200).json({
    //     success: true,
    //     message: 'Login successful'
    // })    
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            return res.sendFile('index.html', {root: oneStepBack})
            // return res.status(200).json({
            //     success: true,
            //     message: 'Session destroyed'
            // })
        }
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

module.exports = router;