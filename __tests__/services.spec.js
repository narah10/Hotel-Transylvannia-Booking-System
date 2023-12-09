const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /services', async () => {
        const res = await request.post('/services').send(    {
            serviceName: 'Sauna',
            description: 'Steam your body',
            price: '$100',
            availabilityStatus: 'available',
            schedule: '2pm',
            location: 'Maryland',
        });
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    
})