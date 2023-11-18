const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db('hotel-transylvania').collection('reservations').find();
      const lists = await result.toArray();
      console.log(lists);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error while fetching reservations:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//get single Service with id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid reservation id to find a reservation.');
    }
    const reservationId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('hotel-transylvania')
      .collection('reservations')
      .find({ _id: reservationId });
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createReservation = async (req, res) => {
try {
    const newReservation = {
        guestID: req.body.guestID,
        roomID: req.body.roomID,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        totalPrice: req.body.totalPrice,
        status: req.body.status,
    };

    const result = await mongodb.getDb().db('hotel-transylvania').collection('reservations').insertOne(newReservation);
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

//updating Service with id
const updateReservation = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid reservation id to find a reservation.');
}
    const reservationId = new ObjectId(req.params.id);
    const newReservation = {
    guestID: req.body.guestID,
    roomID: req.body.roomID,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    totalPrice: req.body.totalPrice,
    status: req.body.status,
    };
    const result = await mongodb.getDb().db('hotel-transylvania').collection('reservations').replaceOne({ _id: reservationId }, newReservation);
    if (result.modifiedCount > 0){
    res.status(204).send();
    } else {
    res.status(500).json(result.error || 'Some error occurred while updating the reservation.');
    }
}

const deleteReservation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid reservation id to delete a reservation information.');
    }
    const reservationId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('hotel-transylvania').collection('reservations').deleteOne({ _id: reservationId }, true);
    if (result.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the reservation.');
    }
  }

module.exports= {getAll, getSingle, createReservation, updateReservation, deleteReservation}