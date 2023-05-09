const supertest = require('supertest');
const config = require('../../config/config');
const request = supertest(`http://localhost:${config.server.SERVER_PORT}`);

const generator = require('./productGenerator');

const { logger } = require('../../services/logger/index');

const productMockGenerator = async ( qty ) => {
    try{
        for (let i = 0; i < qty; i++ ){
            let randomProduct = generator.get();
            const test = await request.post('/products').set('Accept', 'application/json').send(randomProduct);
        }
        logger.info(`Mock: ${qty} products created`)
    } catch (err){
        logger.error(`Mock: Error creating products ${err}`)
    }
}

module.exports = productMockGenerator;