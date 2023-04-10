const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const generator = require('./userGenerator');

const assert = require('assert').strict;

describe('test de creacion de usuario', function(){

    before(function(){
        console.info('\n ***** Comienzo total del test *****');
    });

    after(function(){
        console.info('\n ***** Final total del test *****');
    });

    beforeEach(function(){
        console.info('\n ***** Comienzo test individual *****');
    });

    afterEach(function(){
        console.info('\n ***** Final test individual *****');
    });

    it('Creacion de usuario - POST', async () => {
        let randomUser = generator.get();
        console.info(randomUser);

        let response = await request.post('/signup').send(randomUser);
        expect(response.status).to.eql(200);

        const user = response.body;
        expect(user).to.include.keys('username', 'password');
        expect(user.username).to.eql(randomUser.username);
        expect(user.password).to.eql(randomUser.password);
    })
})