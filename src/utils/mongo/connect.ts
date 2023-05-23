import mongoose from 'mongoose';
import configLoader from '../../loaders/config.loader';
import { getMongoConfig } from '../../config/mongo.config';

import { logger } from '../logger/index';

class MongooseConnect{

    public static instance: MongooseConnect;

    constructor(){
        this.initConnection()
    } 

    public static getInstance() : MongooseConnect{
        if (!this.instance){
            this.instance = new MongooseConnect()
        }
        return this.instance;
    }

    public getDataStorageURI = () : string => {
        const config = configLoader();

        if (config.db.DATA_STORAGE == 'MONGO_ATLAS') {
            return `${config.db.MONGO_ATLAS_URL}/${config.db.DB_NAME}`
        } // IF NOT, MONGO_DB URI
        return `${config.db.MONGO_URI}/${config.db.DB_NAME}`
    }

    private async initConnection() : Promise<void>{
        logger.info('Initiating Mongo Connection');
        try{
            mongoose.set('strictQuery', false);
            await mongoose.connect(this.getDataStorageURI(), getMongoConfig());
            logger.info('Mongoose connected successfully');
        } catch(err) {
            logger.error(err)
        }
    }
}

export default MongooseConnect;