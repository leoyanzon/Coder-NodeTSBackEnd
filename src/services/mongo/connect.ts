import mongoose from 'mongoose';
import configLoader from '../../loaders/config.loader';
const config = configLoader();

import { getMongoConfig } from '../../config/mongo.config';

import { logger } from '../../utils/logger';

class MongooseConnect{
    public static instance : MongooseConnect;

    constructor(){
        this.initConnection()
    } 

    static getInstance() : MongooseConnect{
        if (!this.instance){
            this.instance = new MongooseConnect()
        }
        return this.instance
    }

    getDataStorageURI = () : string => {
        if (config.db.DATA_STORAGE == 'MONGO_ATLAS') {
            return `${config.db.MONGO_ATLAS_URL}/${config.db.DB_NAME}`
        }
        return `${config.db.MONGO_URI}/${config.db.DB_NAME}`
    }

    async initConnection(){
        logger.info('Initiating Mongo Connection');
        try{
            mongoose.set('strictQuery', false);
            const response  = await mongoose.connect(this.getDataStorageURI(), getMongoConfig());
            logger.info('Mongoose connected successfully');
        } catch(err) {
            logger.error(err)
        }
    }
}

module.exports = MongooseConnect;