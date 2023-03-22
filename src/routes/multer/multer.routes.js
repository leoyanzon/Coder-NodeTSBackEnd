const router = require('express').Router();

const { endsWith } = require('lodash');
const upload = require('../../services/multer/multer.service');

router.post('/', upload.single('profile-file'), (req, res, next) => {
    console.log(JSON.stringify(req.file))
    var response = '<a href="/home">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="/uploads/${req.file.filename}" /><br>`
    return res.send(response)
})

module.exports = router;