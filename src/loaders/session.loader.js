const session = require('express-session');

const FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo');
const { getStoreConfig } = require('../config/mongo.config'); 

const cookieParser = require('cookie-parser');

const passportService = require('../utils/passport/passport.service');

const config = require('../loaders/config.loader')();
const { logger } = require('../utils/logger/index');

const getSessionStorage = async () => {
    if (config.server.SESSION_STORAGE == 'MONGO_DB') {
        logger.info('Session Storage: Mongo Local instance created')
        return MongoStore.create(getStoreConfig(`${config.db.MONGO_URI}/sessions`))
    }
    if (config.server.SESSION_STORAGE == 'MONGO_ATLAS') {
        logger.info('Session Storage: Mongo Atlas instance created')
        return MongoStore.create(getStoreConfig(`${config.db.MONGO_ATLAS_URL}/sessions`))
    }
    //Else SESSION_STORAGE == FILE OR MEM
    logger.info('Session Storage: Session file created');
    return new FileStore({path: 'tmp/db/session', ttl:300, retries: 0})
}

const sessionLoader = async ( app ) => {

    app.use(session({
        store: await getSessionStorage(),
        secret: config.cookies.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
            secure: false
        }
    }));

    app.use(cookieParser(config.cookies.COOKIES_SECRET));
    app.use(passportService.initialize());
    app.use(passportService.session());
    
    return app;
}

module.exports = sessionLoader;