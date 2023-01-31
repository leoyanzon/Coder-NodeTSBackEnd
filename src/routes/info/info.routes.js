const express = require('express');
const router = express.Router();

const InfoService = require('../../services/info/info.service');
const infoService = new InfoService();

router.get('/', async (_req, res) => {
    res.send({
        success: true,
        data: await infoService.getInfoProcess()
    })
})

module.exports = router;