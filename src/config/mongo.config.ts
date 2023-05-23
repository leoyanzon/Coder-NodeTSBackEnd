import configLoader from '../loaders/config.loader';

const config = configLoader();

const getMongoConfig = () : any => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = (dbURI : string) : any => {
    const MONGO_URI = dbURI;
    return {
        mongoUrl: MONGO_URI,
        ttl: 14 * 24 * 60 * 60,
        mongoOptions: getMongoConfig(),
        dbName: config.db.DB_NAME
    }
}

export {
    getMongoConfig,
    getStoreConfig
}