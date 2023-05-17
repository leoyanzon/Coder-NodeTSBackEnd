const {logger} = require('../logger/index');
const fs = require('fs');
const path = require('path');

const createFolder = async(folderName) => {
    const fullPath = path.join(process.cwd(), folderName)
    try{
        if (!fs.existsSync(fullPath)){
            fs.mkdirSync( fullPath , { recursive: true });
            logger.info(`Utils: Folder ${folderName} created`)
        }
        return {
            success: true,
        }
    } catch(err) {
        logger.info(`Utils: Folder ${folderName} can't be created: ${err}`);
        return {
            success: false,
        }
    }
}

module.exports = createFolder;