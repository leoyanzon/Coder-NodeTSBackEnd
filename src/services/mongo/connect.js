const mongoose = require('mongoose');
const { getMongoConfig } = require('./mongo.config');
const { logger } = require('../logger/index');

const config = require('../../config/config');

class MongooseConnect {
    static #instance;

    constructor(dbURI){
        logger.info('Initiating Mongo Connection')
        mongoose.set('strictQuery', false);
        mongoose.connect(dbURI, getMongoConfig()).then(() => {
            logger.info('Mongoose connected successfully');
        })
    }

    static async getInstance(dbURI){
        if(this.#instance){
            logger.warn("Mongoose connection failed: exists already");
            return this.#instance;
        }
        this.#instance = await new MongooseConnect(dbURI);
        return this.#instance
    }
}

module.exports = MongooseConnect;