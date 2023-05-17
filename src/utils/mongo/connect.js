const mongoose = require('mongoose');
const config = require('../../loaders/config.loader')();
const { getMongoConfig } = require('../../config/mongo.config');

const { logger } = require('../logger/index');

class MongooseConnect{

    constructor(){
        this.initConnection()
    } 

    static getInstance(){
        if (!this.instance){
            this.instance = new MongooseConnect()
        }
        return this.instance
    }

    getDataStorageURI = () => {
        if (config.db.DATA_STORAGE == 'MONGO_DB') {
            return `${config.db.MONGO_URI}/${config.db.DB_NAME}`
        }
        if (config.db.DATA_STORAGE == 'MONGO_ATLAS') {
            return `${config.db.MONGO_ATLAS_URL}/${config.db.DB_NAME}`
        }
    }

    async initConnection(){
        logger.info('Initiating Mongo Connection');
        try{
            mongoose.set('strictQuery', false);
            const response = await mongoose.connect(this.getDataStorageURI(), getMongoConfig());
            if (response) logger.info('Mongoose connected successfully');
        } catch(err) {
            logger.error(err)
        }
    }
}

module.exports = MongooseConnect;