const mongoose = require('mongoose');
const { getMongoConfig } = require('./mongo.config');
const { logger } = require('../logger/index');

const config = require('../../config/config');

class MongooseConnect {
    static #instance;

    constructor(dbURI){
        this.init(dbURI); 
    } 

    async init(dbUri){
        logger.info('Initiating Mongo Connection');
        try{
            mongoose.set('strictQuery', false);
            const response = await mongoose.connect(db[URIError, getMongoConfig()]);
            if (response) logger.info('Mongoose connected successfully');
        } catch(err) {
            logger.error(err)
        }
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