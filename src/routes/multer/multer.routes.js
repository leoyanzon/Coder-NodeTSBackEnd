const router = require('express').Router();

const upload = require('../../services/multer/multer.service');

router.post('/', upload.single('profile-file'), (req, res, next) => {
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
})

module.exports = router;