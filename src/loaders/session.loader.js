const session = require('express-session');
const FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo');
const { getStoreConfig } = require('../services/mongo/mongo.config'); 

const cookieParser = require('cookie-parser');

const passportService = require('../services/passport/passport.service');

const config = require('../config/config');

const getSessionStorage = () => {
    if (config.server.SESSION_STORAGE == 'MONGO_DB') {
        return MongoStore.create(getStoreConfig(`${config.db.MONGO_URI}/sessions`))
    }
    if (config.server.SESSION_STORAGE == 'MONGO_ATLAS') {
        return MongoStore.create(getStoreConfig(`${config.db.MONGO_ATLAS_URL}/sessions`))
    }
    return new FileStore({path: '../session', ttl:300, retries: 0})
}

const sessionLoader = async ( app ) => {

    if (config.server.SESSION_STORAGE == 'MONGO_DB'){

    }
    app.use(session({
        store: getSessionStorage(),
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