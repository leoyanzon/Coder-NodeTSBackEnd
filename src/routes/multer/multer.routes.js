const router = require('express').Router();

const { uploadService } = require('../../utils/multer/multer.service');
upload = uploadService();

router.post('/', upload.single('profile-file'), (req, res, next) => {
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="/uploads/${req.file.filename}" /><br>`
    return res.send(response)
})

module.exports = router;