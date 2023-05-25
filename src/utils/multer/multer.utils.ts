import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { logger } from '../logger/index';

const folderName = 'tmp/images';

const createFolder = () : boolean => {
    try {
            fs.mkdirSync(path.join(process.cwd(), folderName), { recursive: true });
            logger.info(`Multer: Folder ${folderName} created`)
            return true
    } catch (err) {
        logger.info(`Multer: Folder can't be created: ${err}`)
        return false
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

const uploadUtils = () =>{
    createFolder();
    return multer ({storage: storage})
} 

export default uploadUtils;
