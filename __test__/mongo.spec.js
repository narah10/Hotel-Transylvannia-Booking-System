const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('hotel-transylvania')
    },10000);
    afterAll(async() => {
        if (connection) {
            await connection.close();
        }
    })

    // POST for guest collection
    it('should insert and create a new guest', async () => {
        const guests = db.collection('guest');

        const mockGuest = {
            guestID: '1543',
            firstName: 'James',
            lastName: 'Bond',
            email: 'james@fake.com',
            phone: '000-121-0010',
            address: '123 Fake Address',
            dateOfBirth: '05/24/1987',
            identificationConfirmation: 'Driver License',
        }

        await guests.insertOne(mockGuest)

        const insertedGuests = await guests.findOne({ guestID: '1543' });

        expect(insertedGuests).toEqual(mockGuest)
    },
        
    // DELETE for guest collection
    it('should delete a guest from the users collection', async () => {
        const guests = db.collection('guest')
        await guests.deleteMany({ guestID: '1543' })
        const deletedGuest = await guests.findOne({ guestID: '1543' });
        expect(deletedGuest).toEqual(null)
    })
)})