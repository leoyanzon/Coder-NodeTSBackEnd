const MongooseConnect = require('../services/mongo/connect');
const config = require('../loaders/config.loader')();

const mongooseLoader = async( app ) => {

    const getDataStorage = () => {
        if (config.db.DATA_STORAGE == 'MONGO_DB') {
            return `${config.db.MONGO_URI}/${config.db.DB_NAME}`
        }
        if (config.db.DATA_STORAGE == 'MONGO_ATLAS') {
            return `${config.db.MONGO_ATLAS_URL}/${config.db.DB_NAME}`
        }
    }
    
    await MongooseConnect.getInstance(getDataStorage());
    
    return app;
}

module.exports = mongooseLoader;