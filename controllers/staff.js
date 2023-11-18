const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db('hotel-transylvania').collection('staff').find();
      const lists = await result.toArray();
      console.log(lists);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error while fetching staff:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//get single room with id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid staff id to find a room.');
    }
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('hotel-transylvania')
      .collection('staff')
      .find({ _id: staffId });
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createStaff = async (req, res) => {
try {
    console.log('Request Body:', req.body);
    const newStaff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    };

    const result = await mongodb.getDb().db('hotel-transylvania').collection('staff').insertOne(newStaff);
    console.log(result);

    if (result.acknowledged) {
    res.status(201).json(result);
    } else {
    res.status(500).json(result.error);
    }
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

//updating room with id
const updateStaff = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Staff id to find a Room.');
}
    const staffId = new ObjectId(req.params.id);
    const newStaff = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    };
    const result = await mongodb.getDb().db('hotel-transylvania').collection('staff').replaceOne({ _id: staffId }, newStaff);
    if (result.modifiedCount > 0){
    res.status(204).send();
    } else {
    res.status(500).json(result.error || 'Some error occurred while updating the staff member information');
    }
}

const deleteStaff = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid staff id to delete a staff member info.');
    }
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('hotel-transylvania').collection('staff').deleteOne({ _id: staffId }, true);
    if (result.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the staff member');
    }
  }

module.exports= {getAll, getSingle, createStaff, updateStaff, deleteStaff}