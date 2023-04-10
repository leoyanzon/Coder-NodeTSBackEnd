const expressLoader = require('./express.loader');
const sessionLoader = require('./session.loader');
const loggerLoader = require('./logger.loader');
const routerLoader = require('./router.loader');

const { logger } = require('../services/logger/index');
//const mongooseLoader = require('./mongoose.loader');

const indexLoader = async (app) => {
    await expressLoader( app );
    logger.info('Express Initialized');
    await sessionLoader( app );
    logger.info('Session Initialized');
    await loggerLoader( app );
    logger.info('Loggers Initialized');
    await routerLoader( app );
    logger.info('Router Initialized');
}

module.exports = indexLoader;