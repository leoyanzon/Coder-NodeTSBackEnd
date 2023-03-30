const express = require('express');
const app = express();
const ejs = require('ejs');
const compression = require('compression');
const { logger, loggerHttp } = require('./src/services/logger/index');

const endPointLogger = require('morgan');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const mongooseConnect = require('./src/services/mongo/connect');

const indexRouter = require('./src/routes/index');

const config = require('./src/config/config');

app.use(loggerHttp);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(endPointLogger('tiny'));

const COOKIES_SECRET = config.COOKIES_SECRET || 'default';
app.use(cookieParser(COOKIES_SECRET));

const { getStoreConfig } = require('./src/services/session/session.config');

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIES_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

mongooseConnect();

app.set('view engine', 'ejs');
app.set('views', './views');
//app.use(express.static(__dirname + 'public'));
app.use('/uploads', express.static('public/images'));

const passportService = require('./src/services/passport/passport.service');

app.use(passportService.initialize());
app.use(passportService.session());

app.use("/", indexRouter);

module.exports = app;