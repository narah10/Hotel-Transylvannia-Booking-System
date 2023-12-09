const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /rooms', async () => {
        const res = await request.post('/rooms').send(    {
            roomNumber: "3002",
            description: "Indulge in the epitome of luxury with our Deluxe Suite. This spacious and elegantly appointed suite is designed to offer a premium experience for our discerning guests.",
            features: "Panoramic City Views, Private Balcony, Spa-Inspired Bathroom, Complimentary Minibar",
            pricePerNight: "$1000",
            roomType: "Deluxe Suite",
            status: "Booked"
        });
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    
})