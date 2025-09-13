const request = require('supertest');
const {expect} = require('chai');
const sinon = require('sinon');

const app = require('../../../rest/app');
const userService = require('../../../src/services/userService');

describe('Register Controller', () => {
    let registerUserMock;

    beforeEach(() => {
        registerUserMock = sinon.stub(userService, 'registerUser');
    });

    it('deve retornar 400 quando o usuário já estiver cadastrado', async () => {
        registerUserMock.returns(null);

        const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name: "Alice",
                email: "alice@email.com",
                password: "123456"
            });

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error').that.equals('Email já cadastrado');
    });

    it('deve retornar 201 quando o usuário for cadastrado', async () => {
        registerUserMock.returns({
                name: "Priscila",
                email: "priscila@email.com",
        });

        const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name: "Priscila",
                email: "priscila@email.com",
                password: "123456"
            });

    expect(resposta.status).to.equal(201);
    expect(resposta.body).to.have.property('name', 'Priscila');
    expect(resposta.body).to.have.property('email', 'priscila@email.com');
    });


    afterEach(() => {
        registerUserMock.restore();
    });
});
