const mongoose = require('mongoose');
const { getMongoConfig } = require('./mongo.config');
const { logger } = require('../logger/index');

const config = require('../../config/config');

class MongooseConnect {
    static #instance;

    constructor(){
        console.info('Initiating connection to Mongo')
        mongoose.set('strictQuery', false);
        mongoose.connect(config.db.MONGO_URI, getMongoConfig()).then(() => {
            logger.info('Mongoose connected');
        })
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