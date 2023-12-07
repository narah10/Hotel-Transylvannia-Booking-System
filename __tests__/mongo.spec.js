const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

describe('insert and delete', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('hotel-transylvania');
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a new guest into the guest collection', async () => {
        const guests = db.collection('guest');

        const mockGuest = {
            guestID: '4321',
            firstName: 'Nick',
            lastName: 'Cannon',
            email: 'nickcannon@gmail.com',
            phone: '123-456-7890',
            address: 'fake address 123',
            dateOfBirth: '1/1/2001',
            identificationConfirmation: 'State ID',
        };

        await guests.insertOne(mockGuest);

        const insertedGuest = await guests.findOne({ guestID: '4321' });

        delete insertedGuest._id;
        delete mockGuest._id;

        expect(insertedGuest).toEqual(mockGuest);
    });

    it('should delete a guest from the guests collection', async () => {
        const guests = db.collection('guest');
        await guests.deleteMany({ guestID: '4321' });
        const deletedGuest = await guests.findOne({ guestID: '4321' });
        expect(deletedGuest).toEqual(null);
    });
});
