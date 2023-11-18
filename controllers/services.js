const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db('hotel-transylvania').collection('services').find();
      const lists = await result.toArray();
      console.log(lists);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error while fetching services:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//get single Service with id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid service id to find a Service.');
    }
    const serviceId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('hotel-transylvania')
      .collection('services')
      .find({ _id: serviceId });
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createService = async (req, res) => {
try {
    const newService = {
        serviceName: req.body.serviceName,
        description: req.body.description,
        price: req.body.price,
        availabilityStatus: req.body.availabilityStatus,
        schedule: req.body.schedule,
        location: req.body.location,
        };

    const result = await mongodb.getDb().db('hotel-transylvania').collection('services').insertOne(newService);
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
const updateService = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid service id to find a Service.');
}
    const serviceId = new ObjectId(req.params.id);
    const newService = {
    serviceName: req.body.serviceName,
    description: req.body.description,
    price: req.body.price,
    availabilityStatus: req.body.availabilityStatus,
    schedule: req.body.schedule,
    location: req.body.location,
    };
    const result = await mongodb.getDb().db('hotel-transylvania').collection('services').replaceOne({ _id: serviceId }, newService);
    if (result.modifiedCount > 0){
    res.status(204).send();
    } else {
    res.status(500).json(result.error || 'Some error occurred while updating the service information');
    }
}

const deleteService = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid service id to delete a service info.');
    }
    const serviceId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('hotel-transylvania').collection('services').deleteOne({ _id: serviceId }, true);
    if (result.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the service');
    }
  }

module.exports= {getAll, getSingle, createService, updateService, deleteService}