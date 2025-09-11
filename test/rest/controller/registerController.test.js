const request = require('supertest');
const {expect} = require('chai');

const app = require('../../../rest/app');
const users = require('../../../src/models/user');


describe('Login Controller', () =>{
    describe('POST /register',() =>{

        it('Quando solicito o cadastro de um usuario existente, devo receber erro 400', async () =>{
            const resposta = await request (app)
            .post('/api/users/register')
            .send({
                  "name": "Alice",
                  "email": "alice@email.com",
                  "password": "123456"
                });
            expect(resposta.status).to.be.equal(400);
            expect(resposta.body).to.have.property('error', 'Email já cadastrado');
        });
    });
});