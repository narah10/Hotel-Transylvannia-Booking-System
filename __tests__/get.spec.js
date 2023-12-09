const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })

    test('responds to /guest', async () => {
        const res = await request.get('/guest');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })
    test('responds to /rooms', async () => {
        const res = await request.get('/rooms');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })
    test('responds to /services', async () => {
        const res = await request.get('/services');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })
    test('responds to /staff', async () => {
        const res = await request.get('/staff');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })
    test('responds to /reservations', async () => {
        const res = await request.get('/reservations');
        expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
        expect(res.statusCode).toBe(302)
    })
})