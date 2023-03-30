const mongoose = require('mongoose');
const { getMongoConfig } = require('../session/session.config');
const { logger, loggerToFile } = require('../logger/index');

const config = require('../../config/config');

const MONGO_URI = config.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const mongooseConnect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        loggerToFile.info('MONGOOSE CONNECTION OK');
    }).catch(err => {
        logger.error(err);
        process.exit();
    })
}

module.exports = mongooseConnect;