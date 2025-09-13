const request = require('supertest');
const { expect, use } = require('chai');

require('dotenv').config();

describe('checkout', () => {
    describe('POST /api/checkout', () => {
        before(async function() {
            const postUserLogin = require('../../fixture/requisicao/login/postUserLogin.json');
            
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/api/users/login')
                .send (postUserLogin); 
          
            token = respostaLogin.body.token;
        });

        it('deve fazer checkout com boleto', async function() {
            const postCheckoutBoleto = require('./fixture/requisicao/checkout/postCheckoutBoleto.json');

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send(postCheckoutBoleto);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('valorFinal', 400);                 
            expect(resposta.body).to.have.property('paymentMethod', 'boleto');

            resposta.body.items.forEach(item => {
                expect(item).to.have.property('productId');
            });
     
        });

        it('deve fazer checkout com cartão', async function() {
            const postCheckoutCartaoCredito = require('./fixture/requisicao/checkout/postCheckoutCartaoCredito.json');

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send(postCheckoutCartaoCredito);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('valorFinal', 665);                 
            expect(resposta.body).to.have.property('paymentMethod', 'credit_card');

            resposta.body.items.forEach(item => {
                expect(item).to.have.property('productId');
            });
     
        });
    });
});
