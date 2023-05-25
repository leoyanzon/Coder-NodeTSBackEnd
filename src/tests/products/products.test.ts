import configLoader from '../../loaders/config.loader';
const config = configLoader();

import chai from 'chai';
const expect = chai.expect;
import productGenerator from './productGenerator';

import supertest from 'supertest';
const request = supertest(`http://localhost:${config.server.SERVER_PORT}`);

describe('test de creacion de products', function(){

    before(function(){
        console.info('\n ***** Comienzo total del test *****');
    });

    after(function(){
        console.info('\n ***** Final total del test *****');
    });

    it('Debería devolver el health con async await', async() => {
        const test = await request.get('/health').set('Accept', 'application/json');
        await expect(test.status).to.equal(200)
        await expect(test.body.success).to.equal(true)
    });

    it('Deberia ingresar un producto nuevo', async() => {
        let randomProduct = productGenerator();
        const test : any = await request.post('/products').set('Accept', 'application/json')
        .send(randomProduct);
        //await expect(test.body.success).to.equal(true);
        expect(test.error).to.equal(false);
        expect(test.status).to.equal(200);
        expect(test.req.res.statusMessage).to.equal('OK');
    });

    // it('Deberia obtener el producto creado', async() => {
    //     const test = await request.get('/products/1').set('Accept', 'application/json');
    //     await expect(test.body.success).to.equal(true);
    // });
})
