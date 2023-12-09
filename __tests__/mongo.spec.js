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

    // test for staff
    it('should insert a new staff member into the staff collection', async () => {
        const staff = db.collection('staff');

        const mockStaff = {
            firstName: 'John',
            lastName: 'Doe',
            role: "Manager",
            email: "johndoe@gmail.com",
            phone: "456-789-1234",
            address: "123 Main Street"
        };

        await staff.insertOne(mockStaff);

        const insertedStaff = await staff.findOne({ phone: '456-789-1234' });

        delete insertedStaff._id;
        delete mockStaff._id;

        expect(insertedStaff).toEqual(mockStaff);
    });

    it('should delete a staff member from the staff collection', async () => {
        const staff = db.collection('staff');
        await staff.deleteMany({ phone: '456-789-1234' });
        const deletedStaff = await staff.findOne({ phone: '456-789-1234' });
        expect(deletedStaff).toEqual(null);
    });
});
