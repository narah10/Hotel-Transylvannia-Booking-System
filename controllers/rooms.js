const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    // Extract the availability status and room type from the query parameters
    const { status, roomType } = req.query;

    // Define a filter based on the availability status and room type
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    if (roomType) {
      filter.roomType = roomType;
    }

    // Query the database with the filter
    const result = await mongodb
      .getDb()
      .db('hotel-transylvania')
      .collection('rooms')
      .find(filter);

    // Convert the result to an array
    const lists = await result.toArray();

    // Log and send the response
    console.log(lists);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error while fetching rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get single room with id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid room id to find a room.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('hotel-transylvania')
      .collection('rooms')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createRoom = async (req, res) => {
try {
    console.log('Request Body:', req.body);
    const newRoom = {
    roomNumber: req.body.roomNumber,
    description: req.body.description,
    features: req.body.features,
    pricePerNight: req.body.pricePerNight,
    roomType: req.body.roomType,
    status: req.body.status,
    };

    const result = await mongodb.getDb().db('hotel-transylvania').collection('rooms').insertOne(newRoom);
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
const updateRoom = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Rooms id to find a Room.');
}
    const roomId = new ObjectId(req.params.id);
    const newRoom = {
    roomNumber: req.body.roomNumber,
    description: req.body.description,
    features: req.body.features,
    pricePerNight: req.body.pricePerNight,
    roomType: req.body.Single,
    status: req.body.status,
    };
    const result = await mongodb.getDb().db('hotel-transylvania').collection('rooms').replaceOne({ _id: roomId }, newRoom);
    if (result.modifiedCount > 0){
    res.status(204).send();
    } else {
    res.status(500).json(result.error || 'Some error occurred while updating the Room information');
    }
}

const deleteRoom = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid room id to delete a room info.');
    }
    const roomId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('hotel-transylvania').collection('rooms').deleteOne({ _id: roomId }, true);
    if (result.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the room');
    }
  }

module.exports= {getAll, getSingle, createRoom, updateRoom, deleteRoom}