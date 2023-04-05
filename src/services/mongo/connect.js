const mongoose = require('mongoose');
const { getMongoConfig } = require('./mongo.config');
const { logger } = require('../logger/index');

const config = require('../../config/config');

const MONGO_URI = config.db.MONGO_URI;

class MongooseConnect {
    static #instance;

    constructor(){
        try{
            mongoose.set('strictQuery', false);
            mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
                logger.info('Mongoose connected');
            })
        } catch(err) {
            logger.error(err);
        }
    }

    static getInstance(){
        if(this.#instance){
            logger.warn("Connection exists already");
            return this.#instance;
        }
        this.#instance = new MongooseConnect();
        return this.#instance
    }
}

module.exports = MongooseConnect;