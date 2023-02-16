const mongoose = require('mongoose');
const { getMongoConfig } = require('../session/session.config');
const { logger } = require('../logger/index');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const mongooseConnect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        logger.info('MONGOOSE CONNECTION OK');
    }).catch(err => {
        logger.error(err);
        process.exit();
    })
}

module.exports = mongooseConnect;