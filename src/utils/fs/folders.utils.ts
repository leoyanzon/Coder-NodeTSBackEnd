import {logger} from '../logger/index';
import fs from 'fs';
import path from 'path';

const createFolder = async(folderName : string) : Promise<boolean> => {
    const fullPath = path.join(process.cwd(), folderName)
    try{
        if (!fs.existsSync(fullPath)){
            fs.mkdirSync( fullPath , { recursive: true });
            logger.info(`Utils: Folder ${folderName} created`)
        }
        return true 
    } catch(err) {
        logger.info(`Utils: Folder ${folderName} can't be created: ${err}`);
        return false
    }
}

export default createFolder;