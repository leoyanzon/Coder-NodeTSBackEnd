const expressLoader = require('./express.loader');
const sessionLoader = require('./session.loader');
const loggerLoader = require('./logger.loader');
const routerLoader = require('./router.loader');
const mongooseLoader = require('./mongoose.loader');

const { logger } = require('../services/logger/index');


const indexLoader = async (app) => {
    await expressLoader( app );
    logger.info('Loaders: Express Initialized');
    await sessionLoader( app );
    logger.info('Loaders: Session Initialized');
    await loggerLoader( app );
    logger.info('Loaders: Loggers Initialized');
    await routerLoader( app ); 
    logger.info('Loaders: Router Initialized');
    await mongooseLoader( app );
    logger.info('Loaders: Mongoose Connections Initialized');
}

module.exports = indexLoader;