import supertest from 'supertest';
import configLoader from '../../loaders/config.loader';
const config = configLoader();

const request = supertest(`http://localhost:${config.server.SERVER_PORT}`);

import productGenerator from './productGenerator';

import { logger } from '../../utils/logger/index';

const productMockGenerator = async ( qty : number ) : Promise<void> => {
    try{
        for (let i = 0; i < qty; i++ ){
            let randomProduct = productGenerator();
            const test = await request.post('/api/products').set('Accept', 'application/json').send(randomProduct);
        }
        logger.info(`Mock: ${qty} products created`)
    } catch (err){
        logger.error(`Mock: Error creating products ${err}`)
    }
}

export default productMockGenerator;