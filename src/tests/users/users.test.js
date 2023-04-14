const config = require('../../config/config');
const expect = require('chai').expect;
const generator = require('./userGenerator');

const supertest = require('supertest');
const request = supertest(`http://localhost:${config.server.SERVER_PORT}`);
const assert = require('assert').strict;

describe('test de creacion de usuario', function(){

    before(function(){
        console.info('\n ***** Comienzo total del test *****');
    });

    after(function(){
        console.info('\n ***** Final total del test *****');
    });

    it('Debería devolver el health con async await', async() => {
        const test = await request.get('/health').set('Accept', 'application/json');
        expect(test.status).to.equal(200)
        expect(test.body.success).to.equal(true)
    });

    it('Deberia ingresar un usuario nuevo', async() => {
        let randomUser = generator.get();
        const test = await request.post('/api/auth/signup').set('Accept', 'application/x-www-form-urlencoded')
        .send(randomUser);
        expect(test.error).to.equal(false);
        expect(test.status).to.equal(302);
        expect(test.req.res.statusMessage).to.equal('Found');
    });
})
