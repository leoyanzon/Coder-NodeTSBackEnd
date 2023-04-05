const express = require('express');
const app = express();
const ejs = require('ejs');
const compression = require('compression');
const { logger, loggerHttp } = require('./src/services/logger/index');
const cors = require('cors');

const endPointLogger = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const MongooseConnect = require('./src/services/mongo/connect');

const Router = require('./src/routes/index');
const router = new Router();

const config = require('./src/config/config');

app.use(loggerHttp);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(endPointLogger('tiny'));

app.use(cookieParser(config.cookies.COOKIES_SECRET));

if (config.server.ENVIRONMENT == 'development') app.use(cors());

const { getStoreConfig } = require('./src/services/mongo/mongo.config');

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: config.cookies.COOKIES_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

MongooseConnect.getInstance();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/uploads', express.static('public/images'));

const passportService = require('./src/services/passport/passport.service');

app.use(passportService.initialize());
app.use(passportService.session());

app.use("/", router);

module.exports = app;