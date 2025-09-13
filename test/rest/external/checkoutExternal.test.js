const request = require('supertest');
const { expect, use } = require('chai');

describe('checkout', () => {
    describe('POST /api/checkout', () => {
        before(async () => {
            const respostaLogin = await request("http://localhost:3000")
                .post('/api/users/login')
                .send({
                    "email": "bob@email.com",
                    "password": "123456"
                });

            token = respostaLogin.body.token;
        });

        it('deve fazer checkout com boleto', async function() {
            const resposta = await request("http://localhost:3000")
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "items": [
                        {
                            "productId": 1,
                            "quantity": 2
                        },
                                                {
                            "productId": 2,
                            "quantity": 1
                        }
                    ],
                    "freight": 0,
                    "paymentMethod": "boleto",
                    "cardData": {
                        "number": "string",
                        "name": "string",
                        "expiry": "string",
                        "cvv": "string"
                    }
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('valorFinal', 400);                 
            expect(resposta.body).to.have.property('paymentMethod', 'boleto');

            resposta.body.items.forEach(item => {
                expect(item).to.have.property('productId');
            });
     
        });
    });
});
