const express = require('express');
const router = express.Router();

router.post('/setCookie', (req, res)=>{
    const {name, value, time} = req.body;
    const config = {
        signed: true
    }
    if(!time){
        return res.cookie(name, value, config).send(`Cookie ${name} set without expiration`)
    }
    if(isNaN(time) || time < 1){
        return res.status(400).json({
            success: false,
            message: 'Bad cookie time format'
        })
    }
    Object.assign(config, { maxAge:parseInt(time*1000) });
    res.cookie(name, value, config).send(`Cookie ${name} set with expiration in ${ time } sec`)
});

router.get('/getCookies', (req, res)=>{
    res.status(200).json(req.signedCookies)
})

router.delete('/:name', (req, res)=>{
    const {name} = req.params;
    if(!req.signedCookies.includes(name)){
        res.status(400).json({
            success: false,
            message: `The cookie ${name} does not exist`
        })
    }
    res.clearCookie(name).send(`Cookie ${name} was deleted successfully`)
})

module.exports = router;