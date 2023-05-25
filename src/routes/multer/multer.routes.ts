import express , {  Router } from 'express';
const router : Router = express.Router();

import uploadUtils from '../../utils/multer/multer.utils';
const upload = uploadUtils();

router.post('/', upload.single('profile-file'), (req, res, next) => {
    if (req.file){
        let response = '<a href="/">Home</a><br>'
        response += "Files uploaded successfully.<br>"
        response += `<img src="/uploads/${req.file.filename}" /><br>`
        return res.send(response)
    }
})

export default router;