const request = require('supertest')('http://localhost:3005');
const expect = require('chai').expect;
const generator = require('./productGenerator');

const assert = require('assert').strict;

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
        let randomProduct = generator.get();
        const test = await request.post('/products').set('Accept', 'application/json')
        .send(randomProduct);
        await expect(test.body.success).to.equal(true);
    });

    it('Deberia obtener el producto creado', async() => {
        const test = await request.get('/products/1').set('Accept', 'application/json');
        await expect(test.body.success).to.equal(true);
    });
})
