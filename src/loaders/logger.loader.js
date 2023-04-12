const { loggerHttp } = require('../services/logger/index');
const morgan = require('morgan');

const loggerLoader = async( app ) => {

    app.use(loggerHttp);
    app.use(morgan('dev'));

    return app;
}

module.exports = loggerLoader;