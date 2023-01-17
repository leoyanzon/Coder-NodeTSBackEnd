const express = require('express');
const app = express();
const ejs = require('ejs');

const logger = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const MongoStore = require('connect-mongo');

require('dotenv').config();
const indexRouter = require('./src/routes/index');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('tiny'));

const COOKIES_SECRET = process.env.COOKIES_SECRET || '';
app.use(cookieParser(COOKIES_SECRET));

app.set('view engine', 'ejs');
app.set('views', './views');

if(process.env.SESSION_STORAGE == "MONGO_ATLAS"){
    console.info("MONGO ATLAS STORAGE");
    const mongoConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const storeConfig = {
        mongoUrl: process.env.MONGO_ATLAS_URL,
        mongoOptions: mongoConfig
    }
    app.use(session({
        store: new MongoStore.create(storeConfig),
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

if(process.env.SESSION_STORAGE == "MONGO_DB"){
    console.info("MONGO DB STORAGE");
    const mongoConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const storeConfig = {
        mongoUrl: process.env.MONGO_LOCAL_URL,
        mongoOptions: mongoConfig
    }
    app.use(session({
        store: new MongoStore.create(storeConfig),
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

if(process.env.SESSION_STORAGE == "EXPRESS_SESSION"){
    console.info("SESSION STORAGE")
    app.use(session({
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

if(process.env.SESSION_STORAGE == "FILE_STORE"){
    console.info("FILE-STORE STORAGE")
    const fileStoreConfig = {
        path: './session',
        ttl: 300,
        retries: 5
    }
    app.use(session({
        store: new FileStore(fileStoreConfig),
        secret: process.env.COOKIES_SECRET,
        resave: true,
        saveUninitialized: true
    }))
}

app.use("/", indexRouter);

module.exports = app;