const configLoader = require('./config.loader');
const expressLoader = require('./express.loader');
const sessionLoader = require('./session.loader');
const loggerLoader = require('./logger.loader');
const routerLoader = require('./router.loader');
const mongooseLoader = require('./mongoose.loader');
const graphqlLoader = require('./graphql.loader');

const { logger } = require('../utils/logger/index');


const indexLoader = async (app) => {
    configLoader();
    logger.info('Loaders: Configs Initialized');
    
    loggerLoader( app );
    logger.info('Loaders: Loggers Initialized');
    
    expressLoader( app );
    logger.info('Loaders: Express Initialized');

    await sessionLoader( app );
    logger.info('Loaders: Session Initialized');
    
    await routerLoader( app ); 
    logger.info('Loaders: Router Initialized');

    await graphqlLoader( app );
    logger.info('Loaders: GraphQL Initialized');
}

module.exports = indexLoader;