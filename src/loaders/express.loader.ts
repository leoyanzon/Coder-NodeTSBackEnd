import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';

import path from 'path'

import configLoader from '../loaders/config.loader';

const expressLoader = ( app : Express ): Express => {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    const config = configLoader();
    if (config.server.ENVIRONMENT == 'development') app.use(cors());
        
    app.set('view engine', 'ejs');
    app.set('views', './views');
    app.use(express.static(path.join(__dirname, '../../public')));
    
    app.use('/uploads', express.static('tmp/images'));

    return app;
}

export default expressLoader;