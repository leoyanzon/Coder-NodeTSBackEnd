const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const passportService = require('../services/passport/passport.service');

const config = require('../config/config');

const sessionLoader = async ( app ) => {
    app.use(session({
        store: new FileStore({path: '../session', ttl:300, retries: 0}),
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