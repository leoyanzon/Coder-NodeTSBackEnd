const express = require('express');
const { isNil } = require('lodash');
const router = express.Router();
const path = require('path')

const { fork } = require('child_process');

const _ = require('lodash');

router.get('/', (req, res) => {
    let { q } = req.query;
    if (isNil(q)){
        q = 100000000
    }
    const generator = fork('./src/services/childProcess/childProcess.service.js');
    generator.send(JSON.stringify({action: 'start', q: q}));
    generator.on('message', (prop) => {
        res.send({
            success: true,
            data:prop
        })
    })  
})

module.exports = router;
