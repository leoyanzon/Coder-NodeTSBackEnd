import { Express } from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';

import MongoStore = require('connect-mongo');
import { getStoreConfig } from '../config/mongo.config'; 

import cookieParser from 'cookie-parser';

import passportService from '../utils/passport/passport.service';

import configLoader from '../loaders/config.loader';

import { logger } from '../utils/logger/index';

const getSessionStorage = async () : Promise<any> => {
    
    const config = configLoader();
    if (config.server.SESSION_STORAGE == 'MONGO_DB') {
        logger.info('Session Storage: Mongo Local instance created');
        const mongoStoreOptions = getStoreConfig(`${config.db.MONGO_URI}/sessions`);
        const mongoStore = new MongoStore(mongoStoreOptions);
        return mongoStore;
    }

    if (config.server.SESSION_STORAGE == 'MONGO_ATLAS' ) {
        logger.info('Session Storage: Mongo Local instance created');
        const mongoStoreOptions = getStoreConfig(`${config.db.MONGO_ATLAS_URL}/sessions`);
        const mongoStore = new MongoStore(mongoStoreOptions);
        return mongoStore;
    }
    //Else SESSION_STORAGE == FILE OR MEM
    logger.info('Session Storage: Session file created');
    const fileStore = FileStore(session);
    return new fileStore({path: 'tmp/db/session', ttl:300, retries: 0});
}

const sessionLoader = async ( app : Express ) : Promise<Express> => {
    const config = configLoader();
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

export default sessionLoader;