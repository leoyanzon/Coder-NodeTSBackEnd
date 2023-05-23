import { Express } from 'express'
import configLoader from './config.loader';
import expressLoader from './express.loader';
import sessionLoader from './session.loader';
import loggerLoader from './logger.loader';
import routerLoader from './router.loader';
import graphqlLoader from './graphql.loader';

import { logger } from '../utils/logger/index';


const indexLoader = async ( app : Express) => {
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

    graphqlLoader( app );
    logger.info('Loaders: GraphQL Initialized');
}

export default indexLoader;