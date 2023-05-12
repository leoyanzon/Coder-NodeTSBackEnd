const { loggerHttp } = require('../utils/logger/index');
const morgan = require('morgan');

const loggerLoader = ( app ) => {

    //app.use(loggerHttp);
    //app.use(morgan('dev'));

    return app;
}

module.exports = loggerLoader;