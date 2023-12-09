const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /users', async () => {
        const res = await request.post('/guest').send(    {
            guestID: '4321',
            firstName: 'Nick',
            lastName: 'Cannon',
            email: 'nickcannon@gmail.com',
            phone: '123-456-7890',
            address: 'fake address 123',
            dateOfBirth: '1/1/2001',
            identificationConfirmation: 'State ID',
        });
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    
})