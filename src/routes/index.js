const express = require('express');
const router = express.Router();

const pagesRouter = require('./pages/pages.routes');
const authRouter = require('./auth/auth.routes');
const sessionRouter = require('./session/session.routes')

router.get("/health", async(_req, res)=>{
    res.status(200).json({
        success: true,
        health:'up',
        environment: process.env.ENVIRONMENT || "not found"
    })
})

router.use('/api/auth', sessionRouter );
router.use('/', pagesRouter );

module.exports = router;