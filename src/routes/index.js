const express = require('express');
const router = express.Router();

const pagesRouter = require('./pages/pages.routes');
const authRouter = require('./auth/auth.routes');
const sessionRouter = require('./session/session.routes');
const infoRouter = require('./info/info.routes');
const childProcessRouter = require('./childProcess/childProcess.routes')

router.get("/health", async(req, res)=>{
    res.status(200).json({
        success: true,
        health:'up',
        environment: process.env.ENVIRONMENT || "not found"
    })
})

router.use('/api/auth', sessionRouter );
router.use('/api/randoms', childProcessRouter);
router.use('/', pagesRouter );
router.use('/info', infoRouter);

module.exports = router;