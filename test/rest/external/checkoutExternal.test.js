const request = require('supertest');
const { expect, use } = require('chai');

require('dotenv').config();

describe('checkout', () => {
    describe('POST /api/checkout', () => {
        before(async function() {
            const postUserLogin = require('./fixture/requisicao/login/postUserLogin.json');
            
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/api/users/login')
                .send (postUserLogin); 
          
            token = respostaLogin.body.token;
        });

        it('Deve fazer checkout com Boleto', async function() {
            const postCheckoutBoleto = require('./fixture/requisicao/checkout/postCheckoutBoleto.json');
            const respostaEsperada =require('./fixture/resposta/checkout/postCheckoutBoleto.json');

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send(postCheckoutBoleto);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.deep.include(respostaEsperada);
     
        });

        it('deve fazer checkout com cartão', async function() {
            const postCheckoutCartaoCredito = require('./fixture/requisicao/checkout/postCheckoutCartaoCredito.json');
            const respostaEsperada = require('./fixture/resposta/checkout/postCheckoutCartaoCredito.json');

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send(postCheckoutCartaoCredito);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.deep.include(respostaEsperada);
        });

        const testeDeErrosDeNegocio = require('./fixture/requisicao/checkout/checkoutComErros.json');
        testeDeErrosDeNegocio.forEach(teste => {
            it(teste.nomeDoteste, async function() {
                const resposta = await request(process.env.BASE_URL_REST)
                    .post('/api/checkout')
                    .set('Authorization', `Bearer ${token}`)
                    .send(teste.postCheckout);

                expect(resposta.status).to.equal(teste.statusCode);
                expect(resposta.body).to.have.property('error', teste.mensagemEsperada);
            });
        });
    });
});
