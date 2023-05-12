const express = require('express');
const compression = require('compression');
const cors = require('cors');

const config = require('../loaders/config.loader')();

const expressLoader = ( app ) => {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    if (config.server.ENVIRONMENT == 'development') app.use(cors());
        
    app.set('view engine', 'ejs');
    app.set('views', './views');
    app.use('/uploads', express.static('public/images'));

    return app;
}

module.exports = expressLoader;