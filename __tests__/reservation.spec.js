
const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /reservations', async () => {
        const res = await request.post('/reservations').send(    {
            guestID: '1234',
            roomID: '301',
            checkIn: '12/24/2023',
            checkOut: '12/28/2023',
            totalPrice: '$680',
            status: 'Confirmed',
        });
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    
})