const { loggerHttp } = require('../services/logger/index');
const endPointLogger = require('morgan');

const loggerLoader = async( app ) => {

    app.use(loggerHttp);
    app.use(endPointLogger('tiny'));

    return app;
}

module.exports = loggerLoader;