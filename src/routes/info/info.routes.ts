import express , {  Router } from 'express';
const router : Router = express.Router();

import InfoService from '../../services/info/info.service';
const infoService = new InfoService();

router.get('/', async (_req, res) => {
    res.send({
        success: true,
        data: await infoService.getInfoProcess()
    })
})

export default router;