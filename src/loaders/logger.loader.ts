import { Express } from 'express';
import { loggerHttp } from '../utils/logger/index';
import morgan from 'morgan';

const loggerLoader = ( app : Express ) : Express => {

    app.use(loggerHttp);
    app.use(morgan('dev'));

    return app;
}

export default loggerLoader;