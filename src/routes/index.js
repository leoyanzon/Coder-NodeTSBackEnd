const express = require('express');
const router = express.Router();

const config = require('../config/config');

const pagesRouter = require('./pages/pages.routes');
const authRouter = require('./auth/auth.routes');
const sessionRouter = require('./session/session.routes');
const infoRouter = require('./info/info.routes');
const childProcessRouter = require('./childProcess/childProcess.routes')
const multerRouter = require('./multer/multer.routes')

router.get("/health", async(req, res)=>{

    res.status(200).json({
        success: true,
        health:'up',
        environment: config.ENVIRONMENT || "not found"
    })
})

router.use('/api/auth', sessionRouter );
router.use('/api/randoms', childProcessRouter);
router.use('/', pagesRouter );
router.use('/info', infoRouter);
router.use('/uploads', multerRouter);

module.exports = router;