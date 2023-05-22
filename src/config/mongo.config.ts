import configLoader from '../loaders/config.loader';

const config = configLoader();

interface mongoConfigObject {
    useNewUrlParser: Boolean,
    useUnifiedTopology: Boolean
}

interface getStoreConfigObject {
    mongoUrl: string,
    ttl: number,
    mongoOptions: mongoConfigObject,
    dbName: string
}

const getMongoConfig = () : mongoConfigObject => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = (dbURI : string) : getStoreConfigObject => {
    const MONGO_URI = dbURI;
    return {
        mongoUrl: MONGO_URI,
        ttl: 3600,
        mongoOptions: getMongoConfig(),
        dbName: config.db.DB_NAME
    }
}

module.exports = {
    getMongoConfig,
    getStoreConfig
}