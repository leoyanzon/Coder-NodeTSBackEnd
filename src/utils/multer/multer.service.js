const multer = require('multer');
const fs = require('fs');
const path = require('path')
const { logger } = require('../logger/index');

const folderName = 'tmp/images';

const createFolder = () => {
    try {
            fs.mkdirSync(path.join(process.cwd(), folderName), { recursive: true });
            logger.info(`Multer: Folder ${folderName} created`)
            return {
                success: true,
            }
    } catch (err) {
        logger.info(`Multer: Folder can't be created: ${err}`)
        return {
            success: false,
        }
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        createFolder();
        cb(null, 'tmp/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploadService = () =>{
    createFolder();
    return multer ({storage: storage})
} 

module.exports = { uploadService };
