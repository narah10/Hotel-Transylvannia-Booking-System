const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /staff', async () => {
        const res = await request.post('/staff').send(    {
            firstName: 'Mary',
            lastName: 'Chouett',
            role: 'receptionist',
            email: 'mary@gmail.com',
            phone: '1123334456',
            address: 'Candy Road 4',
        });
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    
})