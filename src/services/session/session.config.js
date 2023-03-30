const config = require('../../config/config');

const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = () => {
    const MONGO_URI = config.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    return {
        mongoUrl: MONGO_URI,
        ttl: 3600,
        mongoOptions: getMongoConfig()
    }
}

module.exports = {
    getMongoConfig,
    getStoreConfig
}